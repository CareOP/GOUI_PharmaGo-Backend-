import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import {
  Building2,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  FileBadge,
  ShieldCheck,
  PlusCircle,
} from "lucide-react";

export default function HospitalRegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API Call for tie-up registration
    setTimeout(() => {
      toast.success("Registration successful! You can now log in to your staff portal.");
      setLoading(false);
      
      // Redirecting specifically to the Institution Login Page
      navigate("/login/institution"); 
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border glass fixed top-0 w-full z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-admin flex items-center justify-center">
                <Building2 className="h-5 w-5 text-admin-foreground" />
              </div>
              <span className="font-bold text-xl text-primary">PharmaGO Tie-up</span>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Registration Form */}
      <main className="flex-1 pt-24 pb-12 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <PlusCircle className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">HCIA Registration</CardTitle>
            <p className="text-sm font-medium text-muted-foreground">
              HCIA is a formal partnership program with the PharmaGO Healthcare Network.
            </p>
            <CardDescription>
              Complete the form below to initiate a formal tie-up.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              
              {/* Section 1: Institutional Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Institutional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hospitalName">Hospital/Clinic Name</Label>
                    <Input id="hospitalName" placeholder="City General Hospital" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">Medical License Number</Label>
                    <div className="relative">
                      <FileBadge className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="license" className="pl-10" placeholder="HOSP-12345-XY" required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Contact & Verification
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Official Admin Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="adminEmail" type="email" className="pl-10" placeholder="admin@hospital.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" type="tel" className="pl-10" placeholder="+1 (555) 000-0000" required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Security */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-4 border">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Initial Admin Credentials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pass">Create Portal Password</Label>
                    <Input id="pass" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPass">Confirm Password</Label>
                    <Input id="confirmPass" type="password" required />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg gradient-primary text-primary-foreground"
                disabled={loading}
              >
                {loading ? "Processing Tie-up..." : "Submit Tie-up Request"}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground px-6">
                  By submitting this form, you agree to PharmaGO's Institutional Terms of Service.
                </p>
                <p className="text-sm text-muted-foreground">
                  Already registered?{" "}
                  <Link to="/login/institution" className="text-primary hover:underline font-medium">
                    Sign in to Portal
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div >
  );
}