import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { demoUsers } from "@/lib/demoData";
import { Users, AlertTriangle, CheckCircle, IndianRupee, Shield } from "lucide-react";

export default function Guardian() {
  const studentUsers = demoUsers.filter((u) => u.employmentType === "Student");
  const [selectedUser, setSelectedUser] = useState(studentUsers[0]);
  const loan = selectedUser.loanDecision;
  const riskColor = { Low: "bg-success text-success-foreground", Medium: "bg-warning text-warning-foreground", High: "bg-destructive text-destructive-foreground" };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Guardian Panel</h1>
          <p className="text-muted-foreground text-sm">Monitor student loan status & risk alerts</p>
        </div>
        <Select value={selectedUser.id} onValueChange={(v) => setSelectedUser(studentUsers.find((u) => u.id === v)!)}>
          <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>{studentUsers.map((u) => <SelectItem key={u.id} value={u.id}>{u.fullName}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center"><Users className="h-6 w-6 text-primary-foreground" /></div>
          <div>
            <p className="font-medium">{selectedUser.fullName}</p>
            <p className="text-sm text-muted-foreground">Student • Score: {selectedUser.creditScore}</p>
          </div>
          <Badge className={`ml-auto ${riskColor[selectedUser.riskLevel]}`}>{selectedUser.riskLevel} Risk</Badge>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2"><IndianRupee className="h-4 w-4 text-primary" /><p className="text-xs text-muted-foreground">Loan Status</p></div>
          <Badge className={loan.status === "Approved" ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>{loan.status}</Badge>
          {loan.status === "Approved" && <p className="text-lg font-bold mt-2">₹{loan.approvedAmount.toLocaleString("en-IN")}</p>}
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2"><Shield className="h-4 w-4 text-primary" /><p className="text-xs text-muted-foreground">Fraud Risk</p></div>
          <p className="text-2xl font-bold">{selectedUser.fraudRiskPercentage}%</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2"><CheckCircle className="h-4 w-4 text-primary" /><p className="text-xs text-muted-foreground">Repayment Rate</p></div>
          <p className="text-2xl font-bold">{selectedUser.repaymentConsistency}%</p>
        </Card>
      </div>

      {selectedUser.fraudRiskPercentage > 50 && (
        <Card className="border-destructive/30">
          <CardContent className="flex items-start gap-3 p-4">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
            <div>
              <p className="font-medium text-destructive">High Risk Alert</p>
              <p className="text-sm text-muted-foreground">Suspicious activity detected for {selectedUser.fullName}. Review fraud detection panel for details.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
