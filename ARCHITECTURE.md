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

#### 3. Regulatory Compliance (EU AI Act Ready) 🇪🇺
Project Claudia is built with "Compliance-by-Design" to satisfy strict 2026 global AI regulations, specifically targeting the EU AI Act:
* **Article 12 (Auditability)**: Claudia maintains a **12-month automated retention log** of every prompt, attack vector, and sandbox execution as structured JSON, providing full traceability.
* **Article 14 (Human Oversight)**: Claudia never blindly auto-commits code. Certified code is outputted as a clean **Unified PR Diff** for final human approval, ensuring meaningful oversight and deterministic outputs.

---
**Project Claudia: Minimalist. Autonomous. Indisputable.**
