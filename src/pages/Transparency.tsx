import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { demoUsers } from "@/lib/demoData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react";

export default function Transparency() {
  const [selectedUser, setSelectedUser] = useState(demoUsers[0]);
  const t = selectedUser.transparency;
  const chartData = Object.entries(t.featureImportance).map(([name, value]) => ({ name, value: +(value * 100).toFixed(0) }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI Explainability</h1>
          <p className="text-muted-foreground text-sm">SHAP-style transparency — understand what drives your score</p>
        </div>
        <Select value={selectedUser.id} onValueChange={(v) => setSelectedUser(demoUsers.find((u) => u.id === v)!)}>
          <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>{demoUsers.map((u) => <SelectItem key={u.id} value={u.id}>{u.fullName}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-success/30">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><ThumbsUp className="h-5 w-5 text-success" />Top Positive Factors</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {t.positiveFactors.map((f, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-success/5 border border-success/20 p-3">
                <div className="h-6 w-6 rounded-full bg-success/20 flex items-center justify-center text-success text-xs font-bold">{i + 1}</div>
                <p className="text-sm">{f}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><ThumbsDown className="h-5 w-5 text-destructive" />Top Negative Factors</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {t.negativeFactors.map((f, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-destructive/5 border border-destructive/20 p-3">
                <div className="h-6 w-6 rounded-full bg-destructive/20 flex items-center justify-center text-destructive text-xs font-bold">{i + 1}</div>
                <p className="text-sm">{f}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Feature Importance (SHAP Values)</CardTitle></CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" domain={[0, 50]} unit="%" className="text-xs" />
                <YAxis type="category" dataKey="name" width={130} className="text-xs" />
                <Tooltip formatter={(v: number) => `${v}%`} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/30">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Lightbulb className="h-5 w-5 text-warning" />Score Improvement Suggestions</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {t.suggestions.map((s, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg bg-accent p-3">
              <Lightbulb className="h-4 w-4 text-warning mt-0.5 shrink-0" />
              <p className="text-sm">{s}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
