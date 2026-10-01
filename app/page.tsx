import Link from "next/link";
import { FIELDS } from "@/lib/data";

// Homepage. The roadmap's Nov 2 task gives this an actual constellation
// animation (motion-safe, with an accessible list fallback); for now it's
// that same list, laid out as a simple grid, so the real content and
// navigation exist to audit and build on top of.
export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4 py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Not sure which CS field is yours?
        </h1>
        <p className="mx-auto max-w-xl text-neutral-400">
          Take a 2-minute quiz, see which fields fit how you think, and get a free
          roadmap to go from beginner to job-ready — curated, not generated.
        </p>
        <Link
          href="/quiz"
          className="inline-block rounded-full bg-indigo-500 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-400"
        >
          Take the quiz
        </Link>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-neutral-500">
          Browse fields
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <Link
              key={field.id}
              href={`/fields/${field.id}`}
              className="rounded-lg border border-neutral-800 p-5 transition hover:border-indigo-500 hover:bg-neutral-900"
            >
              <h3 className="font-semibold text-white">{field.name}</h3>
              <p className="mt-1 text-sm text-neutral-400">{field.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
