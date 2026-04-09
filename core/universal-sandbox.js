const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * UniversalSandbox - Vanguard Guard 🛡️
 * Supports isolated execution via Docker or restricted local processes.
 */
class UniversalSandbox {
    constructor() {
        this.tempDir = path.join(process.cwd(), 'claudia_runtime');
        if (!fs.existsSync(this.tempDir)) fs.mkdirSync(this.tempDir);
        
        this.hasDocker = this._checkDocker();
        
        this.languageConfig = {
            'javascript': { ext: '.js', cmd: 'node', wrapper: (c, t) => this._jsWrapper(c, t), image: 'node:alpine' },
            'python': { ext: '.py', cmd: 'python3', wrapper: (c, t) => this._pythonWrapper(c, t), image: 'python:alpine' },
            'go': { ext: '.go', cmd: 'go run', wrapper: (c, t) => this._goWrapper(c, t), image: 'golang:alpine' },
            'rust': { ext: '.rs', cmd: 'rustc', wrapper: (c, t) => this._rustWrapper(c, t), image: 'rust:alpine' }
        };
    }

    run(language, code, testCode) {
        const config = this.languageConfig[language];
        if (!config) throw new Error(`Unsupported language: ${language}`);

        // SECURITY: SBOM / Dependency Guard check (Enhanced)
        const violations = this._checkDependencies(code, language);
        if (violations.length > 0) {
            return {
                success: false,
                error: `[Vanguard] SECURITY VIOLATION: Disallowed library detected: ${violations.join(', ')}`,
                exitCode: 403
            };
        }

        const fileName = `target_${Date.now()}${config.ext}`;
        const filePath = path.join(this.tempDir, fileName);
        const fullScript = config.wrapper(code, testCode);
        
        fs.writeFileSync(filePath, fullScript);

        let result;
        if (this.hasDocker) {
            console.log(`\x1b[34m[Sandbox]\x1b[0m Launching isolated container for ${language}...`);
            result = this._runDocker(config, fileName);
        } else {
            console.log(`\x1b[33m[Sandbox Warning]\x1b[0m Docker not detected. Falling back to local process with reduced isolation.`);
            result = this._runLocal(config, filePath);
        }
        
        try { fs.unlinkSync(filePath); } catch (e) {}

        return {
            success: result.status === 0,
            output: result.stdout,
            error: result.stderr || result.stdout
        };
    }

    _runDocker(config, fileName) {
        // Map current host directory to /app in container
        const hostPath = path.resolve(this.tempDir);
        const containerPath = '/app';
        
        const args = [
            'run', '--rm',
            '-v', `${hostPath}:${containerPath}:ro`,
            '-w', containerPath,
            '--memory', '128m',
            '--cpus', '0.5',
            '--network', 'none', // Air-gapped execution
            config.image,
            config.cmd, fileName
        ];

        return spawnSync('docker', args, { encoding: 'utf8', timeout: 15000 });
    }

    _runLocal(config, filePath) {
        // Fallback to local execution but with timeout and memory limits (simulated)
        const cmdParts = config.cmd.split(' ');
        return spawnSync(cmdParts[0], [...cmdParts.slice(1), filePath], {
            encoding: 'utf8',
            timeout: 10000,
            maxBuffer: 1024 * 1024 // 1MB buffer limit
        });
    }

    _checkDocker() {
        try {
            const check = spawnSync('docker', ['--version']);
            return check.status === 0;
        } catch (e) {
            return false;
        }
    }

    _checkDependencies(code, lang) {
        const blacklisted = ['child_process', 'os', 'fs', 'eval', ' halluci', 'process.']; 
        const found = [];
        
        if (lang === 'javascript') {
            const matches = code.match(/require\(['"](.+?)['"]\)/g) || [];
            matches.forEach(m => {
                const pkg = m.match(/['"](.+?)['"]/)[1];
                if (blacklisted.some(b => pkg.includes(b))) found.push(pkg);
            });
        }
        return found;
    }

    _jsWrapper(code, test) {
        return `${code}\ntry {\n${test}\nconsole.log(JSON.stringify({status:'success'}));\n} catch(e) {\nconsole.error(e.message);\nprocess.exit(1);\n}`;
    }

    _pythonWrapper(code, test) {
        return `import sys\n${code}\ntry:\n${test.split('\n').map(l => '    ' + l).join('\n')}\n    print("success")\nexcept Exception as e:\n    print(str(e), file=sys.stderr)\n    sys.exit(1)`;
    }

    _goWrapper(code, test) {
        return `package main\nimport "fmt"\n${code}\nfunc main() {\n${test}\nfmt.Println("success")\n}`;
    }

    _rustWrapper(code, test) {
        return `fn main() {\n${code}\n${test}\nprintln!("success");\n}`;
    }
}

module.exports = UniversalSandbox;
