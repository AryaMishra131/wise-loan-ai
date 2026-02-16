import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoUsers } from "@/lib/demoData";
import { CheckCircle, XCircle, IndianRupee, Calendar, Percent } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoanDecision() {
  const [selectedUser, setSelectedUser] = useState(demoUsers[0]);
  const loan = selectedUser.loanDecision;
  const { toast } = useToast();

  const schedule = loan.status === "Approved" ? Array.from({ length: Math.min(loan.tenureMonths, 12) }, (_, i) => ({
    month: i + 1,
    date: `2025-${String(i + 2).padStart(2, "0")}-01`,
    emi: loan.emiAmount,
    principal: Math.round(loan.emiAmount * 0.7),
    interest: Math.round(loan.emiAmount * 0.3),
    balance: loan.approvedAmount - Math.round(loan.emiAmount * 0.7 * (i + 1)),
    status: i < 2 ? "Paid" : i < 4 ? "Due" : "Upcoming"
  })) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Loan Decision</h1>
          <p className="text-muted-foreground text-sm">AI-driven loan eligibility & repayment plan</p>
        </div>
        <Select value={selectedUser.id} onValueChange={(v) => setSelectedUser(demoUsers.find((u) => u.id === v)!)}>
          <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>{demoUsers.map((u) => <SelectItem key={u.id} value={u.id}>{u.fullName}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <Card className={loan.status === "Approved" ? "border-success/30" : "border-destructive/30"}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            {loan.status === "Approved" ? <CheckCircle className="h-10 w-10 text-success" /> : <XCircle className="h-10 w-10 text-destructive" />}
            <div>
              <Badge className={loan.status === "Approved" ? "bg-success text-success-foreground text-base px-3 py-1" : "bg-destructive text-destructive-foreground text-base px-3 py-1"}>{loan.status}</Badge>
              <p className="text-sm text-muted-foreground mt-1">{loan.reason}</p>
            </div>
          </div>

          {loan.status === "Approved" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1"><p className="text-xs text-muted-foreground flex items-center gap-1"><IndianRupee className="h-3 w-3" />Approved Amount</p><p className="text-xl font-bold">₹{loan.approvedAmount.toLocaleString("en-IN")}</p></div>
              <div className="space-y-1"><p className="text-xs text-muted-foreground flex items-center gap-1"><Percent className="h-3 w-3" />Interest Rate</p><p className="text-xl font-bold">{loan.interestRate}%</p></div>
              <div className="space-y-1"><p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" />Tenure</p><p className="text-xl font-bold">{loan.tenureMonths} months</p></div>
              <div className="space-y-1"><p className="text-xs text-muted-foreground flex items-center gap-1"><IndianRupee className="h-3 w-3" />EMI Amount</p><p className="text-xl font-bold">₹{loan.emiAmount.toLocaleString("en-IN")}</p></div>
            </div>
          )}
        </CardContent>
      </Card>

      {loan.status === "Approved" && (
        <>
          <div className="flex gap-3">
            <Button className="gradient-primary" onClick={() => toast({ title: "Loan Confirmed!", description: "Your loan application has been submitted for processing." })}>
              Proceed with Loan
            </Button>
            <Button variant="outline">Download Schedule</Button>
          </div>

          <Card>
            <CardHeader><CardTitle className="text-base">Repayment Schedule (First 12 Months)</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead><TableHead>Date</TableHead><TableHead>EMI</TableHead><TableHead>Principal</TableHead><TableHead>Interest</TableHead><TableHead>Balance</TableHead><TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.map((r) => (
                    <TableRow key={r.month}>
                      <TableCell className="font-mono">{r.month}</TableCell>
                      <TableCell className="font-mono text-sm">{r.date}</TableCell>
                      <TableCell className="font-mono">₹{r.emi.toLocaleString("en-IN")}</TableCell>
                      <TableCell className="font-mono">₹{r.principal.toLocaleString("en-IN")}</TableCell>
                      <TableCell className="font-mono">₹{r.interest.toLocaleString("en-IN")}</TableCell>
                      <TableCell className="font-mono">₹{Math.max(0, r.balance).toLocaleString("en-IN")}</TableCell>
                      <TableCell><Badge variant="outline" className={r.status === "Paid" ? "text-success border-success/30" : r.status === "Due" ? "text-warning border-warning/30" : "text-muted-foreground"}>{r.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
