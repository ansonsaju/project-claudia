# Universal Sandbox: Hardened Code Execution 🧪

Project Claudia executes untrusted, machine-generated code inside the **Universal Sandbox**. This ensures that adversarial testing never compromises your host environment.

## 🔒 Security Principles

### 1. Ephemeral Isolation
Every verification duel triggers the creation of a clean virtual environment (Docker-based). Once the duel is complete, the container is destroyed along with all temporary assets.

### 2. Network Air-Gapping
To prevent data exfiltration (a major risk with LLM-hallucinated or malicious code), the Claudia Sandbox has **zero network access** by default. Any attempts to call external APIs or send telemetry are blocked at the bridge layer.

### 3. Resource Governance
We enforce strict CPU, memory, and timeout limits to prevent:
- **Denial of Service (DoS)** through infinite loops.
- **Resource Exhaustion** from computationally expensive exploits.
- **Timeout Probes**: All tests are capped at 10 seconds.

## ⚙️ Supported Runtimes
Claudia supports hybrid auditing for:
- **JavaScript (Node.js)**
- **Python (3.12+)**
- **Go (1.2x+)**

---
*Wiki Page | Project Claudia Vanguard*
