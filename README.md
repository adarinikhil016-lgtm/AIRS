# # AIRS — Autonomous Intelligence Reporting System

> **Hackathon Submission**: AIRS is a privacy-first, full-stack executive AI reporting platform that performs client-side PII sanitization, multivariate anomaly detection (Isolation Forest), automated forecasting, and executive data synthesis powered by Gemini 2.5 Flash.

---

## 🌟 Key Features

- **Client-Side PII Masking & Privacy Engine**: Automatically detects and redacts emails, SSNs, credit card numbers (Luhn validated), phone numbers, and full names directly in the browser before sending data to any external API.
- **Multivariate Outlier & Anomaly Detection**: Uses a Z-Score & Isolation Forest scoring algorithm to flag anomalies exceeding 2.5σ variance.
- **AI Executive Synthesis (Gemini 2.5 Flash)**: Connects to Google's `@google/genai` SDK to produce executive summary narratives, risk assessments, and strategic action plans.
- **Predictive Trajectory Forecasting**: Calculates Pearson correlation matrices and linear regression growth trends for numeric attributes.
- **Executive PDF Export**: Generates printable executive summaries and data governance compliance reports.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Recharts, Motion, PapaParse
- **Backend**: Node.js, Express, Google GenAI SDK (`@google/genai`), Vite Middleware
- **Build System**: Vite, esbuild, tsx

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/varunkumarn3570-wq/AIRS_hackathon.git
cd AIRS_hackathon
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set Environment Variables
Create a `.env` file in the project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 📄 License
