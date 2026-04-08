const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * UniversalSandbox
 * Supports dynamic language execution using templates and Docker.
 */
class UniversalSandbox {
    constructor() {
        this.tempDir = path.join(process.cwd(), 'claudia_runtime');
        if (!fs.existsSync(this.tempDir)) fs.mkdirSync(this.tempDir);
        
        this.languageConfig = {
            'javascript': { ext: '.js', cmd: 'node', wrapper: (c, t) => this._jsWrapper(c, t) },
            'python': { ext: '.py', cmd: 'python', wrapper: (c, t) => this._pythonWrapper(c, t) },
            'go': { ext: '.go', cmd: 'go run', wrapper: (c, t) => this._goWrapper(c, t), docker: 'golang:latest' },
            'rust': { ext: '.rs', cmd: 'rustc', wrapper: (c, t) => this._rustWrapper(c, t), docker: 'rust:latest' }
        };
    }

    run(language, code, testCode) {
        const config = this.languageConfig[language];
        if (!config) throw new Error(`Unsupported language: ${language}`);

        // SECURITY: SBOM / Dependency Guard check
        const violations = this._checkDependencies(code, language);
        if (violations.length > 0) {
            return {
                success: false,
                error: `SECURITY VULNERABILITY: Disallowed or Hallucinated packages detected: ${violations.join(', ')}`,
                exitCode: 403
            };
        }

        const fileName = `target_${Date.now()}${config.ext}`;
        const filePath = path.join(this.tempDir, fileName);
        const fullScript = config.wrapper(code, testCode);
        
        fs.writeFileSync(filePath, fullScript);

        const result = spawnSync(config.cmd.split(' ')[0], [...config.cmd.split(' ').slice(1), filePath], { encoding: 'utf8', timeout: 10000 });
        
        try { fs.unlinkSync(filePath); } catch (e) {}

        return {
            success: result.status === 0,
            output: result.stdout,
            error: result.stderr || result.stdout
        };
    }

    _checkDependencies(code, lang) {
        const blacklisted = ['child_process', 'os', 'fs', 'eval', 'hallucinated-package', 'compromised-lib']; // SBOM Blacklist
        const found = [];
        
        if (lang === 'javascript') {
            const matches = code.match(/require\(['"](.+?)['"]\)/g) || [];
            matches.forEach(m => {
                const pkg = m.match(/['"](.+?)['"]/)[1];
                if (blacklisted.includes(pkg)) found.push(pkg);
            });
        }
        
        // In production, this would check against an SBOM database
        return found;
    }

    _jsWrapper(code, test) {
        return `${code}\ntry {\n${test}\nconsole.log(JSON.stringify({status:'success'}));\n} catch(e) {\nconsole.error(e.message);\nprocess.exit(1);\n}`;
    }

    _pythonWrapper(code, test) {
        return `import sys\n${code}\ntry:\n${test.split('\n').map(l => '    ' + l).join('\n')}\n    print("success")\nexcept Exception as e:\n    print(str(e), file=sys.stderr)\n    sys.exit(1)`;
    }

    _goWrapper(code, test) {
        // Simple Go wrapper for prototype
        return `package main\nimport "fmt"\n${code}\nfunc main() {\n${test}\nfmt.Println("success")\n}`;
    }

    _rustWrapper(code, test) {
        // Simple Rust wrapper for prototype
        return `fn main() {\n${code}\n${test}\nprintln!("success");\n}`;
    }
}

module.exports = UniversalSandbox;
