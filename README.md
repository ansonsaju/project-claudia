# Project Claudia 🛡️ (Enterprise Edition)

> **Autonomous Adversarial AI Verification & Compliance Platform**
> 
> **Built by [Anson (@ansonsaju)](https://github.com/ansonsaju)**
> *Currently looking for my next role as a Software Engineer. [LinkedIn](https://www.linkedin.com/in/ansonsaju) | [Portfolio](https://ansonsaju.github.io)*

---

### **[📺 Watch the Official Launch Demo](https://github.com/ansonsaju/project-claudia/blob/main/ui/demo.webp)**

![Claudia Vanguard Demo](/C:/Users/sajus/.gemini/antigravity/brain/95ab5a6c-bd0f-4f7e-9ffb-abf4c71d2e95/claudia_final_launch_demo_fixed_1775642506668.webp)

Project Claudia is a production-grade verification engine designed to eliminate the AI verification bottleneck.

## ⚖️ Compliance & Governance
Project Claudia is built to satisfy the rigorous requirements of the **EU AI Act (2026)**:
- **Traceability (Art. 12)**: Every adversarial duel is recorded in the `AuditLogger` with a mandatory 12-month retention policy for full forensic audit paths.
- **Human Oversight (Art. 14)**: The **Arbiter System (The Judge)** enforces deterministic code generation, ensuring that outputs are stable and verifiable by human supervisors.
- **Circuit Breaker**: An autonomous retry cap (Max 3) prevents infinite loops and uncontrolled API costs, flagging any unstable implementation for direct human intervention.

## 🛠️ Security & Supply Chain (2025 Standard)
- **Dependency Guard (SBOM)**: The `Universal Sandbox` performs a pre-execution bill-of-materials check to block hallucinated or blacklisted libraries, neutralizing the risk of software supply chain attacks.
- **Adversarial Fuzzing (MCP)**: Utilizing the **Model Context Protocol (MCP)**, the Hacker agent reads actual database schemas and codebase context to generate lethal, targeted SQLi and cross-module attack vectors.

## 🏗️ Architecture
```text
[ Input ] -> [ MCP Context ] -> [ Generator ] -> [ The Judge ] -> [ Universal Sandbox ] -> [ Audit ]
                                      ^              |                 |
                                      |              v                 |
                                      +------- [ The Adversary ] <-----+
```

## 📦 Installation
```bash
git clone https://github.com/ansonsaju/project-claudia.git
npm install
docker compose up -d # Required for Go/Rust Universal Sandbox
```

## 🔐 Identity Integrity
Incorporates **Quantum Identity Protection**. Authenticated authorship by **Anson** (@ansonsaju) is cryptographically signed and verified on every core engine startup.

---
*Engineering Trust into the AI Development Lifecycle.*
