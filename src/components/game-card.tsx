import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Users } from "lucide-react";
import type { Game } from "@/lib/games";
import type { Tournament } from "@/lib/tournaments";
import { formatMoney } from "@/lib/tournaments";

export function GameCard({
  game,
  tournament,
  priority = false,
}: {
  game: Game;
  tournament?: Tournament;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/games/${game.slug}`}
      style={game.theme.vars}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-panel transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--accent)] hover:shadow-[0_20px_50px_-12px_var(--glow)]"
    >
      <div className="relative aspect-[16/8] overflow-hidden">
        <Image
          src={game.image}
          alt={`${game.name} artwork`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f16] via-[#0e0f16]/25 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
          {game.chipLabel}
        </span>
      </div>

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold tracking-tight text-white transition-colors group-hover:text-[var(--accent)]">
              {game.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-500">{game.tagline}</p>
          </div>
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/12 text-zinc-400 transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4 text-xs text-zinc-500">
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5 text-[var(--accent)]" aria-hidden />
            {game.modeLabel}
          </span>
          {tournament && (
            <span className="font-semibold text-zinc-300">
              {formatMoney(tournament.prizePool)} prize pool
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
