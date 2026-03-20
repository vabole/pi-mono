import { describe, expect, it } from "vitest";
import { isContextOverflow } from "../src/utils/overflow.js";

describe("isContextOverflow", () => {
	it("should treat GitHub Copilot 413 parse failures as overflow-style payload errors", () => {
		expect(
			isContextOverflow(
				{
					role: "assistant",
					content: [],
					api: "openai-responses",
					provider: "github-copilot",
					model: "gpt-5.4",
					usage: {
						input: 0,
						output: 0,
						cacheRead: 0,
						cacheWrite: 0,
						totalTokens: 0,
						cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
					},
					stopReason: "error",
					errorMessage: "413 failed to parse request",
					timestamp: Date.now(),
				},
				400_000,
			),
		).toBe(true);
	});
});
