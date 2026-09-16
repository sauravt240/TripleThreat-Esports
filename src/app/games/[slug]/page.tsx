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
  ListChecks,
  Clock3,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import { getGame } from "@/lib/games";
import { getTournamentForGame, formatMoney, formatDate } from "@/lib/tournaments";
import { getSlotUsage } from "@/lib/slots";
import { RegistrationForm } from "@/components/registration-form";
import { Reveal } from "@/components/reveal";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return { title: "Game not found" };
  return {
    title: `${game.name} tournament registration`,
    description: game.description,
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const tournament = getTournamentForGame(game.slug);
  if (!tournament) notFound();

  const usage = await getSlotUsage();
  const remaining = tournament.slots - (usage[tournament.id] ?? 0);

  const chips = [
    { icon: Users, label: game.modeLabel },
    { icon: CalendarDays, label: formatDate(tournament.startDate) },
    { icon: Trophy, label: `${formatMoney(tournament.prizePool)} prize pool` },
    { icon: Map, label: tournament.mapsLabel },
  ];

  return (
    <main style={game.theme.vars} className="relative overflow-hidden pt-16">
      {/* Themed hero wash */}
      <div className="absolute inset-x-0 top-0 h-[560px]" style={{ background: game.theme.heroBg }} aria-hidden />
      <div className="bg-grid grid-fade absolute inset-x-0 top-0 h-[560px]" aria-hidden />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-5 pb-14 pt-10 sm:pt-14">
        <Reveal>
          <Link
            href="/#games"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <ChevronLeft className="size-4" aria-hidden />
            All games
          </Link>
        </Reveal>

        <div className="mt-7 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal delay={0.05}>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em]"
                style={{ borderColor: "var(--glow)", backgroundColor: "var(--glow)", color: "var(--accent)" }}
              >
                {game.chipLabel}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,4.4rem)] font-bold leading-[0.98] tracking-tight text-white">
                {game.name}
                <span
                  className="mt-2 block text-[clamp(1.25rem,2.6vw,1.8rem)] font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  {tournament.name}
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-400">{game.description}</p>
            </Reveal>
            <Reveal delay={0.22}>
              <ul className="mt-7 flex flex-wrap gap-2">
                {chips.map((c) => (
                  <li
                    key={c.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-zinc-300 backdrop-blur-sm"
                  >
                    <c.icon className="size-3.5" style={{ color: "var(--accent)" }} aria-hidden />
                    {c.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div
              className="relative overflow-hidden rounded-2xl border border-white/12"
              style={{ boxShadow: "0 30px 90px -30px var(--glow)" }}
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={game.image}
                  alt={`${game.fullName} key art`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090e]/70 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-5 font-display text-sm font-bold uppercase tracking-[0.2em] text-white/90">
                  {game.tagline}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Content: glance + form ───────────────────────── */}
      <section className="relative mx-auto grid max-w-6xl gap-8 px-5 pb-24 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-panel/80 p-6 backdrop-blur-sm">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
                <ListChecks className="size-5" style={{ color: "var(--accent)" }} aria-hidden />
                Tournament at a glance
              </h2>
              <ul className="mt-5 space-y-3">
                {tournament.formatLines.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-400">
                    <span
                      className="mt-[7px] size-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--accent)" }}
                      aria-hidden
                    />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/8 pt-5 text-center">
                {tournament.prizeBreakdown.map((p) => (
                  <div key={p.place} className="rounded-xl bg-white/[0.04] px-2 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500">{p.place}</p>
                    <p className="mt-1 font-display text-base font-bold" style={{ color: "var(--accent)" }}>
                      {formatMoney(p.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-white/10 bg-panel/80 p-6 backdrop-blur-sm">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
                <Clock3 className="size-5" style={{ color: "var(--accent)" }} aria-hidden />
                Match day schedule
              </h2>
              <ol className="mt-5 space-y-4">
                {tournament.schedule.map((s) => (
                  <li key={s.time} className="flex gap-4">
                    <span className="w-12 shrink-0 pt-0.5 font-mono text-sm font-semibold" style={{ color: "var(--accent)" }}>
                      {s.time}
                    </span>
                    <span className="text-sm">
                      <span className="block font-semibold text-zinc-200">{s.title}</span>
                      <span className="mt-0.5 block text-zinc-500">{s.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <Link
                href={`/tournaments/${tournament.id}`}
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-300 transition-colors hover:text-[var(--accent)]"
              >
                Full rules, format & prize breakdown
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="flex items-start gap-2.5 rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-xs leading-relaxed text-zinc-500">
              <BadgeCheck className="mt-0.5 size-4 shrink-0" style={{ color: "var(--accent)" }} aria-hidden />
              Slots are allocated first-come, first-served your game ID is verified at check-in. One
              registration per game ID per tournament — duplicates are rejected automatically.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:sticky lg:top-24 lg:self-start">
          <RegistrationForm game={game} tournament={tournament} remaining={remaining} />
        </Reveal>
      </section>
    </main>
  );
}
