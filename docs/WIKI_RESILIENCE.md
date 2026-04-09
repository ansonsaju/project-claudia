# Failover & Resilience Architecture 🛡️

Project Claudia is designed to be an "Unstoppable Engine." In the adversarial AI landscape of 2026, network reliability and API uptime cannot be taken for granted. Our resilience architecture ensures that verification duels always reach a conclusion.

## 🔄 3-Retry Strategy (Unit Economics Guard)
Every interaction with an external LLM provider (OpenAI, Anthropic, Gemini) is protected by a **Circuit Breaker** with a maximum of **3 retries**.
- **Backoff**: We use exponential backoff (2s, 4s, 8s) to handle transient network hiccups.
- **Cost Control**: Limiting retries prevents runaway token costs, keeping our average duel cost at the target **$0.03**.

## 🔌 failover-to-Local (Ollama)
If all 3 retries for a cloud provider fail, Project Claudia automatically triggers its **Failover-to-Local** protocol.
- **Privacy-First Fallback**: The engine switches the routing to a local **Ollama** instance (e.g., Llama 3 or Mistral).
- **Zero-Friction Completion**: This ensures that even if you lose internet connectivity or a cloud API goes down, your CI/CD pipeline remains green and secure.

## 🏗️ Strict Mode (`--strict-cloud`)
For enterprise environments that require the absolute maximum intelligence of flagship cloud models (and would rather fail than use a smaller local model), we provide a **Strict Mode**.
- **CLI**: Run with `--strict-cloud`.
- **Environment**: Set `CLAUDIA_STRICT_CLOUD=true`.
- **Behavior**: Disables the Ollama fallback. If cloud APIs fail after 3 retries, the entire duel will terminate with a `CLOUD_LOGIC_FAILURE`.

---
*Wiki Page | Project Claudia Resilience Model*
*Directed by Anson (@ansonsaju)*
