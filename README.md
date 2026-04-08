# Project Claudia 🛡️ (Enterprise Edition)

> **Autonomous Adversarial AI Verification & Compliance Platform**
> 
> **Built by [Anson (@ansonsaju)](https://github.com/ansonsaju)**
> *Currently looking for my next role as a Software Engineer. [LinkedIn](https://www.linkedin.com/in/ansonsaju) | [Portfolio](https://ansonsaju.github.io)*

---

### **[📺 Watch the Official Launch Demo](https://github.com/ansonsaju/project-claudia/blob/main/ui/demo.webp)**

![Claudia Vanguard Demo](/C:/Users/sajus/.gemini/antigravity/brain/95ab5a6c-bd0f-4f7e-9ffb-abf4c71d2e95/claudia_final_launch_demo_fixed_1775642506668.webp)

Project Claudia is a production-grade verification engine designed to eliminate the AI verification bottleneck.

## 🚀 Getting Started

### 1. Configuration (LLM Keys)
Claudia requires an LLM provider to power the Adversary and Builder agents.
- Create a `.env` file in the root directory.
- Add your API key:
  ```bash
  OPENAI_API_KEY=your_sk_key_here
  ```

### 2. Launching the Dashboard
To use the visual "Adversarial Arena":
```bash
node server.js
```
Visit `http://localhost:8001` to start real-time verification gauntlets.

### 3. Repository Vanguard (Full Project Scanning)
To perform a hybrid security audit of your entire repository:
```bash
node core/claudia-cli.js --scan ./
```
*Tip: Run this once a week or before a major release to certify your entire codebase.*

### 4. Guardian Mode (The Git Middleman)
To automatically block insecure code from being pushed to GitHub:
- Copy the hook script:
  ```bash
  mkdir -p .git/hooks
  cp scripts/guardian-hook.sh .git/hooks/pre-push
  chmod +x .git/hooks/pre-push
  ```
- Now, whenever you run `git push`, Claudia will autonomously audit your **Git Diff**. If it finds logic flaws or leaked secrets, the push will be aborted with a **Certified Fix** proposal.

## ⚖️ Compliance & Governance
Project Claudia is built to satisfy the rigorous requirements of the **EU AI Act (2026)**:
- **Traceability (Art. 12)**: Every adversarial duel is recorded in the `AuditLogger` with a mandatory 12-month retention policy.
- **Human Oversight (Art. 14)**: The Arbiter System enforces deterministic code generation.

## 🔐 Identity Integrity
Incorporates **Quantum Identity Protection**. Authenticated authorship by **Anson** (@ansonsaju) is cryptographically signed and verified on every core engine startup.

---
*Engineering Trust into the AI Development Lifecycle.*
**Directed by Anson (@ansonsaju)**
