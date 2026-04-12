import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";

interface QRCodeDisplayProps {
  appointmentId: string;
  patientName: string;
  time: string;
  location: string;
}

export function QRCodeDisplay({ appointmentId, patientName, time, location }: QRCodeDisplayProps) {
  const [qrBlobUrl, setQrBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQR() {
      const response = await fetch("http://localhost:8000/generate-checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId, patientName, time, location }),
      });
      
      if (response.ok) {
        const blob = await response.blob();
        setQrBlobUrl(URL.createObjectURL(blob));
      }
    }
    fetchQR();
  }, [appointmentId]);

  return (
    <Card className="border-2 border-primary/20 bg-card">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg">Check-in QR Code</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        
        {/* Real QR Code from Backend */}
        <div className="w-48 h-48 bg-white p-2 rounded-lg flex items-center justify-center border">
          {qrBlobUrl ? (
            <img src={qrBlobUrl} alt="Check-in QR" className="w-full h-full" />
          ) : (
            <div className="animate-pulse bg-slate-200 w-full h-full rounded" />
          )}
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