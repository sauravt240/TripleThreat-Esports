import { db } from "@/db";
import { registrations } from "@/db/schema";
import { sql } from "drizzle-orm";

/** Live count of registrations per tournament — used to show slots remaining. */
export async function getSlotUsage(): Promise<Record<string, number>> {
  const rows = await db
    .select({ tournamentId: registrations.tournamentId, count: sql<number>`count(*)` })
    .from(registrations)
    .groupBy(registrations.tournamentId);
  return Object.fromEntries(rows.map((r) => [r.tournamentId, Number(r.count)]));
}

export async function getRegistrationCount(): Promise<number> {
  const rows = await db
    .select({ count: sql<number>`count(*)` })
    .from(registrations);
  return Number(rows[0]?.count ?? 0);
}
