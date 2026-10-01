import Link from "next/link";
import { decodeAnswers, rankFields } from "@/lib/quiz";

// Results are derived entirely from the URL segment, so a result link is
// shareable without any server-side storage — exactly the Oct 30 roadmap
// requirement ("result encoded in the URL so it can be shared").
export default async function ResultsPage({
  params,
}: {
  params: Promise<{ encoded: string }>;
}) {
  const { encoded } = await params;
  const answers = decodeAnswers(decodeURIComponent(encoded));
  const ranked = rankFields(answers).slice(0, 3);

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Your top matches</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Based on your answers — not a verdict, just a starting point.
        </p>
      </div>

      <div className="space-y-4">
        {ranked.map(({ field, score }, i) => (
          <Link
            key={field.id}
            href={`/fields/${field.id}`}
            className="block rounded-lg border border-neutral-800 p-5 transition hover:border-indigo-500 hover:bg-neutral-900"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-white">
                #{i + 1} {field.name}
              </h2>
              <span className="text-xs text-neutral-600">score {score}</span>
            </div>
            <p className="mt-1 text-sm text-neutral-400">{field.tagline}</p>
          </Link>
        ))}
      </div>

      <Link href="/quiz" className="text-sm text-neutral-500 hover:text-neutral-300">
        ← Retake the quiz
      </Link>
    </div>
  );
}
