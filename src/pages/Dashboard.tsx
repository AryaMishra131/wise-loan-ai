import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { demoUsers, CATEGORY_COLORS } from "@/lib/demoData";
import ScoreGauge from "@/components/ScoreGauge";
import { TrendingUp, TrendingDown, Shield, Wallet, IndianRupee, BarChart3, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState(demoUsers[0]);

  const debits = selectedUser.transactions.filter((t) => t.type === "Debit");
  const credits = selectedUser.transactions.filter((t) => t.type === "Credit");
  const totalDebit = debits.reduce((s, t) => s + t.amount, 0);
  const totalCredit = credits.reduce((s, t) => s + t.amount, 0);

  const categoryData = Object.entries(
    debits.reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + t.amount; return acc; }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const riskColor = { Low: "bg-success text-success-foreground", Medium: "bg-warning text-warning-foreground", High: "bg-destructive text-destructive-foreground" };
  const fraudColor = { Clear: "bg-success text-success-foreground", Suspicious: "bg-warning text-warning-foreground", Flagged: "bg-destructive text-destructive-foreground" };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">AI Credit Intelligence Overview</p>
        </div>
        <Select value={selectedUser.id} onValueChange={(v) => setSelectedUser(demoUsers.find((u) => u.id === v)!)}>
          <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>
            {demoUsers.map((u) => (
              <SelectItem key={u.id} value={u.id}>{u.fullName} ({u.id})</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Score + Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:row-span-2 flex flex-col items-center justify-center p-6 relative">
          <ScoreGauge score={selectedUser.creditScore} />
          <div className="flex gap-2 mt-8">
            <Badge className={riskColor[selectedUser.riskLevel]}>{selectedUser.riskLevel} Risk</Badge>
            <Badge className={fraudColor[selectedUser.fraudStatus]}>{selectedUser.fraudStatus}</Badge>
          </div>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Income</CardTitle>
            <IndianRupee className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{selectedUser.monthlyIncome.toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground mt-1">{selectedUser.employmentType}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Loan Eligibility</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{selectedUser.loanEligibilityAmount.toLocaleString("en-IN")}</p>
            <Badge variant="outline" className="mt-1">{selectedUser.loanDecision.status}</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Cash Flow</CardTitle>
            <BarChart3 className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{selectedUser.averageMonthlyCashFlow.toLocaleString("en-IN")}</p>
            <div className="flex gap-4 mt-1 text-xs">
              <span className="text-success flex items-center gap-1"><TrendingUp className="h-3 w-3" />₹{totalCredit.toLocaleString("en-IN")}</span>
              <span className="text-destructive flex items-center gap-1"><TrendingDown className="h-3 w-3" />₹{totalDebit.toLocaleString("en-IN")}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fraud Risk</CardTitle>
            {selectedUser.fraudRiskPercentage > 50 ? <AlertTriangle className="h-4 w-4 text-destructive" /> : <Shield className="h-4 w-4 text-success" />}
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{selectedUser.fraudRiskPercentage}%</p>
            <p className="text-xs text-muted-foreground mt-1">Repayment consistency: {selectedUser.repaymentConsistency}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Spending Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Spending Distribution</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} dataKey="value" paddingAngle={2}>
                    {categoryData.map((entry) => (
                      <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "hsl(var(--muted))"} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {categoryData.map((c) => (
                <div key={c.name} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: CATEGORY_COLORS[c.name] || "hsl(var(--muted))" }} />
                  {c.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Score Breakdown</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(selectedUser.transparency.featureImportance).map(([key, val]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{key}</span>
                  <span className="font-mono font-medium">{(val * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full gradient-primary transition-all duration-700" style={{ width: `${val * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
