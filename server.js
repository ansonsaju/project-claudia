const express = require('express');
const path = require('path');
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
