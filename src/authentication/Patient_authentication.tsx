import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import {
  User,
  ArrowLeft,
  Calendar,
  Activity,
  Weight,
  Ruler,
  Stethoscope,
  MapPin,
  Lock,
} from "lucide-react";

export default function PatientAuthentication() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      toast.success("Account created! Welcome to your Health Portal.");
      setLoading(false);
      navigate("/dashboard/patient"); 
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border glass fixed top-0 w-full z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-teal-700 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-primary">PharmaGO Patient</span>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <main className="flex-1 pt-24 pb-12 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border shadow-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-teal-700">Patient Registration</CardTitle>
            <CardDescription>
              Enter your health details to set up your personalized dashboard.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              
              {/* Section 1: Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                  <User className="h-5 w-5 text-teal-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Appointment/Current Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="date" type="date" className="pl-10" required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Vitals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="25" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="flex items-center gap-1">
                    <Weight className="h-3 w-3" /> Weight (kg)
                  </Label>
                  <Input id="weight" type="number" placeholder="70" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="flex items-center gap-1">
                    <Ruler className="h-3 w-3" /> Height (cm)
                  </Label>
                  <Input id="height" type="number" placeholder="175" required />
                </div>
              </div>

              {/* Section 3: Medical Concerns */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                  <Stethoscope className="h-5 w-5 text-teal-600" />
                  Medical History
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="majorIssue">Major Issue</Label>
                    <Input id="majorIssue" placeholder="e.g. Chronic Hypertension, Diabetes" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minorIssue">Minor Issue / Symptoms</Label>
                    <Input id="minorIssue" placeholder="e.g. Seasonal allergies, Migraine" />
                  </div>
                  <div className="space-y-2">
                    <Label>Hospital Recommendation</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a preferred hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="City-Gen">City General Hospital</SelectItem>
                        <SelectItem value="Medanta">Medanta Hospital</SelectItem>
                        <SelectItem value="Metro-Health">Metro Health Institute</SelectItem>
                        <SelectItem value="Apollo">Apollo Specialty Clinic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Section 4: Consent and Security */}
              <div className="p-4 bg-muted/30 rounded-lg space-y-4 border border-teal-100">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I agree to the <span className="text-teal-600 underline cursor-pointer">Terms and Conditions</span>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="location" required />
                  <label htmlFor="location" className="text-sm font-medium leading-none flex items-center gap-1">
                    Allow Location Access <MapPin className="h-3 w-3" />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="pass">Create Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="pass" type="password" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm">Confirm Password</Label>
                    <Input id="confirm" type="password" required />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-teal-600 hover:bg-teal-700 transition-colors text-white shadow-lg"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}