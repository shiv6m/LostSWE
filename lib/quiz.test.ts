import { describe, expect, it } from "vitest";
import { FIELDS } from "./data";
import { QUIZ_QUESTIONS, decodeAnswers, encodeAnswers, rankFields } from "./quiz";

describe("quiz smoke test", () => {
  const answers = Object.fromEntries(QUIZ_QUESTIONS.map((q) => [q.id, 0]));

  it("ranks every field exactly once", () => {
    const ranked = rankFields(answers);
    expect(ranked.map((r) => r.field.id).sort()).toEqual(FIELDS.map((f) => f.id).sort());
  });

  it("is deterministic for the same answers", () => {
    expect(rankFields(answers)).toEqual(rankFields(answers));
  });

  it("round-trips answers through the shareable URL encoding", () => {
    expect(decodeAnswers(encodeAnswers(answers))).toEqual(answers);
  });
});
