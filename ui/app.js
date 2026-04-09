const state = {
    cycle: 0,
    maxCycles: 5,
    isRunning: false,
    language: 'javascript'
};

const elements = {
    verifyBtn: document.getElementById('verifyBtn'),
    promptInput: document.getElementById('promptInput'),
    cycleCount: document.getElementById('cycleCount'),
    engineStatus: document.getElementById('engineStatus'),
    generatorCode: document.getElementById('generatorCode'),
    hackerCode: document.getElementById('hackerCode'),
    logs: document.getElementById('systemLogs'),
    errorOverlay: document.getElementById('errorOverlay'),
    errorMessage: document.getElementById('errorMessage'),
    generatorPanel: document.getElementById('generatorPanel'),
    hackerPanel: document.getElementById('hackerPanel'),
    integrityStatus: document.getElementById('integrityStatus'),
    themeToggle: document.getElementById('themeToggle')
};

const scenarios = {
    'javascript': {
        requirements: "Write a function to sanitize user input for HTML to prevent XSS.",
        cycles: [
            {
                gen: "function sanitize(input) {\n  return input.replace('<script>', '');\n}",
                hacker: "assert.strictEqual(\n  sanitize('<scr<script>ipt>alert(1)</script>'),\n  '&lt;script&gt;...',\n  'Failed nested script tag attack'\n);",
                error: "AssertionError: Failed nested script tag attack. Result: <script>ipt>alert(1)"
            },
            {
                gen: "function sanitize(input) {\n  return input.replace(/<script>/gi, '');\n}",
                hacker: "assert.strictEqual(\n  sanitize('<img src=x onerror=alert(1)>'),\n  '&lt;img...', \n  'Failed event handler attack'\n);",
                error: "AssertionError: Failed event handler attack. Result: <img src=x onerror=alert(1)>"
            },
            {
                gen: "function sanitize(input) {\n  const map = { '<': '&lt;', '>': '&gt;' };\n  return input.replace(/[<>]/g, m => map[m]);\n}",
                hacker: "assert.strictEqual(\n  sanitize('javascript:alert(1)'),\n  'safe_url',\n  'Failed protocol attack'\n);",
                error: "AssertionError: Failed protocol attack. Result: javascript:alert(1)"
            },
            {
                gen: "function sanitize(input) {\n  // Full robust sanitization\n  const div = document.createElement('div');\n  div.textContent = input;\n  return div.innerHTML;\n}",
                hacker: "// Running deep fuzzing...\n// 1000 payloads tested...\n// 0 vulnerabilities found.",
                error: null
            }
        ]
    },
    'python': {
        requirements: "Write a function to query a database by ID safely.",
        cycles: [
            {
                gen: "def query_user(id):\n    return db.execute(f'SELECT * FROM users WHERE id = {id}')",
                hacker: "assert query_user('1; DROP TABLE users') != 'danger'\n# Fails SQL Injection",
                error: "VulnerabilityDetected: SQL Injection possible with ID '1; DROP TABLE users'"
            },
            {
                gen: "def query_user(id):\n    return db.execute('SELECT * FROM users WHERE id = %s' % id)",
                hacker: "assert query_user(\"1' OR '1'='1\") != 'all_users'\n# Fails string interpolation injection",
                error: "VulnerabilityDetected: Still using unsafe string interpolation."
            },
            {
                gen: "def query_user(id):\n    return db.execute('SELECT * FROM users WHERE id = :id', {'id': id})",
                hacker: "# Adversarial Fuzzing: testing hex, null bytes, long strings...\n# All tests passed.",
                error: null
            }
        ]
    }
};

function addLog(msg) {
    const p = document.createElement('p');
    p.textContent = `> ${msg}`;
    elements.logs.appendChild(p);
    elements.logs.scrollTop = elements.logs.scrollHeight;
}

async function startDuel() {
    if (state.isRunning) return;
    state.isRunning = true;
    state.cycle = 0;
    
    // Universal Mode: Inference logic would happen here. For demo, we use JS.
    state.language = 'javascript';
    
    const scenario = scenarios[state.language];
    elements.verifyBtn.disabled = true;
    elements.engineStatus.textContent = 'RUNNING';
    elements.errorOverlay.style.display = 'none';
    elements.integrityStatus.textContent = 'VERIFIED';

    for (const step of scenario.cycles) {
        state.cycle++;
        elements.cycleCount.textContent = `${state.cycle} / 3`;
        
        // Phase 1: Generator Output
        elements.generatorPanel.classList.add('fixing');
        addLog(`Cycle ${state.cycle}: Generator proposing solution...`);
        await typeCode(elements.generatorCode, step.gen);
        elements.generatorPanel.classList.remove('fixing');

        await sleep(1000);

        // Phase 2: Hacker Attack
        elements.hackerPanel.classList.add('attacking');
        addLog(`Cycle ${state.cycle}: Adversary generating targeted attacks...`);
        await typeCode(elements.hackerCode, step.hacker);
        
        await sleep(1000);
        
        if (step.error) {
            addLog(`Cycle ${state.cycle}: ATTACK SUCCESSFUL.`);
            
            if (state.cycle === 3) {
                elements.engineStatus.textContent = 'MANUAL REVIEW';
                elements.engineStatus.style.color = 'var(--error)';
                addLog('🚨 CIRCUIT BREAKER: Max retries reached. flagged for Human Review.');
                break;
            }

            elements.errorOverlay.style.display = 'flex';
            elements.errorMessage.textContent = step.error;
            elements.hackerPanel.classList.remove('verifying');
            await sleep(2000);
            elements.errorOverlay.style.display = 'none';
        } else {
            addLog(`Cycle ${state.cycle}: JUDGE CERTIFIED. Code is robust and deterministic.`);
            elements.hackerPanel.classList.remove('verifying');
            elements.engineStatus.textContent = 'CERTIFIED';
            elements.engineStatus.classList.add('success-msg');
            addLog(`CLAUDIA: Function certified for production release.`);
            break;
        }
    }

    state.isRunning = false;
    elements.verifyBtn.disabled = false;
}

async function typeCode(el, code) {
    el.textContent = '';
    const lines = code.split('\n');
    for (const line of lines) {
        el.textContent += line + '\n';
        await sleep(50);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Theme Management
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    elements.themeToggle.querySelector('.toggle-icon').textContent = newTheme === 'dark' ? '🌙' : '☀️';
    
    localStorage.setItem('claudia-theme', newTheme);
}

// Initialization
const savedTheme = localStorage.getItem('claudia-theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);
elements.themeToggle.querySelector('.toggle-icon').textContent = savedTheme === 'dark' ? '🌙' : '☀️';

elements.themeToggle.addEventListener('click', toggleTheme);
elements.verifyBtn.addEventListener('click', startDuel);

addLog("Claudia System Ready.");
addLog("Vanguard Hybrid Protection: ACTIVE.");
addLog("Describe requirements to begin adversarial gauntlet.");
