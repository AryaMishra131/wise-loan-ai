import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoUsers } from "@/lib/demoData";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function Repayment() {
  const [selectedUser, setSelectedUser] = useState(demoUsers[0]);
  const loan = selectedUser.loanDecision;

  const schedule = loan.status === "Approved" ? Array.from({ length: 6 }, (_, i) => ({
    month: i + 1, date: `2025-${String(i + 2).padStart(2, "0")}-01`,
    emi: loan.emiAmount, status: i < 2 ? "Paid" : i === 2 ? "Due" : i === 3 ? "Overdue" : "Upcoming"
  })) : [];

  const statusIcon = { Paid: <CheckCircle className="h-4 w-4 text-success" />, Due: <Clock className="h-4 w-4 text-warning" />, Overdue: <AlertTriangle className="h-4 w-4 text-destructive" />, Upcoming: <Clock className="h-4 w-4 text-muted-foreground" /> };
  const statusBadge = { Paid: "bg-success/10 text-success border-success/20", Due: "bg-warning/10 text-warning border-warning/20", Overdue: "bg-destructive/10 text-destructive border-destructive/20", Upcoming: "" };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Repayment Monitoring</h1>
          <p className="text-muted-foreground text-sm">Track EMI payments & smart alerts</p>
        </div>
        <Select value={selectedUser.id} onValueChange={(v) => setSelectedUser(demoUsers.find((u) => u.id === v)!)}>
          <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>{demoUsers.map((u) => <SelectItem key={u.id} value={u.id}>{u.fullName}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      {loan.status !== "Approved" ? (
        <Card className="p-8 text-center"><p className="text-muted-foreground">No active loan for this user.</p></Card>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="p-4"><p className="text-xs text-muted-foreground">EMI Amount</p><p className="text-xl font-bold">₹{loan.emiAmount.toLocaleString("en-IN")}</p></Card>
            <Card className="p-4"><p className="text-xs text-muted-foreground">Paid</p><p className="text-xl font-bold text-success">2</p></Card>
            <Card className="p-4"><p className="text-xs text-muted-foreground">Overdue</p><p className="text-xl font-bold text-destructive">1</p></Card>
            <Card className="p-4"><p className="text-xs text-muted-foreground">Remaining</p><p className="text-xl font-bold">{loan.tenureMonths - 2}</p></Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="text-base">Payment Schedule</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>#</TableHead><TableHead>Due Date</TableHead><TableHead>EMI</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {schedule.map((r) => (
                    <TableRow key={r.month}>
                      <TableCell className="font-mono">{r.month}</TableCell>
                      <TableCell className="font-mono text-sm">{r.date}</TableCell>
                      <TableCell className="font-mono">₹{r.emi.toLocaleString("en-IN")}</TableCell>
                      <TableCell><div className="flex items-center gap-2">{statusIcon[r.status as keyof typeof statusIcon]}<Badge variant="outline" className={statusBadge[r.status as keyof typeof statusBadge]}>{r.status}</Badge></div></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {schedule.some((r) => r.status === "Overdue") && (
            <Card className="border-destructive/30">
              <CardContent className="flex items-start gap-3 p-4">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-medium text-destructive">Overdue Payment Alert</p>
                  <p className="text-sm text-muted-foreground">A penalty may apply. Notifications sent to student and guardian.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
