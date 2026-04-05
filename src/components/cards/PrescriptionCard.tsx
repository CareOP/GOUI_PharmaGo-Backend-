import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill, Calendar, User, Package } from "lucide-react";

interface PrescriptionCardProps {
  id: string;
  patientName: string;
  doctor: string;
  date: string;
  medications: string[];
  status: "pending" | "processing" | "ready" | "dispensed";
  onFulfill?: () => void;
}

const statusStyles = {
  pending: "bg-muted text-muted-foreground",
  processing: "bg-patient-muted text-patient border-patient/20",
  ready: "bg-doctor-muted text-doctor border-doctor/20",
  dispensed: "bg-accent text-accent-foreground",
};

export function PrescriptionCard({
  id,
  patientName,
  doctor,
  date,
  medications,
  status,
  onFulfill,
}: PrescriptionCardProps) {
  return (
    <Card className="border transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-pharmacy/10 flex items-center justify-center">
                <Pill className="h-5 w-5 text-pharmacy" />
              </div>
              <div>
                <p className="font-semibold">{id}</p>
                <p className="text-sm text-muted-foreground">{patientName}</p>
              </div>
            </div>
            <Badge variant="outline" className={cn("capitalize", statusStyles[status])}>
              {status}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>{doctor}</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Medications:</p>
            <div className="flex flex-wrap gap-2">
              {medications.map((med, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {med}
                </Badge>
              ))}
            </div>
          </div>

          {(status === "pending" || status === "processing") && (
            <Button onClick={onFulfill} className="w-full gap-2 bg-pharmacy text-pharmacy-foreground hover:bg-pharmacy/90">
              <Package className="h-4 w-4" />
              {status === "pending" ? "Process Order" : "Mark Ready"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
