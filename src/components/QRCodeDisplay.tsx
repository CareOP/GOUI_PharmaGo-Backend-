import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Clock, MapPin } from "lucide-react";

interface QRCodeDisplayProps {
  appointmentId: string;
  patientName: string;
  time: string;
  location: string;
}

export function QRCodeDisplay({ appointmentId, patientName, time, location }: QRCodeDisplayProps) {
  return (
    <Card className="border-2 border-primary/20 bg-card">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg">Check-in QR Code</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        {/* Simulated QR Code */}
        <div className="w-48 h-48 bg-foreground p-4 rounded-lg">
          <div className="w-full h-full bg-background rounded grid grid-cols-8 grid-rows-8 gap-0.5 p-2">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={`${
                  Math.random() > 0.5 ? "bg-foreground" : "bg-background"
                } ${
                  (i < 24 && i % 8 < 3) || (i < 24 && i % 8 > 4) || 
                  (i > 39 && i % 8 < 3) ? "bg-foreground" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center space-y-1">
          <p className="font-mono text-sm text-muted-foreground">{appointmentId}</p>
          <p className="font-semibold">{patientName}</p>
        </div>

        <div className="w-full space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
