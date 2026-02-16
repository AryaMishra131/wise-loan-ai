
-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  pan_number TEXT,
  aadhaar_masked TEXT,
  mobile TEXT,
  email TEXT,
  address_city TEXT,
  address_state TEXT,
  gender TEXT,
  employment_type TEXT CHECK (employment_type IN ('Student', 'Working Professional')),
  monthly_income NUMERIC DEFAULT 0,
  guardian_name TEXT,
  guardian_income NUMERIC,
  salary_stability TEXT CHECK (salary_stability IN ('Stable', 'Moderate', 'Irregular')),
  bank_name TEXT,
  account_type TEXT,
  average_monthly_balance NUMERIC,
  minimum_balance_maintained NUMERIC,
  upi_balance_stability TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Documents table
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('PAN Card', 'Aadhaar Card', 'Salary Slip', 'Bank Statement')),
  file_path TEXT,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Uploaded', 'Pending', 'Verified')),
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- Transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  transaction_date DATE NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('Credit', 'Debit')),
  amount NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Credit scores table
CREATE TABLE public.credit_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  credit_score INTEGER NOT NULL CHECK (credit_score >= 300 AND credit_score <= 900),
  risk_level TEXT NOT NULL CHECK (risk_level IN ('Low', 'Medium', 'High')),
  repayment_probability NUMERIC,
  income_stability_score NUMERIC,
  expense_discipline_score NUMERIC,
  repayment_consistency_percentage NUMERIC,
  fraud_risk_percentage NUMERIC,
  average_monthly_cash_flow NUMERIC,
  minimum_balance_maintained NUMERIC,
  computed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fraud flags table
CREATE TABLE public.fraud_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  fraud_status TEXT NOT NULL DEFAULT 'Clear' CHECK (fraud_status IN ('Clear', 'Suspicious', 'Flagged')),
  fraud_risk_percentage NUMERIC DEFAULT 0,
  fraud_reasons JSONB DEFAULT '[]'::jsonb,
  detected_patterns JSONB DEFAULT '[]'::jsonb,
  detected_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Transparency logs table (SHAP-style explainability)
CREATE TABLE public.transparency_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  top_positive_factors JSONB DEFAULT '[]'::jsonb,
  top_negative_factors JSONB DEFAULT '[]'::jsonb,
  feature_importance JSONB DEFAULT '{}'::jsonb,
  suggestions JSONB DEFAULT '[]'::jsonb,
  computed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Loan decisions table
CREATE TABLE public.loan_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('Approved', 'Rejected', 'Pending')),
  approved_amount NUMERIC DEFAULT 0,
  interest_rate NUMERIC DEFAULT 0,
  tenure_months INTEGER DEFAULT 0,
  emi_amount NUMERIC DEFAULT 0,
  loan_eligibility_amount NUMERIC DEFAULT 0,
  existing_loan_amount NUMERIC DEFAULT 0,
  decision_reason TEXT,
  repayment_schedule JSONB DEFAULT '[]'::jsonb,
  decided_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fraud_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transparency_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_decisions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for documents
CREATE POLICY "Users can view own documents" ON public.documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own documents" ON public.documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own documents" ON public.documents FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for transactions
CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own transactions" ON public.transactions FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for credit_scores
CREATE POLICY "Users can view own credit score" ON public.credit_scores FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for fraud_flags
CREATE POLICY "Users can view own fraud flags" ON public.fraud_flags FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for transparency_logs
CREATE POLICY "Users can view own transparency logs" ON public.transparency_logs FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for loan_decisions
CREATE POLICY "Users can view own loan decisions" ON public.loan_decisions FOR SELECT USING (auth.uid() = user_id);

-- Auto-create profile on signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
