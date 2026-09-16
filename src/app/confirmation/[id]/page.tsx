import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { registrations } from "@/db/schema";
import { getGame } from "@/lib/games";
import { getTournament, formatDate, formatMoney } from "@/lib/tournaments";
import { Check, Home, CalendarDays, Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Registration confirmed",
  robots: { index: false },
};

export default async function ConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();

  const [registration] = await db
    .select()
    .from(registrations)
    .where(eq(registrations.id, id))
    .limit(1);
  if (!registration) notFound();

  const game = getGame(registration.gameSlug);
  const tournament = getTournament(registration.tournamentId);
  if (!game || !tournament) notFound();

  const details: { label: string; value: string }[] = [
    { label: "Tournament", value: tournament.name },
    { label: "Date", value: formatDate(tournament.startDate) },
    { label: "Player", value: `${registration.ign} (${registration.realName})` },
    ...(registration.teamName ? [{ label: "Squad", value: `${registration.teamName} · ${registration.role}` }] : []),
    ...(registration.main ? [{ label: "Main", value: `${registration.main} · ${registration.rank}` }] : []),
    { label: "Game ID", value: registration.uid },
    { label: "Contact", value: registration.email },
  ];

  return (
    <main style={game.theme.vars} className="relative overflow-hidden pt-16">
      <div className="absolute inset-x-0 top-0 h-[520px]" style={{ background: game.theme.heroBg }} aria-hidden />
      <div className="bg-grid grid-fade absolute inset-x-0 top-0 h-[520px]" aria-hidden />

      <section className="relative mx-auto max-w-2xl px-5 pb-24 pt-16 text-center sm:pt-20">
        <Reveal>
          <div
            className="animate-check-pop mx-auto grid size-20 place-items-center rounded-full"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-ink)",
              boxShadow: "0 0 0 12px var(--glow), 0 20px 60px -12px var(--glow)",
            }}
          >
            <Check className="size-10" strokeWidth={3} aria-hidden />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.24em] text-accent">
            Registration confirmed
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            You&apos;re in, {registration.ign}.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            {game.name} · {tournament.name}. {formatMoney(tournament.prizePool)} on the line — see you at
            check-in at {tournament.checkIn}.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 rounded-2xl border border-white/10 bg-panel/90 p-6 backdrop-blur-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Your confirmation code
            </p>
            <p
              className="mt-2.5 inline-block rounded-xl border border-dashed px-6 py-3 font-mono text-2xl font-bold tracking-[0.14em] sm:text-3xl"
              style={{ borderColor: "var(--accent)", color: "var(--accent)", backgroundColor: "var(--glow)" }}
            >
              {registration.code}
            </p>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-zinc-500">
              <Mail className="size-3.5" aria-hidden />
              Sent to {registration.email} — screenshot it, you&apos;ll show it at the desk.
            </p>

            <dl className="mt-7 divide-y divide-white/6 border-t border-white/8 text-left">
              {details.map((d) => (
                <div key={d.label} className="flex items-baseline justify-between gap-6 py-3 text-sm">
                  <dt className="shrink-0 text-zinc-500">{d.label}</dt>
                  <dd className="text-right font-medium text-zinc-200">{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={`/tournaments/${tournament.id}`}
              className="btn-accent inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-display text-[15px] font-bold"
            >
              <CalendarDays className="size-4" aria-hidden />
              View match schedule
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 font-display text-[15px] font-bold text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/5"
            >
              <Home className="size-4" aria-hidden />
              Back to home
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
