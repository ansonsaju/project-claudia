const express = require('express');
const path = require('path');
const ClaudiaEngine = require('./core/claudia-engine');
const llmProvider = require('./core/llm-provider');
const identity = require('./core/identity');
require('dotenv').config();

// Multi-Agent Provider Swarm
const providers = {
    builder: llmProvider.getAgentProvider('builder'),
    hacker: llmProvider.getAgentProvider('hacker'),
    judge: llmProvider.getAgentProvider('judge')
};

const claudia = new ClaudiaEngine(providers);
const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.static(path.join(__dirname, 'ui')));
app.use(express.json());

// API Endpoints
app.get('/api/status', (req, res) => {
    res.json({ 
        status: 'ACTIVE', 
        engine: 'Claudia Vanguard 1.0', 
        integrity: 'VERIFIED',
        branding: identity.getBranding()
    });
});

app.post('/api/verify', async (req, res) => {
    try {
        const { requirements } = req.body;
        console.log(`\x1b[36m[API Request]\x1b[0m Verification duel started for: ${requirements.substring(0, 30)}...`);
        
        const result = await claudia.verify(requirements);
        res.json(result);
    } catch (err) {
        console.error(`\x1b[31m[API Error]\x1b[0m ${err.message}`);
        res.status(500).json({ status: 'error', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`\n🛡️  Project Claudia Dashboard Live: http://localhost:${PORT}`);
    console.log(`Identity: ${identity.getBranding()}\n`);
});
