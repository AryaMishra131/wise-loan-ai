export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      credit_scores: {
        Row: {
          average_monthly_cash_flow: number | null
          computed_at: string
          credit_score: number
          expense_discipline_score: number | null
          fraud_risk_percentage: number | null
          id: string
          income_stability_score: number | null
          minimum_balance_maintained: number | null
          repayment_consistency_percentage: number | null
          repayment_probability: number | null
          risk_level: string
          user_id: string
        }
        Insert: {
          average_monthly_cash_flow?: number | null
          computed_at?: string
          credit_score: number
          expense_discipline_score?: number | null
          fraud_risk_percentage?: number | null
          id?: string
          income_stability_score?: number | null
          minimum_balance_maintained?: number | null
          repayment_consistency_percentage?: number | null
          repayment_probability?: number | null
          risk_level: string
          user_id: string
        }
        Update: {
          average_monthly_cash_flow?: number | null
          computed_at?: string
          credit_score?: number
          expense_discipline_score?: number | null
          fraud_risk_percentage?: number | null
          id?: string
          income_stability_score?: number | null
          minimum_balance_maintained?: number | null
          repayment_consistency_percentage?: number | null
          repayment_probability?: number | null
          risk_level?: string
          user_id?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          document_type: string
          file_path: string | null
          id: string
          status: string
          uploaded_at: string | null
          user_id: string
        }
        Insert: {
          document_type: string
          file_path?: string | null
          id?: string
          status?: string
          uploaded_at?: string | null
          user_id: string
        }
        Update: {
          document_type?: string
          file_path?: string | null
          id?: string
          status?: string
          uploaded_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      fraud_flags: {
        Row: {
          detected_at: string
          detected_patterns: Json | null
          fraud_reasons: Json | null
          fraud_risk_percentage: number | null
          fraud_status: string
          id: string
          user_id: string
        }
        Insert: {
          detected_at?: string
          detected_patterns?: Json | null
          fraud_reasons?: Json | null
          fraud_risk_percentage?: number | null
          fraud_status?: string
          id?: string
          user_id: string
        }
        Update: {
          detected_at?: string
          detected_patterns?: Json | null
          fraud_reasons?: Json | null
          fraud_risk_percentage?: number | null
          fraud_status?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      loan_decisions: {
        Row: {
          approved_amount: number | null
          decided_at: string
          decision_reason: string | null
          emi_amount: number | null
          existing_loan_amount: number | null
          id: string
          interest_rate: number | null
          loan_eligibility_amount: number | null
          repayment_schedule: Json | null
          status: string
          tenure_months: number | null
          user_id: string
        }
        Insert: {
          approved_amount?: number | null
          decided_at?: string
          decision_reason?: string | null
          emi_amount?: number | null
          existing_loan_amount?: number | null
          id?: string
          interest_rate?: number | null
          loan_eligibility_amount?: number | null
          repayment_schedule?: Json | null
          status: string
          tenure_months?: number | null
          user_id: string
        }
        Update: {
          approved_amount?: number | null
          decided_at?: string
          decision_reason?: string | null
          emi_amount?: number | null
          existing_loan_amount?: number | null
          id?: string
          interest_rate?: number | null
          loan_eligibility_amount?: number | null
          repayment_schedule?: Json | null
          status?: string
          tenure_months?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          aadhaar_masked: string | null
          account_type: string | null
          address_city: string | null
          address_state: string | null
          average_monthly_balance: number | null
          bank_name: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          employment_type: string | null
          full_name: string
          gender: string | null
          guardian_income: number | null
          guardian_name: string | null
          id: string
          minimum_balance_maintained: number | null
          mobile: string | null
          monthly_income: number | null
          pan_number: string | null
          salary_stability: string | null
          updated_at: string
          upi_balance_stability: string | null
          user_id: string
        }
        Insert: {
          aadhaar_masked?: string | null
          account_type?: string | null
          address_city?: string | null
          address_state?: string | null
          average_monthly_balance?: number | null
          bank_name?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          employment_type?: string | null
          full_name: string
          gender?: string | null
          guardian_income?: number | null
          guardian_name?: string | null
          id?: string
          minimum_balance_maintained?: number | null
          mobile?: string | null
          monthly_income?: number | null
          pan_number?: string | null
          salary_stability?: string | null
          updated_at?: string
          upi_balance_stability?: string | null
          user_id: string
        }
        Update: {
          aadhaar_masked?: string | null
          account_type?: string | null
          address_city?: string | null
          address_state?: string | null
          average_monthly_balance?: number | null
          bank_name?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          employment_type?: string | null
          full_name?: string
          gender?: string | null
          guardian_income?: number | null
          guardian_name?: string | null
          id?: string
          minimum_balance_maintained?: number | null
          mobile?: string | null
          monthly_income?: number | null
          pan_number?: string | null
          salary_stability?: string | null
          updated_at?: string
          upi_balance_stability?: string | null
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          category: string
          created_at: string
          description: string | null
          id: string
          transaction_date: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          description?: string | null
          id?: string
          transaction_date: string
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          transaction_date?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      transparency_logs: {
        Row: {
          computed_at: string
          feature_importance: Json | null
          id: string
          suggestions: Json | null
          top_negative_factors: Json | null
          top_positive_factors: Json | null
          user_id: string
        }
        Insert: {
          computed_at?: string
          feature_importance?: Json | null
          id?: string
          suggestions?: Json | null
          top_negative_factors?: Json | null
          top_positive_factors?: Json | null
          user_id: string
        }
        Update: {
          computed_at?: string
          feature_importance?: Json | null
          id?: string
          suggestions?: Json | null
          top_negative_factors?: Json | null
          top_positive_factors?: Json | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
