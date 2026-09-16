import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { and, count, eq } from "drizzle-orm";
import { db } from "@/db";
import { registrations } from "@/db/schema";
import { getGame, type FieldDef } from "@/lib/games";
import { getTournament } from "@/lib/tournaments";

export const dynamic = "force-dynamic";

function buildSchema(fields: FieldDef[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of fields) {
    let s = z.string().trim().max(f.maxLength ?? 200, `${f.label} is too long.`);
    if (f.type === "email") s = s.email("Enter a valid email address.");
    if (f.type === "select" && f.options) {
      shape[f.name] = f.required
        ? s.refine((v) => f.options!.includes(v), `Select a valid ${f.label.toLowerCase()}.`)
        : s.refine((v) => v === "" || f.options!.includes(v), `Select a valid ${f.label.toLowerCase()}.`);
      continue;
    }
    shape[f.name] = f.required ? s.min(1, `${f.label.replace(" (optional)", "")} is required.`) : s;
  }

  // Field-level refinements
  shape.uid = z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9#_-]{4,30}$/, "Game ID must be 4–30 characters (letters, numbers, # _ -).");
  shape.email = z.string().trim().email("Enter a valid email address.").max(120);
  shape.ign = z.string().trim().min(2, "IGN must be at least 2 characters.").max(24);
  if (shape.phone) {
    shape.phone = z
      .string()
      .trim()
      .refine((v) => v.replace(/\D/g, "").length >= 7, "Enter a valid phone number.")
      .max(18);
  }

  return z.object(shape).strict();
}

const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function makeCode() {
  let out = "";
  for (let i = 0; i < 6; i++) out += ALPHA[Math.floor(Math.random() * ALPHA.length)];
  return `TTE-${out}`;
}

/** Concatenates the whole error cause chain so pg constraint names are visible. */
function errorText(err: unknown): string {
  let text = "";
  let cur: unknown = err;
  while (cur instanceof Error) {
    text += ` ${cur.message}`;
    cur = cur.cause;
  }
  return text;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const game = typeof raw.gameSlug === "string" ? getGame(raw.gameSlug) : undefined;
  const tournament =
    typeof raw.tournamentId === "string" ? getTournament(raw.tournamentId) : undefined;

  if (!game || !tournament || tournament.gameSlug !== game.slug) {
    return NextResponse.json({ error: "Unknown game or tournament." }, { status: 400 });
  }

  const payload = Object.fromEntries(
    game.fields.map((f) => [f.name, typeof raw[f.name] === "string" ? raw[f.name] : ""]),
  );
  const parsed = buildSchema(game.fields).safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      { error: issue.message, field: issue.path[0] },
      { status: 422 },
    );
  }
  const v = parsed.data as Record<string, string>;

  // Enforce capacity
  const [{ value: used }] = await db
    .select({ value: count() })
    .from(registrations)
    .where(eq(registrations.tournamentId, tournament.id));
  if (used >= tournament.slots) {
    return NextResponse.json(
      { error: "This tournament is full. Join the waitlist by contacting organizers." },
      { status: 409 },
    );
  }

  // Friendly duplicate check (unique index is the hard backstop)
  const duplicate = await db
    .select({ id: registrations.id })
    .from(registrations)
    .where(and(eq(registrations.uid, v.uid), eq(registrations.tournamentId, tournament.id)))
    .limit(1);
  if (duplicate.length > 0) {
    return NextResponse.json(
      { error: "That game ID is already registered for this tournament.", field: "uid" },
      { status: 409 },
    );
  }

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const [inserted] = await db
        .insert(registrations)
        .values({
          code: makeCode(),
          gameSlug: game.slug,
          tournamentId: tournament.id,
          ign: v.ign,
          realName: v.realName,
          email: v.email.toLowerCase(),
          phone: v.phone || null,
          uid: v.uid,
          teamName: v.teamName || null,
          role: v.role || null,
          main: v.main || null,
          rank: v.rank || null,
          platform: v.platform || null,
          experience: v.experience,
          notes: v.notes || null,
        })
        .returning({ id: registrations.id, code: registrations.code });
      return NextResponse.json({ ok: true, id: inserted.id, code: inserted.code }, { status: 201 });
    } catch (err) {
      const message = errorText(err);
      if (message.includes("registrations_uid_tournament_idx")) {
        return NextResponse.json(
          {
            error: "That game ID is already registered for this tournament.",
            field: "uid",
          },
          { status: 409 },
        );
      }
      if (message.includes("registrations_code_idx")) continue; // retry with a fresh code
      console.error("Registration insert failed:", err);
      return NextResponse.json({ error: "Could not save registration. Please try again." }, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Could not save registration. Please try again." }, { status: 500 });
}
