const state = {
    isRunning: false,
    pollInterval: null
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
    themeToggle: document.getElementById('themeToggle'),
    certifiedBadge: document.getElementById('certifiedBadge')
};

function addLog(msg, type = 'info') {
    const p = document.createElement('p');
    p.textContent = `> ${msg}`;
    if (type === 'error') p.style.color = 'var(--error)';
    if (type === 'success') p.style.color = 'var(--success)';
    elements.logs.appendChild(p);
    elements.logs.scrollTop = elements.logs.scrollHeight;
}

async function startDuel() {
    const requirements = elements.promptInput.value.trim();
    if (!requirements || state.isRunning) return;

    state.isRunning = true;
    elements.verifyBtn.disabled = true;
    elements.engineStatus.textContent = 'ENGAGING';
    elements.engineStatus.style.color = 'var(--primary)';
    elements.certifiedBadge.style.display = 'none';
    elements.errorOverlay.style.display = 'none';
    
    addLog("Vanguard Engine: Initializing adversarial gauntlet...");
    
    try {
        const response = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ requirements })
        });

        const result = await response.json();

        if (result.status === 'error') {
            throw new Error(result.error);
        }

        // Simulate real-time progress for UX
        await simulateProgress(result);

    } catch (err) {
        addLog(`Critical Failure: ${err.message}`, 'error');
        elements.engineStatus.textContent = 'ERROR';
        elements.engineStatus.style.color = 'var(--error)';
    } finally {
        state.isRunning = false;
        elements.verifyBtn.disabled = false;
    }
}

async function simulateProgress(result) {
    // Phase 1: Builder
    elements.generatorPanel.classList.add('fixing');
    addLog("Builder: Generating production candidate...");
    await typeCode(elements.generatorCode, result.code);
    elements.generatorPanel.classList.remove('fixing');
    await sleep(800);

    // Phase 2: Adversary (Mocking the audit trail UI)
    elements.hackerPanel.classList.add('attacking');
    addLog("Adversary: Launching targeted security audit...");
    await typeCode(elements.hackerCode, result.diff || "// No vulnerabilities found in certified code.");
    elements.hackerPanel.classList.remove('attacking');
    await sleep(800);

    // Final Resolution
    if (result.status === 'certified') {
        addLog("Arbiter: Verification Successful. Integrity Confirmed.", 'success');
        elements.engineStatus.textContent = 'CERTIFIED';
        elements.engineStatus.style.color = 'var(--success)';
        elements.certifiedBadge.style.display = 'block';
    } else {
        addLog("Arbiter: Security Violation Detected. Circuit Breaker Engaged.", 'error');
        elements.engineStatus.textContent = result.status.toUpperCase();
        elements.engineStatus.style.color = 'var(--error)';
        elements.errorOverlay.style.display = 'flex';
        elements.errorMessage.textContent = result.summary || "Logic failure detected.";
    }
}

async function typeCode(el, code) {
    el.textContent = '';
    const speed = code.length > 500 ? 5 : 20;
    const lines = code.split('\n');
    for (const line of lines) {
        el.textContent += line + '\n';
        await sleep(speed);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Theme & Init Logic
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    elements.themeToggle.querySelector('.toggle-icon').textContent = newTheme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('claudia-theme', newTheme);
}

const savedTheme = localStorage.getItem('claudia-theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);
elements.themeToggle.querySelector('.toggle-icon').textContent = savedTheme === 'dark' ? '🌙' : '☀️';

elements.themeToggle.addEventListener('click', toggleTheme);
elements.verifyBtn.addEventListener('click', startDuel);

// Initial status check
fetch('/api/status').then(r => r.json()).then(data => {
    addLog(`System Identity: ${data.branding}`);
    elements.integrityStatus.textContent = data.integrity;
});
