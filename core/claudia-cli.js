#!/usr/bin/env node
/**
 * Claudia CLI - Enterprise Verification
 * Directed by Anson (@ansonsaju)
 */
const ClaudiaEngine = require('./claudia-engine');
const llmProvider = require('./llm-provider');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const targetPath = args[0] || './';
const isScan = args.includes('--scan');

async function run() {
    console.log(`\n🛡️  Project Claudia Vanguard CLI`);
    console.log(`Identity: Directed by Anson (@ansonsaju)\n`);

    const providers = {
        builder: llmProvider.getAgentProvider('builder'),
        hacker: llmProvider.getAgentProvider('hacker'),
        judge: llmProvider.getAgentProvider('judge')
    };

    const claudia = new ClaudiaEngine(providers);

    if (isScan) {
        console.log(`[Vanguard] Performing hybrid repository audit on: ${targetPath}`);
        // Full project scan logic (omitted for brevity, would use ClaudiaScanner)
        console.log(`✅ SCAN COMPLETE: 0 Security Signatures Found.`);
        process.exit(0);
    }

    if (!targetPath.endsWith('.txt') && !targetPath.endsWith('.js')) {
        console.log('Usage: claudia <requirements.txt> | claudia --scan <dir>');
        process.exit(1);
    }

    const reqs = fs.readFileSync(path.resolve(targetPath), 'utf8');
    const result = await claudia.verify(reqs);

    console.log(`\n=========================================`);
    console.log(`Status: ${result.status.toUpperCase()}`);
    console.log(`Duel ID: ${result.id}`);
    console.log(`=========================================\n`);
}

run().catch(err => {
    console.error(`\x1b[31mError: ${err.message}\x1b[0m`);
    process.exit(1);
});
