

# AI-Based Student Credit Scoring & Loan Platform

## Overview
A professional fintech-style web application for student credit scoring, fraud detection, and loan management — built as a college project with real authentication, Supabase database, and pre-loaded demo user data.

---

## Module 1: Authentication & Onboarding
- **Registration page** with fields: Full Name, Email, Password, PAN, Aadhaar (masked), DOB, Employment Type, Monthly Income, Guardian details (for students)
- **Login page** with email/password authentication via Supabase Auth
- **"No PAN? No problem"** messaging for users without PAN
- User profiles stored in Supabase `profiles` table

## Module 2: KYC & Document Upload
- Document upload screen for PAN Card, Aadhaar Card, Salary Slip, Bank Statement
- File type validation (PDF, JPG, PNG) with Supabase Storage
- Upload status indicators (Uploaded / Pending / Verified)
- Document verification status display

## Module 3: Financial Dashboard
- **Transaction history table** showing all user transactions with date, category, amount, type
- **Spending categorization** with pie chart (Rent, Food, College Fees, Hospital, Utilities, Transport, etc.)
- **Income vs Expense** bar/line chart
- **Monthly cash flow** summary cards
- Add transaction form (UPI, Rent, Bill, GST, E-commerce)

## Module 4: AI Credit Score Display
- Prominent **credit score gauge** (300–900 scale) with color coding
- **Risk level badge** (Low / Medium / High)
- Score breakdown cards: Income Stability, Expense Discipline, Repayment Consistency, Fraud Risk Indicator
- Minimum balance maintained, average monthly cash flow
- Pre-computed scores from demo data displayed beautifully

## Module 5: Transparency & Explainability (SHAP-style)
- Top 3 positive factors and top 3 negative factors displayed as cards/bars
- Feature importance chart showing what influenced the score
- Clear explanations in plain language
- **Score improvement suggestions** (e.g., "Maintain minimum balance above ₹10,000")

## Module 6: Fraud Detection Display
- Fraud risk percentage indicator
- Fraud status badge (Clear / Suspicious / Flagged)
- Detected suspicious patterns listed (circular transactions, unusual spikes)
- Fraud alert notifications for flagged users
- Demo user USR003 (Karan Verma) will showcase the fraud detection UI

## Module 7: Loan Decision Module
- **If Approved:** Eligible amount, interest rate, EMI, tenure options, repayment schedule table
- **If Rejected:** Clear rejection reason with explanation
- Loan confirmation prompt: "Do you want to proceed?"
- Loan status tracking

## Module 8: Guardian Responsibility Panel
- Guardian view showing student's loan status, repayment tracking, risk alerts
- Notification indicators for delayed payments
- Income verification visibility

## Module 9: Repayment Monitoring
- Repayment schedule with status (Paid / Due / Overdue)
- Smart notification alerts for upcoming/missed payments
- Penalty warnings display
- Account freeze indicator for defaulters

## Module 10: Help & Support
- FAQ section about credit scoring
- Help center with common questions
- Contact/support information display

## Module 11: Result Dashboard (Home)
- Comprehensive overview with all key metrics at a glance
- Credit Score, Risk Level, Fraud Indicator, Cash Flow, Loan Eligibility
- Quick navigation to all modules

## Design & UX
- **Modern fintech UI** — clean, professional banking-app feel
- **Dark + Light theme** toggle
- **Fully responsive** — mobile-friendly layouts
- Dashboard-based navigation with sidebar
- Charts and analytics using Recharts
- Color-coded risk indicators and score gauges

## Backend (Supabase)
- **Auth:** Email/password registration and login
- **Database tables:** profiles, documents, transactions, credit_scores, fraud_flags, transparency_logs, loan_decisions
- **Storage:** Document file uploads
- **Pre-loaded demo data:** All 5 users (including 2 more to be generated) with their transactions, scores, and loan decisions seeded into the database
- **RLS policies** for secure data access

