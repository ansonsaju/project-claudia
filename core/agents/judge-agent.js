/**
 * JudgeAgent - The Arbiter
 * Enforces determinism and ensures adversarial tests are valid.
 */
class JudgeAgent {
    constructor(language = 'javascript') {
        this.language = language;
    }

    /**
     * Generates a prompt for the Judge to evaluate the "Duel"
     */
    getEvaluationPrompt(requirements, code, testCode, executionResult) {
        return `
YOU ARE A SENIOR ARCHITECT & COMPLIANCE OFFICER.
ROLE: Judge the duel between the Builder and the Hacker.

ORIGINAL REQUIREMENTS: ${requirements}
PROPOSED CODE:
\`\`\`${this.language}
${code}
\`\`\`
HACKER TEST CASE:
\`\`\`${this.language}
${testCode}
\`\`\`
EXECUTION RESULT: ${JSON.stringify(executionResult)}

YOUR TASKS:
1. DETERMINISM CHECK (EU AI Act Art. 14): Does the code use unstable AI calls, unseeded randoms, or external APIs without mocks? It MUST be deterministic.
2. FAIRNESS CHECK: Is the Hacker's test actually based on the requirements, or is it a hallucination?
3. INTEGRITY CHECK: Did the Builder hardcode a "lazy fix" just to pass the test?

OUTPUT FORMAT: Provide a JSON object:
{
    "verdict": "valid" | "invalid",
    "isDeterministic": true | false,
    "reason": "Explicit reasoning here",
    "suggestedAction": "What the Generator/Hacker should do next"
}
`;
    }
}

module.exports = JudgeAgent;
