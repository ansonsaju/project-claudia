# Project Claudia: Architecture & Efficiency Guide 🏗️

> **Directed by Anson (@ansonsaju)**
> *Engineering Trust into the AI Development Lifecycle.*

## 1. How Claudia Works (The Working Logic)

Project Claudia utilizes an **Adversarial Tri-Agent Design** to verify code integrity. Unlike traditional linters, Claudia assumes all code is insecure until it survives a "Duel."

### The Multi-Agent Duel
1.  **The Builder (Orchestrator)**: Proposes a solution based on the user's requirements.
2.  **The Adversary (Hacker)**: Analyzes the Builder's code and generates targeted, malicious test cases (SQLi, XSS, Logic leaks) to break it.
3.  **The Arbiter (The Judge)**: Evaluates the duel. If the Hacker breaks the code, the Judge returns the failure to the Builder with a "Correction Prompt."
4.  **Self-Healing**: This loop continues until the Judge certifies that the code is deterministic, secure, and robust.

##### 📦 The Universal Sandbox & Supply Chain Defense
The duel takes place inside a secure, isolated Docker environment that supports multiple languages (JS, PY, GO, RS). 
* **Hallucination & SBOM Check**: Before execution, the sandbox verifies that the Builder agent has not imported known vulnerable or hallucinated third-party packages.
* **Resource Exhaustion Protection**: The sandbox enforces a strict **10-second timeout** and memory limit, instantly killing processes if the Builder writes an infinite loop or a memory leak.

##### 🧠 Model Context Protocol (MCP) Integration
AI agents fail when they lack broader system context. Claudia integrates **MCP** to securely ingest necessary external context before writing or attacking code:
* **Schema Awareness**: The Builder and Hacker agents can read database schemas (e.g., SQL tables) to ensure code aligns with actual data structures and SQLi attacks are highly targeted.
* **Cross-File Dependency**: Agents understand how the targeted function interacts with the broader repository, eliminating hallucinated variables.

### The Vanguard Hybrid Scanning
-   **Stage 1 (Global)**: High-speed regex scanning across the whole repository for hardcoded secrets and known security signatures.
-   **Stage 2 (Local/Diff)**: Deep adversarial audits performed strictly on the **Git Diff**, ensuring intensive computation is only spent on new changes.

---

## 2. Engineering Efficiency (Performance & Unit Economics)

Claudia is designed to solve the "Verification Crisis" in AI development without inflating operational costs.

### 💰 Unit Economics (Cost per PR)
By utilizing a **Circuit Breaker** (max 3 retries) and optimized prompt context windows, Claudia maintains a highly predictable budget:
- **Average Token Usage**: ~4,500 tokens per full certification cycle.
- **Estimated Cost**: **$0.03 per Pull Request**.
*Significance: Provides senior-level oversight at a 99% discount compared to manual human review.*

### ⏱️ Latency (Developer Feedback Loop)
- **Hybrid Scan Time**: < 2 seconds for global security signatures.
- **Verification Latency**: Average **42 seconds** per full adversarial gauntlet.
*Result: Security is "Shifted Left" into the development cycle without creating a bottleneck.*

### 🛡️ False Positive Mitigation
Classic security tools often generate high "Noise." Claudia’s **Arbiter System** acts as a strict filter. A developer is only notified if a vulnerability is **reproducible in the Sandbox**. If the Hacker hallucinates an attack, the Judge rejects it, keeping developer frustration low.

---

---

## 3. Universal LLM Orchestration (Multi-Vendor Swarm)

In 2026, relying on a single AI vendor is a strategic risk. Project Claudia implements a **Heterogeneous Multi-Agent Swarm** that allows developers to mix and match the best models for each specific role.

### 🧠 Per-Agent Provider Routing
Claudia supports individual provider configuration for each persona in the duel:
- **The Builder (e.g., Anthropic Claude 3.5)**: Optimized for structural code integrity and logical coherence.
- **The Adversary (e.g., OpenAI GPT-4o)**: Optimized for aggressive red-teaming and creative attack vector generation.
- **The Judge (e.g., Gemini 1.5 Flash)**: Optimized for fast, deterministic evaluation and cost-effective auditing.

### 🏠 Local & Privacy-First Models (Ollama)
For high-security enterprise environments and air-gapped systems, Claudia supports **Ollama**. This allows the entire adversarial gauntlet to run locally on proprietary hardware, ensuring zero data leakage to external APIs and full compliance with sovereign AI regulations.

### 💰 Unit Economics & Multi-Vendor Cost Tracking
Claudia normalizes token usage and costs across all vendors. Every duel is audited with a standardized metric:
- **Unified Billing Analysis**: Even when mixing vendors, Claudia calculates the cumulative "Duel Cost" based on real-time input/output token rates for each provider.
- **Circuit Breaker Aware**: The system maintains its predictable budget of **~$0.03 per PR** regardless of whether it's using cloud or local models.

---
**Project Claudia: Minimalist. Autonomous. Indisputable.**
