# Project Claudia 🛡️ (Enterprise Edition)

> **Autonomous Adversarial AI Verification & Compliance Platform**
> 
> **Built by [Anson (@ansonsaju)](https://github.com/ansonsaju)**
> *Currently looking for my next role as a Software Engineer. [LinkedIn](https://www.linkedin.com/in/ansonsaju/) | [Portfolio](https://ansonsaju.github.io)*

---

### **[📺 Watch the Official Launch Demo](https://github.com/ansonsaju/project-claudia/blob/main/ui/demo.webp)**

![Project Claudia Demo](https://github.com/ansonsaju/project-claudia/raw/main/ui/demo.webp)

Project Claudia is a production-grade verification engine designed to eliminate the AI verification bottleneck. It is engineered for the 2026 enterprise landscape, ensuring that AI-generated code is robust, secure, and compliant.

#### 🧠 How It Works & Unit Economics
Project Claudia utilizes an **Adversarial Tri-Agent Design** to verify code integrity before it reaches production:
* **The Builder** writes the initial code based on the prompt.
* **The Adversary (Hacker)** relentlessly attacks it with edge cases (SQLi, XSS).
* **The Judge** evaluates the duel to prevent infinite loops and ensure deterministic outputs.

**Performance & Cost Metrics:**
* **Unit Economics:** ~4,500 tokens per duel, costing an estimated **$0.03 per Pull Request scan**.
* **Pipeline Latency:** Global security signatures scan in <2s, while full adversarial logic audits average **42 seconds**, keeping developer feedback loops fast.

#### 🚀 Getting Started

##### 1. Installation
```bash
git clone https://github.com/ansonsaju/project-claudia.git
cd project-claudia
npm install
npm start
```

##### 2. Configuration (Universal LLM & Local Privacy)
Claudia requires an LLM provider to power the agents. We support per-agent routing and local models for total enterprise data privacy. Create a `.env` file in the root directory:
```bash
BUILDER_PROVIDER=anthropic
HACKER_PROVIDER=openai
JUDGE_PROVIDER=gemini
OLLAMA_ENDPOINT=http://localhost:11434 # For 100% offline, air-gapped privacy
```

##### 3. Launching the Dashboard
To use the visual "Adversarial Arena", visit `http://localhost:8001` to start real-time verification gauntlets.

#### 🛡️ Repository Vanguard (CLI)
To perform a hybrid security audit of your entire repository:
```bash
node core/claudia-cli.js --scan ./
```
*Tip: Run this once a week or before a major release to certify your entire codebase.*

## ⚖️ Compliance & Governance
Project Claudia is built to satisfy the rigorous requirements of the **EU AI Act (2026)**:
- **Traceability (Art. 12)**: 12-month automated retention log of every duel.
- **Human Oversight (Art. 14)**: Certified code is outputted as a **Unified PR Diff** for final human approval.

## 🔐 Identity Integrity
Incorporates **Quantum Identity Protection**. Authenticated authorship by **Anson** (@ansonsaju) is cryptographically signed and verified on every core engine startup.

---
**Directed by Anson (@ansonsaju)**
*Engineering Trust into the AI Development Lifecycle.*
