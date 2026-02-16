🚀 AI-Powered Credit Scoring System
Innoverse Hackathon – FinTech & Intelligent Finance
📌 Problem Statement

Many individuals lack traditional credit history.
Manual risk evaluation is slow and biased.
Financial inclusion remains a major challenge.

This project builds an AI-powered credit scoring system that:

Assesses creditworthiness

Uses alternative financial indicators

Provides transparent & explainable scoring

(Reference: Hackathon PDF 

AI-Powered Credit Scoring FinTe…

)

🧠 Project Overview

This system allows:

1️⃣ User fills structured financial data (KYC + financial indicators)
2️⃣ AI model analyzes structured input
3️⃣ System generates:

Credit Score

Risk Category

Explanation (Why approved/rejected)

🏗️ Tech Stack

This project is built using:

⚡ Vite (Frontend bundler) 

package

⚛️ React 18

🟦 TypeScript 

tsconfig.app

🎨 Tailwind CSS 

index

🧩 shadcn/ui 

components

📊 Recharts (for score visualization) 

package

🧪 Vitest (testing) 

package

🧹 ESLint (code quality) 

eslint.config

📂 Project Structure
root/
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── postcss.config.js
│
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── components/
    ├── hooks/
    ├── lib/


main.tsx → React entry point

App.tsx → Main application layout

index.css → Tailwind theme & global styles 

index

components/ → UI components

lib/ → Utilities

hooks/ → Custom React hooks

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone <YOUR_GIT_URL>
cd <PROJECT_NAME>

2️⃣ Install Dependencies
npm install

3️⃣ Run Development Server
npm run dev


App will start at:

http://localhost:5173


(Dev script from 

package

)

🧩 Available Scripts

From package.json 

package

:

npm run dev        # Start development server
npm run build      # Production build
npm run preview    # Preview build
npm run lint       # Run ESLint
npm run test       # Run tests

🎨 UI & Theme

This project uses:

Custom Tailwind theme variables 

index

Light/Dark mode support

Gradient utilities:

gradient-primary

gradient-success

gradient-warning

gradient-danger

Design philosophy:

Clean

Financial dashboard style

Explainable score visualization

🧠 AI Module (Planned Architecture)

Frontend → FastAPI Backend → AI Model → Database

Flow:
User Input Form
        ↓
Structured JSON Data
        ↓
FastAPI Endpoint
        ↓
AI Risk Model
        ↓
Credit Score + Explanation
        ↓
Frontend Dashboard Result

📊 Core Features

Multi-step credit application form

Alternative data scoring

Risk classification:

Low Risk

Medium Risk

High Risk

Score explanation logic

Transparent evaluation

🔐 Future Enhancements

Explainable AI (SHAP-based reasoning)

Bias detection

Supabase authentication

Real-time analytics dashboard

Model retraining pipeline
