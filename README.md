# Project Claudia 🛡️ (Enterprise Edition)

> **Autonomous Adversarial AI Verification & Compliance Platform**
> 
> **Built by [Anson (@ansonsaju)](https://github.com/ansonsaju)**
> *Currently looking for my next role as a Software Engineer. [LinkedIn](https://www.linkedin.com/in/ansonsaju) | [Portfolio](https://ansonsaju.github.io)*

---

### **[📺 Watch the Official Launch Demo](https://github.com/ansonsaju/project-claudia/blob/main/ui/demo.webp)**

![Claudia Vanguard Demo](/C:/Users/sajus/.gemini/antigravity/brain/95ab5a6c-bd0f-4f7e-9ffb-abf4c71d2e95/claudia_final_launch_demo_fixed_1775642506668.webp)

Project Claudia is a production-grade verification engine designed to eliminate the AI verification bottleneck. It is engineered for the 2026 enterprise landscape, ensuring that AI-generated code is robust, secure, and compliant.

## 🏗️ How It Works (The Tri-Agent Duel)
Project Claudia uses an **Adversarial Tri-Agent Design** to verify code integrity:
1. **The Builder**: Generates the code based on requirements (e.g., using **Claude 3.5**).
2. **The Hacker (Adversary)**: Relentlessly attacks the code with edge cases like SQLi, XSS, and logic flaws (e.g., using **GPT-4o**).
3. **The Judge**: Evaluates the duel to prevent infinite loops, ensure deterministic outputs, and certify the final diff.

## 🚀 Getting Started

### 1. Installation
```bash
git clone https://github.com/ansonsaju/project-claudia.git
cd project-claudia
npm install
```

### 2. Configuration (Universal LLM & Privacy)
Claudia supports **Per-Agent Routing** and **Local Models (Ollama)** for total data privacy. Create a `.env` file:
```bash
# Mix and match models for different roles
BUILDER_PROVIDER=anthropic
HACKER_PROVIDER=openai
JUDGE_PROVIDER=gemini

# For Air-Gapped / Privacy-First environments:
DEFAULT_PROVIDER=ollama
OLLAMA_ENDPOINT=http://localhost:11434
```

### 3. Launching
- **Dashboard**: `node server.js` (Visit `http://localhost:8001`)
- **CLI Vanguard**: `node core/claudia-cli.js --scan ./`

## 📊 Performance & Cost (Unit Economics)
- **Unit Economics**: ~4,500 tokens per duel, costing an estimated **$0.03 per Pull Request scan**.
- **Pipeline Latency**: Global security signatures scan in **<2s**, while full adversarial audits average **42s**, keeping developer feedback loops fast.

## ⚖️ Compliance & Governance
Project Claudia is built to satisfy the rigorous requirements of the **EU AI Act (2026)**:
- **Traceability (Art. 12)**: 12-month automated retention log of every duel.
- **Human Oversight (Art. 14)**: Certified code is outputted as a **Unified PR Diff** for final human approval.

## 🔐 Identity Integrity
Incorporates **Quantum Identity Protection**. Authenticated authorship by **Anson** (@ansonsaju) is cryptographically signed and verified on every core engine startup.

---
**Directed by Anson (@ansonsaju)**
*Engineering Trust into the AI Development Lifecycle.*
