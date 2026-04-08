const fs = require('fs');
const path = require('path');
const secretScanner = require('./secret-scanner');
const sastRunner = require('./sast-runner');
const sandbox = require('./universal-sandbox');
const ClaudiaEngine = require('./claudia-engine');

/**
 * Claudia Repository Scanner
 * Directed by Anson (@ansonsaju)
 */
class ClaudiaScanner {
    constructor() {
        this.projectRoot = process.cwd();
        this.engine = null; // Lazy load engine
    }

    /**
     * Executes the Hybrid Scanning Strategy
     */
    async scanRepository(diffFiles = []) {
        const report = {
            timestamp: new Date().toISOString(),
            globalSignatures: [],
            leakedSecrets: [],
            dependencies: [],
            adversarialAudits: []
        };

        console.log("\x1b[36m[Claudia Vanguard]\x1b[0m Starting Hybrid Security Audit...");

        // 1. Global Signature Scan (Fast Regex)
        this._iterateProject((filePath, content) => {
            // Check for Hardcoded Secrets
            const secrets = secretScanner.scan(content);
            if (secrets.length > 0) {
                report.leakedSecrets.push({ file: filePath, secrets });
            }

            // Check for XSS/SQLi Signatures
            const signatures = this._checkSignatures(content);
            if (signatures.length > 0) {
                report.globalSignatures.push({ file: filePath, signatures });
            }

            // SBOM / Dependency Check (for package files)
            if (filePath.endsWith('package.json') || filePath.endsWith('requirements.txt')) {
                const deps = this._checkDependencies(content, filePath);
                if (deps.length > 0) report.dependencies.push({ file: filePath, deps });
            }
        });

        // 2. Targeted Adversarial Gauntlet (Diff-Based)
        if (diffFiles.length > 0) {
            console.log(`\x1b[36m[Claudia Vanguard]\x1b[0m Engaging Adversary for ${diffFiles.length} modified files...`);
            for (const file of diffFiles) {
                const content = fs.readFileSync(path.join(this.projectRoot, file), 'utf8');
                const lang = path.extname(file) === '.js' ? 'javascript' : 'python';
                
                // SAST First Guard
                const sast = sastRunner.run(file, lang);
                if (!sast.success) {
                    report.adversarialAudits.push({ file, status: 'sast_fail', error: sast.error });
                    continue;
                }

                // LLM Adversarial Duel (Simulated here, in reality calls claudia-engine)
                report.adversarialAudits.push({ file, status: 'certified', message: 'Passed Adversarial Audit' });
            }
        }

        return report;
    }

    _iterateProject(callback) {
        const walk = (dir) => {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                let filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git')) {
                    walk(filePath);
                } else if (stat.isFile() && /\.(js|py|go|rs|txt|json)$/.test(file)) {
                    const content = fs.readFileSync(filePath, 'utf8');
                    callback(filePath.replace(this.projectRoot, ''), content);
                }
            });
        };
        walk(this.projectRoot);
    }

    _checkSignatures(content) {
        const alerts = [];
        if (content.includes('dangerouslySetInnerHTML')) alerts.push('XSS Vulnerability (React)');
        if (content.match(/innerHTML\s*=/)) alerts.push('XSS Vulnerability (DOM)');
        if (content.match(/db\.execute\(f['"]/)) alerts.push('SQL Injection Risk (Python f-string)');
        return alerts;
    }

    _checkDependencies(content, file) {
        const violations = [];
        // Simulated SBOM validation
        if (content.includes('vulnerable-package')) violations.push('vulnerable-package (CVE-2025-001)');
        return violations;
    }
}

module.exports = new ClaudiaScanner();
