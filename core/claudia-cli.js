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
const isCI = args.includes('--ci');
const strictCloud = args.includes('--strict-cloud');
const diffFiles = args.find(a => a.startsWith('--diff='))?.split('=')[1]?.split(',') || [];

async function run() {
    console.log(`\n🛡️  Project Claudia Vanguard CLI`);
    console.log(`Identity: Directed by Anson (@ansonsaju)\n`);

    const options = { strictCloud };
    const providers = {
        builder: llmProvider.getAgentProvider('builder', options),
        hacker: llmProvider.getAgentProvider('hacker', options),
        judge: llmProvider.getAgentProvider('judge', options)
    };

    const claudia = new ClaudiaEngine(providers);

    if (isScan || isCI) {
        const ClaudiaScanner = require('./claudia-scanner');
        console.log(`[Vanguard] Performing hybrid repository audit...`);
        
        const report = await ClaudiaScanner.scanRepository(diffFiles);
        
        if (isCI) {
            console.log("::set-output name=report::" + JSON.stringify(report));
        } else {
            console.log(`✅ SCAN COMPLETE: ${report.leakedSecrets.length + report.globalSignatures.length} Security Issues Found.`);
        }

        const hasMajorIssues = report.leakedSecrets.length > 0 || report.globalSignatures.length > 0;
        process.exit(hasMajorIssues ? 1 : 0);
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
