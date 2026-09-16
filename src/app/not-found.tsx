import Link from "next/link";
import { Home, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-5 pt-16">
      <div className="bg-grid grid-fade absolute inset-0" aria-hidden />
      <div className="relative text-center">
        <Ghost className="mx-auto size-10 text-amber-400" aria-hidden />
        <p className="mt-6 font-display text-6xl font-bold tracking-tight text-white sm:text-7xl">404</p>
        <p className="mt-3 text-lg text-zinc-400">This arena doesn&apos;t exist — you got eliminated on the way in.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-[#1d1202] transition-transform hover:-translate-y-0.5"
        >
          <Home className="size-4" aria-hidden />
          Back to the lobby
        </Link>
      </div>
    </main>
  );
}
