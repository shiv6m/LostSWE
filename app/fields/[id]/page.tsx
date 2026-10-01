import { notFound } from "next/navigation";
import Link from "next/link";
import { FIELDS, getField, getResourcesByIds } from "@/lib/data";

// Server Component with generateStaticParams, per the Oct 28 roadmap task —
// field content is baked at build time and never shipped to the client bundle.
export function generateStaticParams() {
  return FIELDS.map((field) => ({ id: field.id }));
}

export default async function FieldPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const field = getField(id);
  if (!field) notFound();

  return (
    <div className="space-y-10">
      <div>
        <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-300">
          ← All fields
        </Link>
        <h1 className="mt-2 text-3xl font-bold">{field.name}</h1>
        <p className="mt-1 text-neutral-400">{field.tagline}</p>
        <p className="mt-4 max-w-2xl text-neutral-300">{field.description}</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          Roadmap
        </h2>
        {field.roadmap.map((phase, i) => {
          const resources = getResourcesByIds(phase.resourceIds);
          return (
            <div key={phase.title} className="rounded-lg border border-neutral-800 p-5">
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-semibold text-indigo-400">
                  PHASE {i + 1}
                </span>
                <h3 className="font-semibold text-white">{phase.title}</h3>
              </div>
              <p className="mt-2 text-sm text-neutral-400">{phase.description}</p>
              {resources.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {resources.map((r) => (
                    <li key={r.id} className="text-sm">
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 hover:underline"
                      >
                        {r.title}
                      </a>
                      {!r.free && <span className="ml-2 text-xs text-neutral-600">paid</span>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
