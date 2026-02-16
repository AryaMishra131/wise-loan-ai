import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, MessageCircle, Phone, Mail } from "lucide-react";

const faqs = [
  { q: "What is a credit score?", a: "A credit score is a numerical representation (300-900) of your creditworthiness based on your financial behavior, transaction history, income stability, and repayment patterns." },
  { q: "How is my AI credit score calculated?", a: "Our AI engine analyzes your bank transactions, income stability, expense patterns, repayment history, and minimum balance maintenance using machine learning to generate a transparent, explainable score." },
  { q: "What does 'High Risk' mean?", a: "A High Risk rating indicates potential concerns in your financial profile such as irregular income, missed payments, low balances, or detected suspicious transaction patterns." },
  { q: "How can I improve my credit score?", a: "Maintain a minimum balance above ₹10,000, pay EMIs on time, reduce unnecessary expenses, avoid circular transactions, and maintain consistent income records." },
  { q: "What is fraud detection?", a: "Our AI fraud detection engine identifies suspicious patterns like circular transactions between linked accounts, unusual high-frequency transfers, and income mismatches that could indicate fraudulent activity." },
  { q: "Who can see my financial data?", a: "Your data is encrypted and only accessible to you. Guardian accounts can view student loan status and risk alerts, but not detailed transaction history." },
  { q: "What documents do I need for KYC?", a: "You need PAN Card, Aadhaar Card (masked), Salary Slip (if employed), and recent Bank Statement. If you don't have a PAN, Aadhaar verification will be used." },
];

export default function Help() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground text-sm">Frequently asked questions & support</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><HelpCircle className="h-5 w-5 text-primary" />FAQs</CardTitle></CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 flex flex-col items-center gap-3 text-center">
          <Phone className="h-6 w-6 text-primary" />
          <p className="font-medium text-sm">Call Support</p>
          <p className="text-xs text-muted-foreground">1800-123-4567</p>
        </Card>
        <Card className="p-5 flex flex-col items-center gap-3 text-center">
          <Mail className="h-6 w-6 text-primary" />
          <p className="font-medium text-sm">Email Support</p>
          <p className="text-xs text-muted-foreground">support@creditai.demo</p>
        </Card>
        <Card className="p-5 flex flex-col items-center gap-3 text-center">
          <MessageCircle className="h-6 w-6 text-primary" />
          <p className="font-medium text-sm">Live Chat</p>
          <p className="text-xs text-muted-foreground">Available 9 AM - 6 PM</p>
        </Card>
      </div>
    </div>
  );
}
