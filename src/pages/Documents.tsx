import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const documents = [
  { type: "PAN Card", status: "Uploaded", icon: FileText },
  { type: "Aadhaar Card", status: "Uploaded", icon: FileText },
  { type: "Salary Slip", status: "Pending", icon: FileText },
  { type: "Bank Statement", status: "Uploaded", icon: FileText },
];

export default function Documents() {
  const { toast } = useToast();
  const statusStyle = { Uploaded: "bg-success/10 text-success border-success/20", Pending: "bg-warning/10 text-warning border-warning/20", Verified: "bg-primary/10 text-primary border-primary/20" };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">KYC Documents</h1>
        <p className="text-muted-foreground text-sm">Upload & verify identity documents</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <Card key={doc.type} className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                  <doc.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">{doc.type}</p>
                  <Badge variant="outline" className={`mt-1 text-xs ${statusStyle[doc.status as keyof typeof statusStyle]}`}>
                    {doc.status === "Uploaded" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {doc.status === "Pending" && <Clock className="h-3 w-3 mr-1" />}
                    {doc.status}
                  </Badge>
                </div>
              </div>
              <Button size="sm" variant={doc.status === "Pending" ? "default" : "outline"} className={doc.status === "Pending" ? "gradient-primary" : ""}
                onClick={() => toast({ title: `${doc.type}`, description: "Document upload simulated for demo" })}>
                <Upload className="h-4 w-4 mr-1" />{doc.status === "Pending" ? "Upload" : "Re-upload"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Accepted Formats</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Badge variant="outline">PDF</Badge>Documents & statements</div>
            <div className="flex items-center gap-2"><Badge variant="outline">JPG</Badge>Scanned copies</div>
            <div className="flex items-center gap-2"><Badge variant="outline">PNG</Badge>Screenshots</div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Maximum file size: 5MB per document</p>
        </CardContent>
      </Card>
    </div>
  );
}
