"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swords, Menu, X, ArrowRight } from "lucide-react";
import { GAMES } from "@/lib/games";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#08090e]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="TripleThreatEsports home">
          <span className="grid size-9 place-items-center rounded-lg bg-amber-400/15 text-amber-400 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
            <Swords className="size-5" aria-hidden />
          </span>
          <span className="font-display text-[15px] font-bold tracking-tight">
            TripleThreat<span className="text-amber-400">Esports</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <NavLink href="/#games">Games</NavLink>
          <NavLink href="/#tournaments">Tournaments</NavLink>
          <NavLink href="/#how-it-works">How it works</NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/#games"
            className="group inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-2 text-[13px] font-bold text-[#1d1202] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_-8px_rgba(242,168,59,0.55)]"
          >
            Register now
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <button
          className="grid size-10 place-items-center rounded-lg border border-white/10 text-zinc-300 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/8 bg-[#0a0b11] px-5 pb-6 pt-4 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            <MobileLink href="/#games">Games</MobileLink>
            <MobileLink href="/#tournaments">Tournaments</MobileLink>
            <MobileLink href="/#how-it-works">How it works</MobileLink>
          </div>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Register for a game
          </p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {GAMES.map((g) => (
              <Link
                key={g.slug}
                href={`/games/${g.slug}`}
                className="rounded-lg border border-white/8 px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
              >
                {g.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="rounded-full px-3.5 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-2 py-2.5 text-[15px] font-semibold text-zinc-200 transition-colors hover:bg-white/5"
    >
      {children}
    </Link>
  );
}
