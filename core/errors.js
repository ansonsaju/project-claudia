/**
 * Project Claudia: Custom Error Framework
 * Directed by Anson (@ansonsaju)
 */

class ClaudiaError extends Error {
    constructor(message, metadata = {}) {
        super(message);
        this.name = this.constructor.name;
        this.metadata = metadata;
        this.timestamp = new Date().toISOString();
    }
}

class LLMProviderError extends ClaudiaError {
    constructor(message, provider, originalError) {
        super(message, { provider, originalError: originalError.message });
    }
}

class LLMTimeoutError extends LLMProviderError {}
class LLMAuthenticationError extends LLMProviderError {}
class LLMRateLimitError extends LLMProviderError {}

module.exports = {
    ClaudiaError,
    LLMProviderError,
    LLMTimeoutError,
    LLMAuthenticationError,
    LLMRateLimitError
};
