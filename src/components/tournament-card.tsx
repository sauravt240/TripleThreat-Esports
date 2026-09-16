import Link from "next/link";
import { CalendarDays, MapPin, Trophy, ArrowRight } from "lucide-react";
import type { Game } from "@/lib/games";
import type { Tournament } from "@/lib/tournaments";
import { formatMoney, formatDate, daysUntil } from "@/lib/tournaments";

export function TournamentCard({
  tournament,
  game,
  remaining,
}: {
  tournament: Tournament;
  game: Game;
  remaining: number;
}) {
  const filledPct = Math.max(
    0,
    Math.min(100, Math.round(((tournament.slots - remaining) / tournament.slots) * 100)),
  );
  const days = daysUntil(tournament.startDate);

  return (
    <article
      style={game.theme.vars}
      className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-panel p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_18px_44px_-12px_var(--glow)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]"
          style={{ backgroundColor: "var(--glow)", color: "var(--accent)" }}
        >
          {game.name}
        </span>
        <span className="text-xs font-medium text-zinc-500">
          {days > 0 ? `in ${days} days` : days === 0 ? "today" : "completed"}
        </span>
      </div>

      <h3 className="mt-4 font-display text-[17px] font-bold leading-snug tracking-tight text-white">
        <Link href={`/tournaments/${tournament.id}`} className="transition-colors group-hover:text-[var(--accent)]">
          {tournament.name}
        </Link>
      </h3>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div className="flex items-center gap-2 text-zinc-400">
          <CalendarDays className="size-4 shrink-0 text-[var(--accent)]" aria-hidden />
          <span>{formatDate(tournament.startDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <Trophy className="size-4 shrink-0 text-[var(--accent)]" aria-hidden />
          <span>{formatMoney(tournament.prizePool)}</span>
        </div>
        <div className="col-span-2 flex items-center gap-2 text-zinc-400">
          <MapPin className="size-4 shrink-0 text-[var(--accent)]" aria-hidden />
          <span className="truncate">{tournament.mapsLabel}</span>
        </div>
      </dl>

      <div className="mt-5">
        <div className="flex items-baseline justify-between text-xs">
          <span className="font-semibold text-zinc-300">{tournament.teamLabel}</span>
          <span className="text-zinc-500">
            <strong className="font-semibold text-zinc-200">{remaining}</strong> / {tournament.slots}{" "}
            {tournament.slotLabel} left
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8" role="img" aria-label={`${filledPct}% of slots filled`}>
          <div
            className="h-full rounded-full transition-[width] duration-700"
            style={{ width: `${Math.max(4, filledPct)}%`, backgroundColor: "var(--accent)" }}
          />
        </div>
      </div>

      <Link
        href={`/tournaments/${tournament.id}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-300 transition-colors hover:text-[var(--accent)]"
      >
        View details
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </Link>
    </article>
  );
}
