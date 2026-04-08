const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class SandboxRunner {
    constructor() {
        this.tempDir = path.join(process.cwd(), 'temp_execution');
        if (!fs.existsSync(this.tempDir)) {
            fs.mkdirSync(this.tempDir);
        }
    }

    /**
     * Executes JavaScript code
     * @param {string} code - The function implementation
     * @param {string} testCode - The adversarial tests
     * @returns {Object} Result of execution
     */
    runJS(code, testCode) {
        const fileName = `exec_${Date.now()}.js`;
        const filePath = path.join(this.tempDir, fileName);
        
        // Wrap code and tests into a single executable script
        const fullScript = `
${code}

try {
    ${testCode}
    console.log(JSON.stringify({ status: 'success', message: 'All tests passed' }));
} catch (error) {
    console.error(JSON.stringify({ 
        status: 'fail', 
        error: error.message, 
        stack: error.stack 
    }));
    process.exit(1);
}
`;
        fs.writeFileSync(filePath, fullScript);

        const result = spawnSync('node', [filePath], { encoding: 'utf8' });
        
        // Clean up
        try { fs.unlinkSync(filePath); } catch (e) {}

        if (result.status === 0) {
            return { success: true, output: result.stdout };
        } else {
            return { 
                success: false, 
                error: result.stderr || result.stdout,
                exitCode: result.status 
            };
        }
    }

    /**
     * Executes Python code
     * @param {string} code - The function implementation
     * @param {string} testCode - The adversarial tests
     * @returns {Object} Result of execution
     */
    runPython(code, testCode) {
        const fileName = `exec_${Date.now()}.py`;
        const filePath = path.join(this.tempDir, fileName);
        
        const fullScript = `
${code}

import json
try:
${this._indent(testCode)}
    print(json.dumps({"status": "success", "message": "All tests passed"}))
except Exception as e:
    import traceback
    print(json.dumps({
        "status": "fail",
        "error": str(e),
        "traceback": traceback.format_exc()
    }), file=sys.stderr)
    exit(1)
`;
        // Need to ensure sys is imported for the wrapper
        const wrappedScript = "import sys\n" + fullScript;
        fs.writeFileSync(filePath, wrappedScript);

        const result = spawnSync('python', [filePath], { encoding: 'utf8' });
        
        // Clean up
        try { fs.unlinkSync(filePath); } catch (e) {}

        if (result.status === 0) {
            return { success: true, output: result.stdout };
        } else {
            return { 
                success: false, 
                error: result.stderr || result.stdout,
                exitCode: result.status 
            };
        }
    }

    _indent(code) {
        return code.split('\n').map(line => '    ' + line).join('\n');
    }
}

module.exports = SandboxRunner;
