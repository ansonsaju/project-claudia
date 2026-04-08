const HackerAgent = require('./agents/hacker-agent');
const JudgeAgent = require('./agents/judge-agent');
const UniversalSandbox = require('./universal-sandbox');
const identity = require('./identity');
const audit = require('./audit-logger');
const mcp = require('./mcp-connector');
// diffLines replaced by internal _generateDiff

/**
 * ClaudiaEngine - Enterprise Orchestrator
 * Directed by Anson (@ansonsaju)
 */
class ClaudiaEngine {
    constructor(providerMap) {
        // Identity & Integrity Gate
        if (!identity.verifyIntegrity("Anson", "https://github.com/ansonsaju")) {
            throw new Error("Integrity Violation: Unauthorized authorship detected.");
        }

        this.providers = providerMap; // { builder, hacker, judge }
        this.maxRetries = 3; 
        this.sandbox = new UniversalSandbox();
        this.stats = { totalCost: 0, totalTokens: 0 };
    }

    async verify(requirements) {
        // Step 0: Universal Language Detection
        this.language = this._detectLanguage(requirements);
        this.hacker = new HackerAgent(this.language);
        this.judge = new JudgeAgent(this.language);

        const duelId = `claudia_${Date.now()}`;
        console.log(`\x1b[36m[Claudia]\x1b[0m Launching Enterprise Gauntlet: ${duelId}`);

        // Phase 1: Contextual Generation (Builder)
        const context = mcp.getContextSnippet();
        const genRaw = await this.providers.builder(`${this._getGenerationPrompt(requirements)}\n${context}`);
        let currentCode = genRaw.content;
        this._updateStats(genRaw.usage);
        
        const originalCode = currentCode;
        let history = [];

        for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
            console.log(`\x1b[36m[Claudia]\x1b[0m Attempt ${attempt}/${this.maxRetries}: Adversarial Audit...`);
            
            // Hacker Attack
            const attackPrompt = this.hacker.getAttackPrompt(currentCode, requirements);
            const attackRaw = await this.providers.hacker(attackPrompt);
            const testCode = attackRaw.content;
            this._updateStats(attackRaw.usage);

            // Execution
            const result = this.sandbox.run(this.language, currentCode, testCode);

            // Audit
            audit.logDuel(duelId, { attempt, language: this.language, requirements }, { code: currentCode, testResult: result });

            if (result.success) {
                // Arbiter Step (The Judge)
                console.log(`\x1b[36m[Claudia]\x1b[0m Verifying with the Arbiter...`);
                const evaluationPrompt = this.judge.getEvaluationPrompt(requirements, currentCode, testCode, result);
                const evalRaw = await this.providers.judge(evaluationPrompt);
                const evalResult = JSON.parse(evalRaw.content);
                this._updateStats(evalRaw.usage);

                if (evalResult.verdict === 'valid' && evalResult.isDeterministic) {
                    console.log("\x1b[32m✅ CERTIFIED BY CLAUDIA\x1b[0m");
                    return {
                        status: 'certified',
                        id: duelId,
                        code: currentCode,
                        diff: this._generateDiff(originalCode, currentCode),
                        summary: "Function structurally verified and certified as deterministic and secure."
                    };
                } else {
                    console.log(`\x1b[31m❌ JUDGE REJECTION: ${evalResult.reason}\x1b[0m`);
                    result.error = evalResult.reason;
                }
            }

            // Circuit Breaker Logic
            if (attempt === this.maxRetries) {
                console.log("\x1b[31m🚨 CIRCUIT BREAKER TRIGGERED: MANUAL REVIEW REQUIRED\x1b[0m");
                return {
                    status: 'manual_review',
                    id: duelId,
                    lastKnownCode: currentCode,
                    reason: "Exhausted 3 retry attempts without reaching certified stability."
                };
            }

            // Self-Healing Fix (Builder)
            console.log(`\x1b[36m[Claudia]\x1b[0m Requesting autonomous fix...`);
            const fixRaw = await this.providers.builder(this._getFixPrompt(currentCode, testCode, result.error));
            currentCode = fixRaw.content;
            this._updateStats(fixRaw.usage);
        }
    }

    _updateStats(usage) {
        this.stats.totalTokens += (usage.input + usage.output);
        this.stats.totalCost += usage.cost;
    }

    _getGenerationPrompt(req) {
        return `Implement the following in ${this.language}. Return ONLY code.\nREQUIREMENTS: ${req}`;
    }

    _detectLanguage(content) {
        const lower = content.toLowerCase();
        if (lower.includes('python') || lower.includes(' def ') || lower.includes('import os')) return 'python';
        if (lower.includes('package main') || lower.includes(' func ')) return 'go';
        if (lower.includes('fn main') || lower.includes('let mut')) return 'rust';
        return 'javascript'; // Default to JS
    }

    _generateDiff(oldCode, newCode) {
        const oldLines = oldCode.split('\n');
        const newLines = newCode.split('\n');
        let diff = '';
        
        let i = 0, j = 0;
        while (i < oldLines.length || j < newLines.length) {
            if (i < oldLines.length && j < newLines.length && oldLines[i] === newLines[j]) {
                diff += `  ${oldLines[i]}\n`;
                i++; j++;
            } else {
                if (i < oldLines.length) {
                    diff += `- ${oldLines[i]}\n`;
                    i++;
                }
                if (j < newLines.length) {
                    diff += `+ ${newLines[j]}\n`;
                    j++;
                }
            }
        }
        return diff;
    }
}

module.exports = ClaudiaEngine;
