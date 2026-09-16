import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  CalendarDays,
  Trophy,
  Users,
  Map,
  Clock3,
  Medal,
  CheckCircle2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { getGame } from "@/lib/games";
import { getTournament, formatMoney, formatDate, daysUntil } from "@/lib/tournaments";
import { getSlotUsage } from "@/lib/slots";
import { Reveal } from "@/components/reveal";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const tournament = getTournament(id);
  if (!tournament) return { title: "Tournament not found" };
  const game = getGame(tournament.gameSlug);
  return {
    title: tournament.name,
    description: `${tournament.name} — a ${game?.name} tournament on ${formatDate(tournament.startDate)} with a ${formatMoney(tournament.prizePool)} prize pool.`,
  };
}

export default async function TournamentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tournament = getTournament(id);
  if (!tournament) notFound();

  const game = getGame(tournament.gameSlug);
  if (!game) notFound();

  const usage = await getSlotUsage();
  const remaining = tournament.slots - (usage[tournament.id] ?? 0);
  const filledPct = Math.min(
    100,
    Math.max(4, Math.round(((tournament.slots - remaining) / tournament.slots) * 100)),
  );
  const days = daysUntil(tournament.startDate);

  const meta = [
    { icon: CalendarDays, label: formatDate(tournament.startDate) },
    { icon: Clock3, label: `Check-in ${tournament.checkIn}` },
    { icon: Users, label: tournament.teamLabel },
    { icon: Map, label: tournament.mapsLabel },
  ];

  return (
    <main style={game.theme.vars} className="relative overflow-hidden pt-16">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative">
        <div className="absolute inset-0" aria-hidden>
          <Image src={game.image} alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08090e]/60 via-[#08090e]/80 to-[#08090e]" />
          <div className="absolute inset-0" style={{ background: game.theme.heroBg }} />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-10 sm:pt-14">
          <Reveal>
            <Link
              href="/#tournaments"
              className="inline-flex items-center gap-1 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              <ChevronLeft className="size-4" aria-hidden />
              All tournaments
            </Link>
          </Reveal>

          <div className="mt-10 max-w-3xl">
            <Reveal delay={0.05}>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em]"
                style={{ borderColor: "var(--glow)", backgroundColor: "var(--glow)", color: "var(--accent)" }}
              >
                {game.fullName}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 font-display text-[clamp(2.4rem,5.5vw,4rem)] font-bold leading-[1.02] tracking-tight text-white">
                {tournament.name}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 max-w-xl text-lg text-zinc-400">
                {days > 0 ? (
                  <>Starts in <strong className="text-white">{days} days</strong> — </>
                ) : null}
                {remaining} of {tournament.slots} {tournament.slotLabel} remaining.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-6 flex flex-wrap gap-2">
                {meta.map((m) => (
                  <li
                    key={m.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3.5 py-2 text-[13px] font-medium text-zinc-300 backdrop-blur-sm"
                  >
                    <m.icon className="size-3.5" style={{ color: "var(--accent)" }} aria-hidden />
                    {m.label}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.26}>
              <Link
                href={`/games/${game.slug}`}
                className="btn-accent group mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-display text-[15px] font-bold"
              >
                Register for this tournament
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Body ───────────────────────────────────────────────── */}
      <section className="relative mx-auto grid max-w-6xl gap-6 px-5 pb-24 lg:grid-cols-[1.5fr_1fr]">
        {/* Left column */}
        <div className="space-y-6">
          <Reveal>
            <section className="rounded-2xl border border-white/10 bg-panel/80 p-6 sm:p-7" aria-labelledby="format-h">
              <h2 id="format-h" className="flex items-center gap-2 font-display text-lg font-bold text-white">
                <Layers className="size-5" style={{ color: "var(--accent)" }} aria-hidden />
                Format
              </h2>
              <ol className="mt-5 space-y-3.5">
                {tournament.formatLines.map((line, i) => (
                  <li key={line} className="flex items-start gap-3.5 text-sm leading-relaxed text-zinc-400">
                    <span
                      className="grid size-6 shrink-0 place-items-center rounded-md font-mono text-xs font-bold"
                      style={{ backgroundColor: "var(--glow)", color: "var(--accent)" }}
                    >
                      {i + 1}
                    </span>
                    {line}
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          <Reveal delay={0.06}>
            <section className="rounded-2xl border border-white/10 bg-panel/80 p-6 sm:p-7" aria-labelledby="rules-h">
              <h2 id="rules-h" className="flex items-center gap-2 font-display text-lg font-bold text-white">
                <CheckCircle2 className="size-5" style={{ color: "var(--accent)" }} aria-hidden />
                Rules
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {tournament.rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2.5 rounded-xl bg-white/[0.03] p-3.5 text-[13px] leading-relaxed text-zinc-400">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" style={{ color: "var(--accent)" }} aria-hidden />
                    {rule}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal delay={0.1}>
            <section className="rounded-2xl border border-white/10 bg-panel/80 p-6 sm:p-7" aria-labelledby="schedule-h">
              <h2 id="schedule-h" className="flex items-center gap-2 font-display text-lg font-bold text-white">
                <Clock3 className="size-5" style={{ color: "var(--accent)" }} aria-hidden />
                Schedule
              </h2>
              <ol className="relative mt-6 space-y-7 border-l border-white/10 pl-0">
                {tournament.schedule.map((s, i) => (
                  <li key={s.time} className="relative grid gap-1 pl-8 sm:grid-cols-[4rem_1fr] sm:gap-4">
                    <span
                      className="absolute -left-[5px] top-1.5 size-2.5 rounded-full ring-4 ring-[#0b0c12]"
                      style={{ backgroundColor: "var(--accent)" }}
                      aria-hidden
                    />
                    <span className="font-mono text-sm font-semibold" style={{ color: "var(--accent)" }}>
                      {s.time}
                    </span>
                    <span>
                      <span className="block font-semibold text-zinc-100">{s.title}</span>
                      <span className="mt-0.5 block text-sm text-zinc-500">{s.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>
        </div>

        {/* Right column */}
        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Reveal delay={0.08}>
            <section className="rounded-2xl border border-white/10 bg-panel/80 p-6" aria-labelledby="prize-h">
              <h2 id="prize-h" className="flex items-center gap-2 font-display text-lg font-bold text-white">
                <Medal className="size-5" style={{ color: "var(--accent)" }} aria-hidden />
                Prize breakdown
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Total pool <strong className="font-semibold" style={{ color: "var(--accent)" }}>{formatMoney(tournament.prizePool)}</strong>
              </p>
              <div className="mt-5 space-y-3">
                {tournament.prizeBreakdown.map((p, i) => (
                  <div
                    key={p.place}
                    className={`flex items-center justify-between gap-4 rounded-xl border p-4 ${
                      i === 0 ? "border-[var(--accent)] bg-white/[0.05]" : "border-white/8 bg-white/[0.03]"
                    }`}
                    style={i === 0 ? { boxShadow: "0 10px 40px -14px var(--glow)" } : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="grid size-9 place-items-center rounded-lg font-display text-sm font-bold"
                        style={{
                          backgroundColor: i === 0 ? "var(--accent)" : "var(--glow)",
                          color: i === 0 ? "var(--accent-ink)" : "var(--accent)",
                        }}
                      >
                        {p.place}
                      </span>
                      <div>
                        <p className="font-display text-lg font-bold text-white">{formatMoney(p.amount)}</p>
                        <p className="text-xs text-zinc-500">{p.note}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.14}>
            <section className="rounded-2xl border border-white/10 bg-panel/80 p-6" aria-labelledby="slots-h">
              <h2 id="slots-h" className="flex items-center gap-2 font-display text-lg font-bold text-white">
                <Trophy className="size-5" style={{ color: "var(--accent)" }} aria-hidden />
                Availability
              </h2>
              <div className="mt-4 flex items-baseline justify-between text-sm">
                <span className="text-zinc-400">{tournament.teamLabel}</span>
                <span className="text-zinc-500">
                  <strong className="font-display text-xl font-bold text-white">{remaining}</strong> /{" "}
                  {tournament.slots} left
                </span>
              </div>
              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white/8">
                <div className="h-full rounded-full" style={{ width: `${filledPct}%`, backgroundColor: "var(--accent)" }} />
              </div>
              <dl className="mt-5 space-y-2.5 border-t border-white/8 pt-5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">Registration closes</dt>
                  <dd className="font-medium text-zinc-200">{formatDate(tournament.regDeadline)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">Tournament starts</dt>
                  <dd className="font-medium text-zinc-200">{formatDate(tournament.startDate)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">Check-in</dt>
                  <dd className="font-medium text-zinc-200">{tournament.checkIn}</dd>
                </div>
              </dl>
              <Link
                href={`/games/${game.slug}`}
                className="btn-accent mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-display text-[15px] font-bold"
              >
                Register now
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </section>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
