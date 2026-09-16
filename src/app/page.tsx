import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Zap,
  Trophy,
  Gamepad2,
  ClipboardList,
  Users,
  Sparkles,
} from "lucide-react";
import { GAMES, getGame } from "@/lib/games";
import {
  TOURNAMENTS,
  getTournamentForGame,
  TOTAL_PRIZE_POOL,
  TOTAL_SLOTS,
  formatMoney,
} from "@/lib/tournaments";
import { getSlotUsage, getRegistrationCount } from "@/lib/slots";
import { GameCard } from "@/components/game-card";
import { TournamentCard } from "@/components/tournament-card";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";

export const dynamic = "force-dynamic";

const COLLAGE = [
  { slug: "bgmi", className: "top-2 left-4 w-72 -rotate-[5deg]", delay: 0.1 },
  { slug: "tekken-8", className: "top-44 right-0 w-[21rem] rotate-[3deg]", delay: 0.25 },
  { slug: "free-fire", className: "bottom-0 left-14 w-64 -rotate-[2deg]", delay: 0.4 },
];

export default async function HomePage() {
  const usage = await getSlotUsage();
  const registered = await getRegistrationCount();

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16">
        <div className="bg-grid grid-fade absolute inset-0" aria-hidden />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(900px 480px at 65% -10%, rgba(242,168,59,0.16), transparent 65%), radial-gradient(600px 380px at 10% 20%, rgba(242,168,59,0.07), transparent 70%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-amber-400" />
                </span>
                Season 3 registration is open
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display text-[clamp(2.9rem,6.5vw,4.9rem)] font-bold leading-[0.98] tracking-tight text-white">
                Register today.
                <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Dominate tomorrow.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
                TripleThreatEsports is the registration hub for six competitive arenas — squad
                battlegrounds, tactical fps lobbies and fighting-game brackets. Pick your game,
                claim your slot, and show up ready.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/#tournaments"
                  className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 font-display text-[15px] font-bold text-[#1d1202] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-10px_rgba(242,168,59,0.6)]"
                >
                  Browse tournaments
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
                <Link
                  href="/#games"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 font-display text-[15px] font-bold text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/5"
                >
                  See the games
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <dl className="mt-14 grid max-w-lg grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-4">
                <Stat label="Prize pool" value={<CountUp to={TOTAL_PRIZE_POOL} prefix="$" />} />
                <Stat label="Tournaments" value={<CountUp to={TOURNAMENTS.length} />} />
                <Stat label="Open slots" value={<CountUp to={TOTAL_SLOTS} />} />
                <Stat label="Players in" value={<CountUp to={registered} suffix="+" />} />
              </dl>
            </Reveal>
          </div>

          {/* Collage */}
          <div className="relative hidden h-[580px] lg:block" aria-hidden>
            {COLLAGE.map(({ slug, className, delay }) => {
              const game = getGame(slug)!;
              return (
                <Reveal key={slug} delay={delay} className={`absolute ${className}`}>
                  <div className="animate-float overflow-hidden rounded-2xl border border-white/12 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.85)]">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={game.image}
                        alt=""
                        fill
                        priority
                        sizes="340px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-white/8 bg-[#0a0b10] py-3.5" aria-hidden>
        <div className="animate-marquee flex w-max items-center gap-8 pr-8">
          {[...GAMES, ...GAMES].map((g, i) => (
            <span
              key={`${g.slug}-${i}`}
              className="flex items-center gap-8 font-display text-sm font-bold uppercase tracking-[0.24em] text-zinc-600"
            >
              {g.name}
              <Zap className="size-3.5 text-amber-400/70" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Games ────────────────────────────────────────── */}
      <section id="games" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHeading
              eyebrow="Choose your arena"
              title="Six games. Six battlegrounds."
              sub="Every registration page is tuned to its game — its colors, its format, its fields. Pick yours and lock in."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GAMES.map((game, i) => (
              <Reveal key={game.slug} delay={(i % 3) * 0.08}>
                <GameCard game={game} tournament={getTournamentForGame(game.slug)} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tournaments ──────────────────────────────────── */}
      <section id="tournaments" className="scroll-mt-24 border-t border-white/6 bg-[#0a0b11] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="On the calendar"
                title="Upcoming tournaments"
                sub={`${formatMoney(TOTAL_PRIZE_POOL)} on the line this season. Slots update live as players register.`}
              />
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-zinc-400">
                <Sparkles className="size-3.5 text-amber-400" aria-hidden />
                Live availability · updates instantly
              </span>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOURNAMENTS.map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 0.08} className="h-full">
                <TournamentCard
                  tournament={t}
                  game={getGame(t.gameSlug)!}
                  remaining={t.slots - (usage[t.id] ?? 0)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section id="how-it-works" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHeading
              eyebrow="Zero friction"
              title="From signup to stage in three steps"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="group relative h-full rounded-2xl border border-white/10 bg-panel p-6 transition-all duration-500 hover:-translate-y-1 hover:border-amber-400/40">
                  <span className="absolute right-5 top-5 font-display text-4xl font-bold text-white/8 transition-colors group-hover:text-amber-400/20">
                    0{i + 1}
                  </span>
                  <span className="grid size-11 place-items-center rounded-xl bg-amber-400/12 text-amber-400">
                    <s.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="px-5 pb-24">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/12 via-panel to-panel px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
            <Users className="relative mx-auto size-8 text-amber-400" aria-hidden />
            <h2 className="relative mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your bracket is waiting.
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-zinc-400">
              Registration takes under two minutes, and your confirmation code is issued instantly.
            </p>
            <Link
              href="/#games"
              className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 font-display text-[15px] font-bold text-[#1d1202] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-10px_rgba(242,168,59,0.6)]"
            >
              <Trophy className="size-4" aria-hidden />
              Find your game
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-2xl font-bold tracking-tight text-white sm:text-[1.7rem]">
        {value}
      </dd>
      <dd className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">{label}</dd>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.26em] text-amber-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {sub && <p className="mt-3 leading-relaxed text-zinc-400">{sub}</p>}
    </div>
  );
}

const STEPS = [
  {
    icon: Gamepad2,
    title: "Pick your game",
    body: "Choose from six competitive titles — each tournament page lists the format, maps and prize breakdown up front.",
  },
  {
    icon: ClipboardList,
    title: "Fill the roster",
    body: "Squad-based games ask for your team and role; fighting games ask for your main and rank. Two minutes, no account needed.",
  },
  {
    icon: Trophy,
    title: "Compete on stage",
    body: "Get your confirmation code instantly, check in 30 minutes before your pool, and run your bracket to the trophy.",
  },
];
