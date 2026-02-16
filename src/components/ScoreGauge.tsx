import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  size?: number;
  label?: string;
}

export default function ScoreGauge({ score, size = 200, label = "Credit Score" }: ScoreGaugeProps) {
  const normalized = Math.max(0, Math.min(1, (score - 300) / 600));
  const circumference = 2 * Math.PI * 45;
  const offset = circumference * (1 - normalized * 0.75);

  const getColor = () => {
    if (score >= 750) return "hsl(var(--success))";
    if (score >= 650) return "hsl(var(--chart-3))";
    return "hsl(var(--destructive))";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-[135deg]">
        <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={circumference * 0.25} strokeLinecap="round" />
        <circle
          cx="50" cy="50" r="45" fill="none" stroke={getColor()} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="animate-score-fill transition-all duration-1000"
          style={{ "--score-offset": offset } as React.CSSProperties}
        />
      </svg>
      <div className="absolute flex flex-col items-center mt-12">
        <span className="text-4xl font-bold font-mono" style={{ color: getColor() }}>{score}</span>
        <span className="text-xs text-muted-foreground mt-1">{label}</span>
        <span className="text-xs text-muted-foreground">out of 900</span>
      </div>
    </div>
  );
}
