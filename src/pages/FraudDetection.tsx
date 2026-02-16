import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { demoUsers } from "@/lib/demoData";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

export default function FraudDetection() {
  const [selectedUser, setSelectedUser] = useState(demoUsers[2]); // Default to USR003 (fraud user)
  const fraudColor = { Clear: "bg-success text-success-foreground", Suspicious: "bg-warning text-warning-foreground", Flagged: "bg-destructive text-destructive-foreground" };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Fraud Detection</h1>
          <p className="text-muted-foreground text-sm">AI-powered behavioral pattern analysis</p>
        </div>
        <Select value={selectedUser.id} onValueChange={(v) => setSelectedUser(demoUsers.find((u) => u.id === v)!)}>
          <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>{demoUsers.map((u) => <SelectItem key={u.id} value={u.id}>{u.fullName}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 flex flex-col items-center gap-3">
          <div className={`h-16 w-16 rounded-full flex items-center justify-center ${selectedUser.fraudRiskPercentage > 50 ? "gradient-danger" : "gradient-success"}`}>
            {selectedUser.fraudRiskPercentage > 50 ? <AlertTriangle className="h-8 w-8 text-destructive-foreground" /> : <Shield className="h-8 w-8 text-success-foreground" />}
          </div>
          <p className="text-3xl font-bold font-mono">{selectedUser.fraudRiskPercentage}%</p>
          <p className="text-sm text-muted-foreground">Fraud Risk Score</p>
        </Card>
        <Card className="p-6 flex flex-col items-center gap-3">
          <Badge className={`${fraudColor[selectedUser.fraudStatus]} text-base px-4 py-1`}>{selectedUser.fraudStatus}</Badge>
          <p className="text-sm text-muted-foreground mt-2">Status</p>
        </Card>
        <Card className="p-6 flex flex-col items-center gap-3">
          <p className="text-3xl font-bold font-mono">{selectedUser.fraudDetails.patterns.length}</p>
          <p className="text-sm text-muted-foreground">Suspicious Patterns</p>
        </Card>
      </div>

      {selectedUser.fraudDetails.patterns.length > 0 && (
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />Detected Suspicious Patterns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedUser.fraudDetails.patterns.map((p, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg bg-destructive/5 border border-destructive/20 p-3">
                <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                <p className="text-sm">{p}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {selectedUser.fraudDetails.patterns.length === 0 && (
        <Card className="border-success/30">
          <CardContent className="flex items-center gap-3 p-6">
            <CheckCircle className="h-6 w-6 text-success" />
            <div>
              <p className="font-medium text-success">No Suspicious Patterns Detected</p>
              <p className="text-sm text-muted-foreground">All transactions appear legitimate for {selectedUser.fullName}.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
