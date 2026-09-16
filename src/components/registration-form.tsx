"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ShieldCheck, AlertCircle, Ticket } from "lucide-react";
import type { Game, FieldDef } from "@/lib/games";
import type { Tournament } from "@/lib/tournaments";

type Values = Record<string, string>;
type Errors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateField(field: FieldDef, value: string, mode: Game["mode"]): string | null {
  const v = value.trim();
  if (field.required && !v) return `${field.label.replace(" (optional)", "")} is required.`;
  if (!v) return null;
  if (field.type === "email" && !EMAIL_RE.test(v)) return "Enter a valid email address.";
  if (field.type === "tel" && v.replace(/\D/g, "").length < 7) return "Enter a valid phone number.";
  if (field.name === "uid" && !/^[a-zA-Z0-9#_-]{4,30}$/.test(v))
    return "4–30 characters: letters, numbers, # _ - only.";
  if (mode === "squad" && field.name === "teamName" && !/^[a-zA-Z0-9 '&.-]{2,30}$/.test(v))
    return "Team name can only use letters, numbers and basic punctuation.";
  if (field.name === "ign" && (v.length < 2 || v.length > 24)) return "IGN must be 2–24 characters.";
  return null;
}

export function RegistrationForm({
  game,
  tournament,
  remaining,
}: {
  game: Game;
  tournament: Tournament;
  remaining: number;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const soldOut = remaining <= 0;

  function setValue(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const nextErrors: Errors = {};
    for (const field of game.fields) {
      const err = validateField(field, values[field.name] ?? "", game.mode);
      if (err) nextErrors[field.name] = err;
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      document.querySelector('[aria-invalid="true"]')?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameSlug: game.slug,
          tournamentId: tournament.id,
          ...values,
        }),
      });
      const data = (await res.json()) as { id?: string; error?: string; field?: string };
      if (res.ok && data.id) {
        router.push(`/confirmation/${data.id}`);
        return;
      }
      if (data.field) {
        setErrors((prev) => ({ ...prev, [data.field as string]: data.error ?? "Invalid value." }));
      } else {
        setServerError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("Network error — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-2xl border border-white/10 bg-panel/90 p-6 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Registration</p>
          <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-white">
            {game.mode === "squad" ? "Enter your squad" : "Claim your spot"}
          </h2>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
            soldOut ? "bg-red-500/15 text-red-300" : "bg-white/6 text-zinc-300"
          }`}
        >
          <Ticket className="size-3.5" aria-hidden />
          {soldOut ? "Sold out" : `${remaining} / ${tournament.slots} left`}
        </span>
      </div>

      <fieldset disabled={submitting || soldOut} className="mt-6 disabled:opacity-60">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {game.fields.map((field) => (
            <FieldInput
              key={field.name}
              field={field}
              value={values[field.name] ?? ""}
              error={errors[field.name]}
              onChange={(v) => setValue(field.name, v)}
            />
          ))}
        </div>

        {serverError && (
          <p
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            {serverError}
          </p>
        )}

        <button
          type="submit"
          className="btn-accent mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-display text-[15px] font-bold tracking-tight"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Securing your slot…
            </>
          ) : soldOut ? (
            "Registration full"
          ) : (
            `Register for ${tournament.name}`
          )}
        </button>

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-zinc-500">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
          By registering you accept the{" "}
          <Link href={`/tournaments/${tournament.id}`} className="text-zinc-300 underline decoration-zinc-600 underline-offset-2 hover:text-accent">
            tournament ruleset
          </Link>
          . A confirmation code is issued instantly.
        </p>
      </fieldset>
    </form>
  );
}

function FieldInput({
  field,
  value,
  error,
  onChange,
}: {
  field: FieldDef;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const id = `reg-${field.name}`;
  const errorId = `${id}-error`;
  const invalid = Boolean(error);

  return (
    <div className={field.half ? "" : "sm:col-span-2"}>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-zinc-300">
        {field.label}
        {field.required && (
          <span className="text-accent" aria-hidden>
            {" "}*
          </span>
        )}
      </label>

      {field.type === "select" ? (
        <select
          id={id}
          className="field-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          required={field.required}
        >
          <option value="" disabled>
            Select…
          </option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          id={id}
          className="field-input min-h-24 resize-y"
          value={value}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
        />
      ) : (
        <input
          id={id}
          type={field.type}
          className="field-input"
          value={value}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          autoComplete={
            field.name === "email" ? "email" : field.name === "phone" ? "tel" : field.name === "realName" ? "name" : "off"
          }
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          required={field.required}
        />
      )}

      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
