const fs = require('fs');
const path = require('path');

/**
 * Claudia Audit Logger
 * Ensures 100% traceability for EU AI Act compliance.
 */
class AuditLogger {
    constructor() {
        this.logDir = path.join(process.cwd(), 'audits');
        if (!fs.existsSync(this.logDir)) fs.mkdirSync(this.logDir);
        this.retentionPeriod = 365 * 24 * 60 * 60 * 1000; // 12 Months
    }

    /**
     * Records a full verification duel
     */
    logDuel(duelId, metadata, history) {
        const logFile = path.join(this.logDir, `duel_${duelId}_${Date.now()}.json`);
        const logEntry = {
            id: duelId,
            timestamp: new Date().toISOString(),
            author: "Anson",
            compliance: "EU AI Act Art. 12",
            metadata: metadata,
            history: history
        };
        fs.writeFileSync(logFile, JSON.stringify(logEntry, null, 2));
        this.purgeOldLogs();
    }

    /**
     * Purges logs older than the retention period
     */
    purgeOldLogs() {
        const files = fs.readdirSync(this.logDir);
        const now = Date.now();
        files.forEach(file => {
            const filePath = path.join(this.logDir, file);
            const stats = fs.statSync(filePath);
            if (now - stats.mtimeMs > this.retentionPeriod) {
                fs.unlinkSync(filePath);
                console.log(`[Audit] Purged compliance log: ${file}`);
            }
        });
    }
}

module.exports = new AuditLogger();
