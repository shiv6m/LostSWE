import { RESOURCES } from "@/lib/data";

// Filters live in URL search params (not component state) per the Oct 31
// roadmap task, so a filtered view of the library is itself a shareable link.
export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; free?: string }>;
}) {
  const { q, free } = await searchParams;
  const query = (q ?? "").toLowerCase();
  const freeOnly = free === "1";

  const filtered = RESOURCES.filter((r) => {
    if (freeOnly && !r.free) return false;
    if (query && !r.title.toLowerCase().includes(query)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Resource library</h1>
        <p className="mt-1 text-sm text-neutral-400">
          {RESOURCES.length} curated resources · {RESOURCES.filter((r) => r.free).length} free
        </p>
      </div>

      <form className="flex flex-wrap items-center gap-3" action="/library">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search resources..."
          className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white placeholder-neutral-600 focus:border-indigo-500 focus:outline-none"
        />
        <label className="flex items-center gap-2 text-sm text-neutral-400">
          <input type="checkbox" name="free" value="1" defaultChecked={freeOnly} />
          Free only
        </label>
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
        >
          Filter
        </button>
      </form>

      <p className="text-xs text-neutral-600">
        {filtered.length} result{filtered.length === 1 ? "" : "s"}
      </p>

      <ul className="divide-y divide-neutral-900">
        {filtered.map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-4 py-3">
            <a
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:underline"
            >
              {r.title}
            </a>
            <div className="flex shrink-0 items-center gap-3 text-xs text-neutral-600">
              {!r.free && <span>paid</span>}
              <span>reviewed {r.lastReviewed}</span>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="py-6 text-center text-sm text-neutral-600">
            No resources match that filter.
          </li>
        )}
      </ul>
    </div>
  );
}
