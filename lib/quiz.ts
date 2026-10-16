// Quiz scoring, kept separate from any UI component on purpose — the Oct 29
// roadmap task ("refactor(quiz): pure tested scoring engine") is exactly this
// file, written pure from day one instead of starting tangled into a component.

import { FIELDS, TRAITS, type Field, type TraitId } from "./data";

export interface QuizQuestion {
  id: string;
  prompt: string;
  // Each option nudges one or more traits up or down.
  options: { label: string; weights: Partial<Record<TraitId, number>> }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "A project is more satisfying when it ends with...",
    options: [
      {
        label: "Something people can see and use immediately",
        weights: { visual: 1, creative: 1 },
      },
      {
        label: "A system that quietly keeps working under load",
        weights: { systems: 1, analytical: 1 },
      },
      { label: "A clear answer backed by data", weights: { analytical: 1, math: 1 } },
      { label: "Someone else learning something from it", weights: { people: 1 } },
    ],
  },
  {
    id: "q2",
    prompt: "When you're stuck on a bug, you usually...",
    options: [
      {
        label: "Sketch the data flow until the mismatch is visible",
        weights: { visual: 1, systems: 1 },
      },
      {
        label: "Write a quick experiment to isolate the variable",
        weights: { analytical: 1, math: 1 },
      },
      { label: "Ask someone to rubber-duck it with you", weights: { people: 1 } },
      { label: "Try a few creative workarounds first", weights: { creative: 1 } },
    ],
  },
  {
    id: "q3",
    prompt: "Pick the class you'd enjoy most:",
    options: [
      { label: "Linear algebra", weights: { math: 2 } },
      { label: "Human-computer interaction", weights: { visual: 1, people: 1 } },
      { label: "Operating systems", weights: { systems: 2 } },
      { label: "Statistics", weights: { analytical: 1, math: 1 } },
    ],
  },
  {
    id: "q4",
    prompt: "You'd rather spend a free Saturday...",
    options: [
      { label: "Building a tiny app or game for fun", weights: { creative: 1, visual: 1 } },
      { label: "Reading about how a real system (DB, OS, network) works", weights: { systems: 1 } },
      {
        label: "Poking at a public dataset to see what's in it",
        weights: { analytical: 1, math: 1 },
      },
      { label: "Helping a friend debug their code", weights: { people: 1 } },
    ],
  },
  {
    id: "q5",
    prompt: "Which failure mode would bother you more?",
    options: [
      {
        label: "A UI that's technically correct but ugly and confusing",
        weights: { visual: 1, creative: 1 },
      },
      {
        label: "A service that works until it suddenly doesn't, at scale",
        weights: { systems: 1 },
      },
      { label: "A conclusion based on sloppy statistics", weights: { analytical: 1, math: 1 } },
      { label: "A tool nobody can figure out how to use without help", weights: { people: 1 } },
    ],
  },
];

export type QuizAnswers = Record<string, number>; // questionId -> chosen option index

export function scoreTraits(answers: QuizAnswers): Record<TraitId, number> {
  const totals = Object.fromEntries(TRAITS.map((t) => [t.id, 0])) as Record<TraitId, number>;

  for (const question of QUIZ_QUESTIONS) {
    const chosenIndex = answers[question.id];
    if (chosenIndex === undefined) continue;
    const option = question.options[chosenIndex];
    if (!option) continue;
    for (const [trait, weight] of Object.entries(option.weights)) {
      totals[trait as TraitId] += weight as number;
    }
  }

  return totals;
}

export interface FieldMatch {
  field: Field;
  score: number;
}

// Deterministic tie-break: fields are compared by score, then by their fixed
// declaration order in FIELDS (stable sort), so re-running the same answers
// always returns the same ranking.
export function rankFields(answers: QuizAnswers): FieldMatch[] {
  const traitScores = scoreTraits(answers);

  const scored = FIELDS.map((field) => {
    let score = 0;
    for (const [trait, weight] of Object.entries(field.traitWeights)) {
      score += (traitScores[trait as TraitId] ?? 0) * (weight as number);
    }
    return { field, score };
  });

  return scored
    .map((entry, index) => ({ ...entry, index }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ field, score }) => ({ field, score }));
}

export function encodeAnswers(answers: QuizAnswers): string {
  return QUIZ_QUESTIONS.map((q) => answers[q.id] ?? "").join(",");
}

export function decodeAnswers(encoded: string): QuizAnswers {
  const parts = encoded.split(",");
  const answers: QuizAnswers = {};
  QUIZ_QUESTIONS.forEach((q, i) => {
    const val = parts[i];
    if (val !== undefined && val !== "") {
      answers[q.id] = Number(val);
    }
  });
  return answers;
}
