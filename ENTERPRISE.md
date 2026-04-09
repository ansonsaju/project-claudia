# Project Claudia: Enterprise Security & Compliance 🛡️

Project Claudia is engineered for environments where data privacy and security are the top priorities. This document outlines the architecture for air-gapped deployments and how Claudia maps to the **EU AI Act** and other regulatory frameworks.

## 🕵️ Air-Gapped Architecture (Local-First)

Unlike traditional AI verification tools that require constant internet access to proprietary LLM APIs, Claudia can operate in a **total air-gap mode**.

### Native Ollama Integration
Claudia communicates with local LLMs via the [Ollama](https://ollama.com) API runner. This ensures that:
- **No Proprietary Code Leaves Your Network**: The Builder, Hacker, and Judge agents all run on your local hardware.
- **Predictable Latency**: Performance is consistent and independent of external API outages or rate limits.
- **Cost Elimination**: Zero per-token costs once the infrastructure is deployed.

### Universal Sandbox Isolation
The execution of machine-generated code is performed within the **Claudia Universal Sandbox**.
- **Ephemeral Containers**: Every test run starts in a clean environment and is destroyed immediately after.
- **Network Isolation**: Sandbox containers have no network access, preventing data exfiltration by malicious or hallucinated code.
- **Resource Constraints**: CPU and memory limits are strictly enforced to prevent DoS attacks from untrusted code.

## 🇪🇺 EU AI Act Compliance Mapping

Claudia provides the "Human-in-the-Loop" and "Automated Governance" features required for High-Risk AI systems under the EU AI Act.

| Requirement | Claudia Implementation |
| :--- | :--- |
| **Risk Management** | Automated "Adversary" agent proactively identifies security and logic vulnerabilities. |
| **Data Governance** | 100% local execution mode for PII and IP protection. |
| **Transparency** | The Arbiter agent generates a human-readable "Audit Log" for every code duel. |
| **Human Oversight** | Claudia acts as a "Guardian" that prepares verified diffs for final human approval. |
| **Accuracy & Robustness** | Randomized adversarial testing ensures code survives beyond "happy path" scenarios. |

## 🚀 Deployment Recommendations

For maximum security in enterprise settings, we recommend the following stack:
1. **Host**: Dedicated Linux server (Ubuntu 24.04 recommended).
2. **Compute**: NVIDIA A100/H100 or high-memory Apple Silicon for LLM inference.
3. **Execution**: Docker Engine with `no-network` bridge for sandboxes.

---
*Developed by Anson ([@ansonsaju](https://github.com/ansonsaju))*
