"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUIZ_QUESTIONS, type QuizAnswers, encodeAnswers } from "@/lib/quiz";

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const question = QUIZ_QUESTIONS[step];
  const progress = Math.round((step / QUIZ_QUESTIONS.length) * 100);

  function choose(optionIndex: number) {
    const next = { ...answers, [question.id]: optionIndex };
    setAnswers(next);
    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      router.push(`/results/${encodeAnswers(next)}`);
    }
  }

  function goBack() {
    if (step > 0) setStep(step - 1);
  }

  return (
    <div
      className="mx-auto max-w-xl space-y-8"
      onKeyDown={(e) => {
        const n = Number(e.key);
        if (n >= 1 && n <= question.options.length) choose(n - 1);
        if (e.key === "Backspace") goBack();
      }}
      tabIndex={0}
    >
      <div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-800">
          <div
            className="h-full bg-indigo-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          Question {step + 1} of {QUIZ_QUESTIONS.length}
        </p>
      </div>

      <h1 className="text-2xl font-semibold">{question.prompt}</h1>

      <div className="space-y-3">
        {question.options.map((option, i) => (
          <button
            key={option.label}
            onClick={() => choose(i)}
            className="flex w-full items-center gap-3 rounded-lg border border-neutral-800 p-4 text-left transition hover:border-indigo-500 hover:bg-neutral-900"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-neutral-700 text-xs text-neutral-500">
              {i + 1}
            </span>
            {option.label}
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          onClick={goBack}
          className="text-sm text-neutral-500 hover:text-neutral-300"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
