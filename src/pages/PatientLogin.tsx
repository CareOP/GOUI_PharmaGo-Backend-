import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import {
  Users,
  ArrowLeft,
  Mail,
  MapPin,
  ShieldCheck,
  HeartPulse,
  ChevronRight,
  Globe
} from "lucide-react";

export default function PatientLoginPage() {
  const { loginWithRedirect, isLoading } = useAuth0();
  const [identifier, setIdentifier] = useState("");
  const [locationAccepted, setLocationAccepted] = useState(false);
  const navigate = useNavigate();

  const handlePatientSSO = () => {
    if (!locationAccepted) {
      toast.error("Security Protocol: Please confirm location consent first.");
      return;
    }
    
    loginWithRedirect({
      authorizationParams: { 
        connection: 'google-oauth2', 
        prompt: 'select_account' 
      },
      appState: { returnTo: "/locationdashboard" }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020817] text-slate-900 dark:text-slate-50 flex flex-col font-sans transition-colors duration-500">
      {/* Decorative Background for Trust-Building */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-teal-500/5 dark:bg-teal-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[5%] left-[-5%] w-[25%] h-[25%] bg-blue-500/5 dark:bg-blue-600/10 blur-[100px] rounded-full" />
      </div>

      {/* Modern Patient Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#020817]/80 backdrop-blur-xl fixed top-0 w-full z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-teal-500 p-2 rounded-xl shadow-lg shadow-teal-500/20">
                <HeartPulse className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">
                PharmaGO <span className="text-teal-600 dark:text-teal-400 font-medium">Patient</span>
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400">
                  <ArrowLeft className="h-4 w-4" /> Exit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 pt-24 relative z-10">
        <Card className="w-full max-w-[440px] bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-2xl backdrop-blur-sm overflow-hidden rounded-3xl">
          {/* Subtle Progress Bar */}
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800">
             {isLoading && <div className="h-full bg-teal-500 animate-pulse w-full" />}
          </div>

          <CardHeader className="text-center pt-10 pb-6 space-y-2">
            <div className="mx-auto w-16 h-16 bg-teal-50 dark:bg-teal-500/10 rounded-2xl flex items-center justify-center mb-4 border border-teal-100 dark:border-teal-500/20">
               <Users className="h-8 w-8 text-teal-600 dark:text-teal-400" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Patient Portal
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Access AI assessments & nearby care
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-8 pb-10">
            {/* Main Action Area */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                  Verified Contact
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                  <Input 
                    id="contact" 
                    placeholder="Email or phone number" 
                    className="h-12 pl-12 bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500/50 rounded-xl"
                    value={identifier} 
                    onChange={(e) => setIdentifier(e.target.value)} 
                  />
                </div>
              </div>

              {/* Enhanced SSO Button */}
              <Button 
                onClick={handlePatientSSO}
                disabled={isLoading}
                className="w-full h-14 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white font-bold text-lg rounded-2xl shadow-xl shadow-teal-500/20 transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" opacity="0.8"/>
                </svg>
                {isLoading ? "Synchronizing..." : "Continue with Google"}
              </Button>
            </div>

            {/* Separator */}
            <div className="relative flex items-center gap-4 py-2">
              <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Security Verification</span>
              <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Location Consent Area */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 ${
              locationAccepted 
              ? "bg-teal-50/50 dark:bg-teal-500/5 border-teal-200 dark:border-teal-500/30" 
              : "bg-slate-50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800"
            }`}>
              <div className="flex items-start gap-4">
                <Checkbox 
                  id="location-confirm" 
                  checked={locationAccepted}
                  onCheckedChange={(checked) => setLocationAccepted(checked as boolean)}
                  className="mt-1 w-5 h-5 rounded-md border-slate-300 dark:border-slate-600 data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                />
                <div className="space-y-1">
                  <label htmlFor="location-confirm" className="text-sm font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
                    Enable Location Awareness
                  </label>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                    Strictly used to find pharmacies and ERs within your immediate proximity.
                  </p>
                </div>
              </div>
            </div>

            {/* Manual Entry or Footer */}
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3 w-3 text-teal-500" />
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">End-to-End Encrypted</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <Globe className="h-3 w-3 text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Global Privacy</span>
               </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="py-8 text-center">
        <p className="text-[11px] text-slate-400 dark:text-slate-600 font-medium tracking-wide">
          © 2026 PharmaGO Health Ecosystem • HIPAA Compliant Environment
        </p>
      </footer>
    </div>
  );
}