/**
 * HackerAgent - The Adversary
 * Responsible for generating tests aimed at breaking the code.
 */
class HackerAgent {
    constructor(language = 'javascript') {
        this.language = language;
    }

    /**
     * Generates a prompt for the LLM to act as a "Security/Logic Hacker"
     * @param {string} code - The code implementation to attack
     * @param {string} requirements - The original requirements/prompt
     * @returns {string} The adversarial test prompt
     */
    getAttackPrompt(code, requirements) {
        if (this.language === 'javascript') {
            return `
YOU ARE AN ADVERSARIAL SECURITY ENGINEER. Your goal is to BREAK the provided JavaScript code.
ORIGINAL REQUIREMENTS: ${requirements}
CODE TO ATTACK:
\`\`\`javascript
${code}
\`\`\`

YOUR TASK:
1. Identify LOGIC FLAWS (boundary conditions, off-by-one errors, null handling).
2. Identify SECURITY VULNERABILITIES (XSS if HTML is involved, Prototype Pollution, Malicious payloads).
3. Generate a set of "Attack Tests" that will FAIL if the code is buggy or insecure.

RULES:
- Use standard JS \`assert\` or throw Errors on failure.
- Focus on the most LIKELY points of failure for AI-generated code.
- Provide ONLY executable JavaScript test code. No explanations.

EXAMPLE OUTPUT:
assert.strictEqual(myFunc(null), expected, "Failed on null input");
// XSS Payload
assert.strictEqual(sanitize("<script>alert(1)</script>"), "&lt;script&gt;...", "Failed to sanitize XSS");
`;
        } else if (this.language === 'python') {
            return `
YOU ARE AN ADVERSARIAL SECURITY ENGINEER. Your goal is to BREAK the provided Python code.
ORIGINAL REQUIREMENTS: ${requirements}
CODE TO ATTACK:
\`\`\`python
${code}
\`\`\`

YOUR TASK:
1. Identify LOGIC FLAWS (edge cases, recursion depth, type mismatches).
2. Identify SECURITY VULNERABILITIES (SQL Injection, OS Injection, Unsafe Deserialization).
3. Generate a set of "Attack Tests" that will FAIL if the code is buggy or insecure.

RULES:
- Use standard \`assert\` statements.
- Focus on the most LIKELY points of failure for AI-generated code.
- Provide ONLY executable Python test code. No explanations.
`;
        }
    }

    /**
     * In a real implementation, this would call an LLM API.
     * For the prototype, we assume the system orchestrator handles the LLM call.
     */
}

module.exports = HackerAgent;
