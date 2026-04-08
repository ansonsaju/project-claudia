/**
 * Claudia Secret Scanner
 * Zero-latency regex detection of hardcoded credentials.
 */
class SecretScanner {
    constructor() {
        this.patterns = {
            'OpenAI API Key': /sk-[a-zA-Z0-9]{32,}/g,
            'AWS Access Key': /(?:AKIA|ASIA)[0-9A-Z]{16}/g,
            'AWS Secret Key': /[0-9a-zA-Z/+]{40}/g,
            'Database URL': /postgres:\/\/[\w:]+@[\w.:]+\/\w+/g,
            'Generic API Key': /api[_-]?key[^\w\d]([a-zA-Z0-9]{32,})/gi,
            'GitHub Token': /ghp_[a-zA-Z0-9]{36}/g
        };
    }

    /**
     * Scans a string (file content) for secrets
     * @returns {Array} List of found secrets and their types
     */
    scan(content) {
        const found = [];
        for (const [type, pattern] of Object.entries(this.patterns)) {
            const matches = content.match(pattern);
            if (matches) {
                matches.forEach(match => {
                    found.push({ type, value: this._mask(match) });
                });
            }
        }
        return found;
    }

    _mask(str) {
        if (str.length < 8) return '****';
        return `${str.substring(0, 4)}...${str.substring(str.length - 4)}`;
    }
}

module.exports = new SecretScanner();
