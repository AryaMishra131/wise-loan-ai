import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Loader2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "", email: "", password: "", pan: "", aadhaar: "", dob: "",
    employmentType: "", monthlyIncome: "", guardianName: "", guardianIncome: "", mobile: ""
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(form.email, form.password, form.fullName);
      // Update profile with additional fields
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("profiles").update({
          pan_number: form.pan || null,
          aadhaar_masked: form.aadhaar || null,
          date_of_birth: form.dob || null,
          employment_type: form.employmentType || null,
          monthly_income: form.monthlyIncome ? Number(form.monthlyIncome) : 0,
          guardian_name: form.guardianName || null,
          guardian_income: form.guardianIncome ? Number(form.guardianIncome) : null,
          mobile: form.mobile || null,
        }).eq("user_id", user.id);
      }
      toast({ title: "Registration successful!", description: "Welcome to CreditAI" });
      navigate("/dashboard");
    } catch (error: any) {
      toast({ title: "Registration failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-lg">
            <CreditCard className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm text-muted-foreground">Join CreditAI — AI-powered credit intelligence</p>
        </div>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
            <CardDescription>All fields marked are required for credit assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Aarav Kulkarni" />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Password *</Label>
                  <Input required type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Min 6 characters" />
                </div>
                <div className="space-y-2">
                  <Label>Mobile</Label>
                  <Input value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="9876543210" />
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>PAN Number</Label>
                  <Input value={form.pan} onChange={(e) => update("pan", e.target.value)} placeholder="ABCDE1234F" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Aadhaar (Last 4 digits)</Label>
                  <Input value={form.aadhaar} onChange={(e) => update("aadhaar", e.target.value)} placeholder="XXXX-XXXX-1234" />
                </div>
              </div>

              {!form.pan && (
                <div className="flex items-start gap-2 rounded-lg bg-accent p-3 text-sm">
                  <Info className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  <span className="text-accent-foreground">No PAN? No problem. Aadhaar verification will be used for identity validation.</span>
                </div>
              )}

              <div className="space-y-2">
                <Label>Employment Type</Label>
                <Select onValueChange={(v) => update("employmentType", v)}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Working Professional">Working Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Monthly Income (₹)</Label>
                <Input type="number" value={form.monthlyIncome} onChange={(e) => update("monthlyIncome", e.target.value)} placeholder="25000" />
              </div>

              {form.employmentType === "Student" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg border border-border p-4">
                  <div className="sm:col-span-2 text-sm font-medium text-muted-foreground">Guardian Details (Required for Students)</div>
                  <div className="space-y-2">
                    <Label>Guardian Name</Label>
                    <Input value={form.guardianName} onChange={(e) => update("guardianName", e.target.value)} placeholder="Parent/Guardian name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Guardian Income (₹)</Label>
                    <Input type="number" value={form.guardianIncome} onChange={(e) => update("guardianIncome", e.target.value)} placeholder="65000" />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full gradient-primary" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">Sign In</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
