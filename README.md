🚀 AI-Powered Credit Scoring System
Innoverse Hackathon – FinTech & Intelligent Finance
📌 Overview

An intelligent credit scoring system designed to improve financial inclusion by evaluating individuals who lack traditional credit history.

This system:

📊 Assesses creditworthiness using structured & alternative indicators

⚡ Reduces manual bias in loan evaluation

🔍 Provides transparent and explainable scoring

💡 Enables fair access to financial services

🎯 Problem Statement

Many individuals:

Do not have formal credit history

Are evaluated manually (slow & biased process)

Face exclusion from financial systems

This project builds an AI-driven, structured credit evaluation system to solve these challenges.

🧠 System Architecture
User (Frontend Form)
        ↓
Structured Financial Data (JSON)
        ↓
FastAPI Backend
        ↓
AI Risk Model
        ↓
Credit Score + Risk Category
        ↓
Frontend Dashboard Result

🏗️ Tech Stack
Frontend

⚛️ React 18

🟦 TypeScript

⚡ Vite

🎨 Tailwind CSS

🧩 shadcn/ui

📊 Recharts (Score Visualization)

Backend (Planned Integration)

⚡ FastAPI

🗄 SQLite

🤖 ML Model (Credit Risk Classifier)

Tooling

ESLint

Vitest

PostCSS

Autoprefixer

📂 Project Structure
.
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── postcss.config.js
│
└── src/
    ├── main.tsx        # App entry point
    ├── App.tsx         # Main layout
    ├── index.css       # Tailwind theme & styles
    ├── components/     # UI components
    ├── hooks/          # Custom hooks
    └── lib/            # Utilities

⚙️ Installation
1️⃣ Clone the repository
git clone <YOUR_GIT_URL>
cd <PROJECT_NAME>

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev


App runs at:

http://localhost:5173

📜 Available Scripts
npm run dev        # Start development server
npm run build      # Production build
npm run preview    # Preview build
npm run lint       # Run ESLint
npm run test       # Run tests

📊 Core Features

✅ Multi-step credit application form

✅ Structured financial data collection

✅ Risk classification:

Low Risk

Medium Risk

High Risk

✅ Score explanation logic

✅ Clean financial dashboard UI

✅ Light / Dark mode support

🧠 AI Scoring Logic (Concept)

The AI model evaluates:

Age & Employment Status

Monthly Income

Debt-to-Income Ratio

Transaction Behavior

Alternative Indicators

Output:

Credit Score (0–100)

Risk Category

Explanation of decision

🔮 Future Improvements

SHAP-based Explainable AI

Bias detection module

Supabase authentication

Model retraining pipeline

Real-time analytics dashboard

🏆 Hackathon Alignment

This solution addresses:

✔ Problem Understanding

✔ Innovation

✔ Feasibility

✔ Structured Architecture

✔ Clean UI/UX

✔ Transparent Scoring

👨‍💻 Author

Harsh Meshram
Aspiring Machine Learning Engineer
Building AI systems for financial inclusion 🚀
