import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, Stethoscope, QrCode } from "lucide-react";

interface AppointmentCardProps {
  patientName: string;
  doctor: string;
  time: string;
  type: string;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  showQR?: boolean;
  onViewDetails?: () => void;
}

const statusStyles = {
  pending: "bg-muted text-muted-foreground",
  confirmed: "bg-patient-muted text-patient border-patient/20",
  "in-progress": "bg-doctor-muted text-doctor border-doctor/20",
  completed: "bg-accent text-accent-foreground",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export function AppointmentCard({
  patientName,
  doctor,
  time,
  type,
  status,
  showQR = false,
  onViewDetails,
}: AppointmentCardProps) {
  return (
    <Card className="border transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{patientName}</p>
                  <p className="text-sm text-muted-foreground">{type}</p>
                </div>
              </div>
              <Badge variant="outline" className={cn("capitalize", statusStyles[status])}>
                {status.replace("-", " ")}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Stethoscope className="h-4 w-4" />
                <span>{doctor}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" onClick={onViewDetails}>
                View Details
              </Button>
              {showQR && (
                <Button size="sm" variant="outline" className="gap-1.5">
                  <QrCode className="h-4 w-4" />
                  Check-in QR
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
