const { spawnSync } = require('child_process');

/**
 * Claudia SAST Runner
 * First-tier guard using traditional static analysis tools.
 */
class SASTRunner {
    constructor() {}

    /**
     * Runs basic static analysis on a file
     */
    run(filePath, language) {
        let cmd = '';
        let args = [];

        if (language === 'javascript') {
            // Simulated ESLint check
            cmd = 'node';
            args = ['-c', `try { require('${filePath}') } catch(e) { console.error(e.message); process.exit(1); }`];
        } else if (language === 'python') {
            // Simulated Pylint/Syntax check
            cmd = 'python';
            args = ['-m', 'py_compile', filePath];
        }

        if (!cmd) return { success: true };

        const result = spawnSync(cmd, args, { encoding: 'utf8' });
        
        return {
            success: result.status === 0,
            error: result.stderr || result.stdout
        };
    }
}

module.exports = new SASTRunner();
