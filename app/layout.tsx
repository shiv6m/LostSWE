import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "LostSWE — Find your CS field",
  description:
    "A free, mission-driven platform to help CS students figure out which field fits them, with a trait quiz, per-field roadmaps, and a curated resource library.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        <header className="border-b border-neutral-800">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Lost<span className="text-indigo-400">SWE</span>
            </Link>
            <div className="flex gap-6 text-sm text-neutral-300">
              <Link href="/quiz" className="hover:text-white">
                Quiz
              </Link>
              <Link href="/library" className="hover:text-white">
                Library
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
        <footer className="mx-auto max-w-5xl px-6 py-10 text-xs text-neutral-500">
          Built to help beginner CS students find a field worth going deep on. Free, always.
        </footer>
      </body>
    </html>
  );
}
