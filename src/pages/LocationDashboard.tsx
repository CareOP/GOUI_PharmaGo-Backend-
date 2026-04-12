import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  MapPin,
  Navigation,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  Clock,
  CircleDollarSign,
  ArrowLeft,
  Hospital
} from "lucide-react";

const HOSPITALS_DATA = [
  {
    id: 1,
    name: "Apollo Hospital",
    logo: "A",
    distance: 2.4,
    reviews: 4.8,
    capacity: "High",
    availability: "Available Now",
    charges: "$25",
    doctors: "12 Specialists on duty"
  },
  {
    id: 2,
    name: "City Care Center",
    logo: "C",
    distance: 5.8,
    reviews: 4.5,
    capacity: "Medium",
    availability: "Wait time: 20m",
    charges: "$15",
    doctors: "5 Specialists on duty"
  },
];

export default function HospitalDiscoveryPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const navigate = useNavigate(); // 2. Initialize the hook
  const userLocation = "Sector 62, Noida, UP"; 

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/login/patient">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full">
              <MapPin className="h-4 w-4 text-teal-600" />
              <span className="truncate max-w-[150px] md:max-w-full">{userLocation}</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto p-4 max-w-2xl space-y-4">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-xl font-bold">Hospitals Nearby</h2>
          <span className="text-xs text-muted-foreground">Radius: 50km</span>
        </div>

        {HOSPITALS_DATA.map((hospital) => (
          <Card key={hospital.id} className="overflow-hidden border-border transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="flex items-center p-4 gap-4">
                <div className="flex flex-col items-center justify-center bg-teal-500/10 border border-teal-500/20 rounded-xl p-3 min-w-[80px]">
                  <Navigation className="h-5 w-5 text-teal-600 mb-1" />
                  <span className="text-xs font-bold text-teal-600">{hospital.distance} mi</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-teal-500/20 flex items-center justify-center text-[10px] font-bold text-teal-600">
                      {hospital.logo}
                    </div>
                    <h3 className="font-semibold text-lg truncate">{hospital.name}</h3>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {hospital.reviews}
                    </span>
                    <span>•</span>
                    <span className={hospital.availability.includes("Now") ? "text-emerald-500 font-medium" : ""}>
                      {hospital.availability}
                    </span>
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setExpandedId(expandedId === hospital.id ? null : hospital.id)}
                >
                  {expandedId === hospital.id ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>

              {expandedId === hospital.id && (
                <div className="px-4 pb-4 pt-2 border-t border-border bg-secondary/20 grid grid-cols-2 gap-3">
                  <DetailItem icon={<Users className="h-4 w-4" />} label="Capacity" value={hospital.capacity} />
                  <DetailItem icon={<Clock className="h-4 w-4" />} label="Doctors" value={hospital.doctors} />
                  <DetailItem icon={<CircleDollarSign className="h-4 w-4" />} label="Checkup Fee" value={hospital.charges} />
                  <DetailItem icon={<Hospital className="h-4 w-4" />} label="Facility" value="Multi-specialty" />
                  
                  {/* 3. Corrected Navigation Logic */}
                  <Button 
                    className="col-span-2 mt-2 bg-teal-600 hover:bg-teal-700 text-white"
                    onClick={() => navigate("/authentication/Patient_authentication", { state: { hospitalName: hospital.name } })}
                  >
                    Fill Registration Form
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex flex-col gap-1 p-2 bg-background rounded border border-border">
      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
        {icon}
        {label}
      </div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}