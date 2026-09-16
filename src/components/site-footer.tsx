import Link from "next/link";
import { Swords, Tv, AtSign, Play } from "lucide-react";
import { GAMES } from "@/lib/games";
import { TOURNAMENTS } from "@/lib/tournaments";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#07080c]">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-amber-400/15 text-amber-400">
                <Swords className="size-5" aria-hidden />
              </span>
              <span className="font-display text-[15px] font-bold tracking-tight">
                TripleThreat<span className="text-amber-400">Esports</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              One platform, six arenas. Register, squad up, and take your place on the bracket.
            </p>
            <div className="mt-5 flex gap-2.5">
              {[Tv, AtSign, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid size-9 place-items-center rounded-lg border border-white/10 text-zinc-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 hover:text-amber-400"
                >
                  <Icon className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Games</p>
            <ul className="mt-4 space-y-2.5">
              {GAMES.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/games/${g.slug}`}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {g.name} registration
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Tournaments</p>
            <ul className="mt-4 space-y-2.5">
              {TOURNAMENTS.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/tournaments/${t.id}`}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/8 pt-6 text-xs text-zinc-600 md:flex-row md:items-center md:justify-between">
          <p>© 2026 TripleThreatEsports. A portfolio demo.</p>
          <p>All game titles are trademarks of their respective owners. Not affiliated with any publisher.</p>
        </div>
      </div>
    </footer>
  );
}
