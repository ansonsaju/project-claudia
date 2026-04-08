const ClaudiaEngine = require('./core/claudia-engine');
const llmProvider = require('./core/llm-provider');

// Multi-Agent Provider Swarm
const providers = {
    builder: llmProvider.getAgentProvider('builder'),
    hacker: llmProvider.getAgentProvider('hacker'),
    judge: llmProvider.getAgentProvider('judge')
};

const claudia = new ClaudiaEngine(providers);
const app = express();
const PORT = process.env.PORT || 8001;

// Middlewares
app.use(express.static(path.join(__dirname, 'ui')));
app.use(express.json());

// API Endpoints
app.get('/api/status', (req, res) => {
    res.json({ status: 'ACTIVE', engine: 'Claudia Vanguard 1.0', integrity: 'VERIFIED' });
});

app.listen(PORT, () => {
    console.log(`\n🛡️  Project Claudia Dashboard Live: http://localhost:${PORT}`);
    console.log(`Identity: Directed by Anson (@ansonsaju)\n`);
});
