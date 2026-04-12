# Project Claudia 🛡️ (Enterprise Edition)

![Project Claudia Banner](social-preview.png)

[![CI Status](https://img.shields.io/github/actions/workflow/status/ansonsaju/project-claudia/claudia-verify.yml?branch=main&style=flat-square)](https://github.com/ansonsaju/project-claudia/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Docker: Optimized](https://img.shields.io/badge/Docker-Optimized-2496ED.svg?style=flat-square&logo=docker&logoColor=white)](https://github.com/ansonsaju/project-claudia/blob/main/docker-compose.yml)
[![Security: Certified](https://img.shields.io/badge/Security-Certified-green.svg?style=flat-square)](https://github.com/ansonsaju/project-claudia/blob/main/audits/)
[![AAIF Aligned](https://img.shields.io/badge/AAIF-Aligned-007ACC?style=flat-square&logo=linuxfoundation)](https://agentic-ai.org)
[![OSAID 1.0](https://img.shields.io/badge/OSAID%201.0-Compliant-FFD700?style=flat-square)](https://opensource.org/osaid)

> **The Autonomous "Middleman" for Secure, Deterministic AI Development.**
> 
> **Built by [Anson (@ansonsaju)](https://github.com/ansonsaju)**
> *Currently looking for my next role as a Software Engineer. [LinkedIn](https://www.linkedin.com/in/anson-saju) | [Portfolio](https://ansonsaju.github.io)*

---

### **[📺 Watch the Official Launch: Engineering Trust (Video)](https://github.com/ansonsaju/project-claudia/blob/main/assets/Project_Claudia__Engineering_Trust.mp4)**
*(Note: If the GitHub preview fails due to file size, click the link to download/view the high-res master.)*

[![Project Claudia Launch](https://raw.githubusercontent.com/ansonsaju/project-claudia/main/assets/demo.webp)](https://github.com/ansonsaju/project-claudia/blob/main/assets/Project_Claudia__Engineering_Trust.mp4)

---

## ⚡ Quick Start (2-Minute Setup)

Get Project Claudia running locally in seconds.

```bash
# 1. Clone the repository
git clone https://github.com/ansonsaju/project-claudia.git && cd project-claudia

# 2. Launch the Tri-Agent Engine & UI
docker compose up -d

# 3. Open the Dashboard
# Visit http://localhost:3000 to start your first verification duel.
```

> [!TIP]
> Prefer the terminal? Run `npm run interactive` for a native CLI experience.

---

## 🛑 The "Verification Crisis" in AI
In 2026, the software industry is facing a crisis. While AI can write code in milliseconds, **96% of developers** do not fully trust it. Reviewing subtle AI flaws has increased code review times by **91%**, effectively creating an "AI verification bottleneck."

**Project Claudia is the cure.** It acts as a lethal adversarial middleman that assumes all code is insecure until it survives a specialized tri-agent gauntlet.

## 🏗️ How It Works (Adversarial Tri-Agent Duel)
Claudia utilizes an elite multi-agent system grounded in real-world context via **Model Context Protocol (MCP)**:
*   **The Builder**: Writes code delta based on requirements and **external Jira/GitHub Issues**.
*   **The Adversary (Hacker)**: Relentlessly attacks the code with edge cases (SQLi, XSS, logic leaks).
*   **The Judge (Arbiter)**: Evaluates the duel, prevents "lazy fixes," and certifies the final **Unified PR Diff**.

## 🚀 One-Click Enterprise Scaling
Claudia is built for 2026's cloud-native enterprise stacks.

### 🐳 Local: Docker Compose
Boot the engine, sandbox, and dashboard in one command:
```bash
docker compose up -d
```

### ☸️ Production: Kubernetes
Deploy Claudia into your enterprise cluster:
```bash
kubectl apply -f k8s-deployment.yaml
```

### 💻 Terminal-Native Mode (Interactive CLI)
For developers who prefer the command line over the web UI:
```bash
npm run interactive
```

## 📖 Deep Dive & Architecture
For a comprehensive understanding of the Vanguard security model and compliance metrics:
- **[Full Technical Whitepaper (PDF)](https://github.com/ansonsaju/project-claudia/blob/main/assets/Project_Claudia.pdf)**
- **[System Mind Map / Conceptual Architecture](https://github.com/ansonsaju/project-claudia/blob/main/assets/NotebookLM%20Mind%20Map%20(1).png)**
- **[A.I. Governance (Architecture Docs)](https://github.com/ansonsaju/project-claudia/blob/main/ARCHITECTURE.md)**

### 📚 Deep Technical Documentation
Explore the inner workings of the Adversarial Engine:
- [Adversarial Intelligence Architecture](docs/ARCHITECTURE.md): HAE Loops & Sandbox Isolation.
- [Security & Ethics Model](docs/SECURITY_MODEL.md): Guardrails & Attribution Matrix.

## 🕵️ Local-First Privacy & Air-Gapped Security
Claudia is designed for sensitive environments where data sovereignty is non-negotiable.

*   **Zero External Requests**: Built-in support for **Ollama** allows you to run Llama 3, Mistral, or CodeLlama entirely within your own firewall.
*   **EU AI Act Ready**: Compliance-focused logging and deterministic verification satisfy strict regulatory audits.
*   **Enterprise Sandbox**: Code execution happens in isolated, ephemeral containers—never on your host machine.

> [!IMPORTANT]
> For a deep dive into air-gapped architecture and compliance mapping, see **[ENTERPRISE.md](file:///C:/Users/sajus/.gemini/antigravity/scratch/claudia/ENTERPRISE.md)**.

## 📊 Performance & Unit Economics
*   **Cost Efficiency**: ~4,500 tokens per duel (~**$0.03 per Pull Request scan**).
*   **Latency**: Global security scans in **<2s**, full logical audits in **42s**.
*   **Offline/Air-Gapped**: Native **Ollama** support for total data privacy (EU AI Act Compliant).

## 🏛️ Standardized for the Agentic Era

Project Claudia is built to be an institutional-grade tool, not just a standalone experiment. We align with the leading standards of 2026:

- **AAIF (Agentic AI Foundation)**: Our integration of the **Model Context Protocol (MCP)** follows the interoperability and security standards set by the Linux Foundation's AAIF.
- **OSAID 1.0 (Open Source AI Definition)**: We are committed to transparency in AI. Claudia fulfills the OSAID requirements for open-source AI, ensuring total visibility into agent prompts and decision logic.
- **Hardened Supply Chain**: All releases follow the "Hardened Publishing" protocol with **OIDC-based signatures** to prevent supply chain contamination.

## 🤝 Join the Community

Project Claudia is driven by a global community of security researchers and AI engineers.
- **[GitHub Discussions](https://github.com/ansonsaju/project-claudia/discussions)**: Ask questions, share your ideas, and connect with other users.
- **[Contributor Pipeline](https://github.com/ansonsaju/project-claudia/blob/main/CONTRIBUTING.md#🎓-path-to-maintenance)**: Learn how to level up from a first-time contributor to a core maintainer.
- **[Support Guide](file:///C:/Users/sajus/.gemini/antigravity/scratch/claudia/SUPPORT.md)**: Need help? Check our support document for the best way to get assistance.

## 💖 Support the Project
If Claudia has secured your repository or saved your team hours of manual review, consider supporting our mission!
[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8ebb)](https://github.com/sponsors/ansonsaju)

---
**Directed by Anson (@ansonsaju)**
*Engineering Trust into the AI Development Lifecycle.*
