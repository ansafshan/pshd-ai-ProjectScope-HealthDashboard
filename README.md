# pshd-ai Dashboard 📊✨

This application securely ingests chaotic, unstructured client communications (emails, Slack threads, rough briefs), processes them through advanced generative AI schemas, and translates them instantly into structured project health matrices.

## 🚀 Key Architectural Features

*   **Secure User Management:** End-to-end user authentication powered by **Firebase Auth**, protecting user dashboards and data scoping spaces.
*   **Structured AI Inference:** Integration with the **Google Gen AI SDK (Gemini 2.5 Flash)** using structured JSON enforcement configuration to extract tech stacks, explicit deliverable checklists, and timeline metrics without data formatting anomalies.
*   **Cloud Data Persistence:** Automated syncing of analyzed project scopes to **Firebase Cloud Firestore**, mapping records securely to individual user tokens (`uid`) with cloud server timestamps.
*   **Production-Ready Design System:** A clean, minimal user interface built from scratch following **Material-UI (MUI) design guidelines**, implementing proper typographic scales, interactive elevation layers, and contextual risk-assessment statuses.
*   **Production Bundle Optimization:** Custom Vite build chunking configuration splitting heavy core SDKs into separated async files (`vendor-core`) to maximize browser delivery performance.

---

## 🛠️ The Tech Stack

*   **Frontend Ecosystem:** React (Vite single-page-app architecture)
*   **AI Engine:** `@google/genai` (Gemini 2.5 Flash)
*   **Backend & Infrastructure:** Firebase Suite (Authentication, Firestore Database, Secure Global Hosting)
*   **Design Paradigm:** Material Design / MUI Inspired Typography and Component Elevation

---

## 📦 Local Setup & Installation

Follow these sequential steps to run this application locally on your machine.

### 1. Clone the Repository
```bash
git clonehttps://github.com/ansafshan/pshd-ai-ProjectScope-HealthDashboard
cd pshd-ai-ProjectScope-HealthDashboard
