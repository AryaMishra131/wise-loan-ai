import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { demoUsers } from "@/lib/demoData";
import ScoreGauge from "@/components/ScoreGauge";

export default function CreditScore() {
  const [selectedUser, setSelectedUser] = useState(demoUsers[0]);
  const riskColor = { Low: "bg-success text-success-foreground", Medium: "bg-warning text-warning-foreground", High: "bg-destructive text-destructive-foreground" };

  const metrics = [
    { label: "Repayment Probability", value: `${(((selectedUser.creditScore - 300) / 600) * 100).toFixed(1)}%` },
    { label: "Income Stability", value: `${(selectedUser.transparency.featureImportance["Income Stability"] * 100).toFixed(0)}%` },
    { label: "Expense Discipline", value: `${(selectedUser.transparency.featureImportance["Expense Discipline"] * 100).toFixed(0)}%` },
    { label: "Repayment Consistency", value: `${selectedUser.repaymentConsistency}%` },
    { label: "Fraud Risk", value: `${selectedUser.fraudRiskPercentage}%` },
    { label: "Min Balance", value: `₹${selectedUser.minimumBalanceMaintained.toLocaleString("en-IN")}` },
    { label: "Avg Cash Flow", value: `₹${selectedUser.averageMonthlyCashFlow.toLocaleString("en-IN")}` },
    { label: "Loan Eligibility", value: `₹${selectedUser.loanEligibilityAmount.toLocaleString("en-IN")}` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI Credit Score</h1>
          <p className="text-muted-foreground text-sm">AI-computed credit intelligence (300–900)</p>
        </div>
        <Select value={selectedUser.id} onValueChange={(v) => setSelectedUser(demoUsers.find((u) => u.id === v)!)}>
          <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>{demoUsers.map((u) => <SelectItem key={u.id} value={u.id}>{u.fullName}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col items-center justify-center p-8 relative">
          <ScoreGauge score={selectedUser.creditScore} size={220} />
          <div className="flex gap-2 mt-8">
            <Badge className={riskColor[selectedUser.riskLevel]}>{selectedUser.riskLevel} Risk</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-3">{selectedUser.fullName} • {selectedUser.employmentType}</p>
        </Card>

        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <Card key={m.label} className="p-4">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-lg font-bold font-mono mt-1">{m.value}</p>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Feature Importance</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(selectedUser.transparency.featureImportance).map(([key, val]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm"><span>{key}</span><span className="font-mono">{(val * 100).toFixed(0)}%</span></div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full gradient-primary" style={{ width: `${val * 100}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
