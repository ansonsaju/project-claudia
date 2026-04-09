require('dotenv').config();

/**
 * Claudia Universal LLM Provider
 * Directed by Anson (@ansonsaju)
 */
class LLMProvider {
    constructor() {
        this.costs = {
            'openai': { input: 0.000005, output: 0.000015 },
            'anthropic': { input: 0.000003, output: 0.000015 },
            'gemini': { input: 0.000000125, output: 0.000000375 },
            'ollama': { input: 0, output: 0 }
        };
    }

    getAgentProvider(role, options = {}) {
        const providerName = process.env[`${role.toUpperCase()}_PROVIDER`] || process.env.DEFAULT_PROVIDER || 'ollama';
        const modelName = process.env[`${role.toUpperCase()}_MODEL`] || 'llama3';
        const strictCloud = options.strictCloud || process.env.CLAUDIA_STRICT_CLOUD === 'true';

        return async (prompt) => {
            console.log(`\x1b[35m[LLM Router]\x1b[0m Routing ${role} query to ${providerName} (${modelName})...`);
            
            let attempts = 0;
            const maxRetries = 3;

            while (attempts <= maxRetries) {
                try {
                    return await this._executeCompletion(providerName, modelName, prompt, providerName);
                } catch (error) {
                    attempts++;
                    console.error(`\x1b[31m[LLM Error]\x1b[0m Attempt ${attempts} failed: ${error.message}`);
                    
                    if (attempts > maxRetries) {
                        if (strictCloud && providerName !== 'ollama') {
                            throw new Error(`Cloud logic failed after ${maxRetries} retries and strict-cloud is enabled.`);
                        }
                        
                        if (providerName !== 'ollama') {
                            console.log(`\x1b[33m[LLM Fallback]\x1b[0m Cloud providers exhausted. Failing over to local Ollama...`);
                            return await this._executeCompletion('ollama', 'llama3', prompt, providerName);
                        }
                        throw error;
                    }

                    const delay = Math.pow(2, attempts) * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        };
    }

    async _executeCompletion(providerName, modelName, prompt, originalProvider) {
        let result = "";
        let usage = { input: prompt.length / 4, output: 0 };

        try {
            switch (providerName) {
                case 'openai':
                    result = await this._callOpenAI(prompt, modelName);
                    break;
                case 'anthropic':
                    result = await this._callAnthropic(prompt, modelName);
                    break;
                case 'gemini':
                    result = await this._callGemini(prompt, modelName);
                    break;
                case 'ollama':
                    result = await this._callOllama(prompt, modelName);
                    break;
                default:
                    result = await this._callOllama(prompt, modelName);
            }
        } catch (error) {
            // Re-throw to be caught by the retry loop in getAgentProvider
            throw error;
        }

        usage.output = result.length / 4;
        const inputCost = usage.input * (this.costs[providerName]?.input || 0);
        const outputCost = usage.output * (this.costs[providerName]?.output || 0);
        const cost = inputCost + outputCost;

        return {
            content: result,
            usage: { 
                ...usage, 
                cost, 
                provider: providerName, 
                failover: providerName !== originalProvider 
            }
        };
    }

    // --- Real Provider Connectors ---

    async _callOpenAI(prompt, model) {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) throw new Error("Missing OPENAI_API_KEY");

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model === 'default' ? 'gpt-4o-mini' : model,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.2
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(`OpenAI API Error: ${err.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    async _callAnthropic(prompt, model) {
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY");

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: model === 'default' ? 'claude-3-5-sonnet-20240620' : model,
                max_tokens: 4096,
                messages: [{ role: 'user', content: prompt }]
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(`Anthropic API Error: ${err.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.content[0].text;
    }

    async _callOllama(prompt, model) {
        const host = process.env.OLLAMA_HOST || 'http://localhost:11434';
        
        const response = await fetch(`${host}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: model === 'default' ? 'llama3' : model,
                prompt: prompt,
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`Ollama API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.response;
    }

    async _callGemini(prompt, model) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("Missing GEMINI_API_KEY");

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model === 'default' ? 'gemini-1.5-flash' : model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(`Gemini API Error: ${err.error?.message || response.statusText}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }
}

module.exports = new LLMProvider();
