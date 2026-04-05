import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "patient" | "doctor" | "admin" | "pharmacy";
  className?: string;
}

const variantStyles = {
  default: "bg-card",
  patient: "bg-patient-muted border-patient/20",
  doctor: "bg-doctor-muted border-doctor/20",
  admin: "bg-admin-muted border-admin/20",
  pharmacy: "bg-pharmacy-muted border-pharmacy/20",
};

const iconStyles = {
  default: "bg-primary/10 text-primary",
  patient: "bg-patient/10 text-patient",
  doctor: "bg-doctor/10 text-doctor",
  admin: "bg-admin/10 text-admin",
  pharmacy: "bg-pharmacy/10 text-pharmacy",
};

export function StatCard({ title, value, icon, trend, variant = "default", className }: StatCardProps) {
  return (
    <Card className={cn("border transition-all hover:shadow-md", variantStyles[variant], className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {trend && (
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                trend.isPositive ? "text-doctor" : "text-destructive"
              )}>
                {trend.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{trend.value}%</span>
                <span className="text-muted-foreground font-normal">vs last week</span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-lg", iconStyles[variant])}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
