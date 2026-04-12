import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  ShieldCheck, 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Fingerprint,
  Activity
} from "lucide-react";

export default function AdminLoginPage() {
  const navigate = useNavigate(); // Initialize navigation
  const { loginWithRedirect, isLoading } = useAuth0();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState("Medanta");
  const [selectedRole, setSelectedRole] = useState("staff");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSSOLogin = () => {
    loginWithRedirect({
      authorizationParams: { connection: 'google-oauth2', prompt: 'select_account' },
      appState: { returnTo: "/admin" }
    });
  };

  const simulateLogin = () => {
    setIsVerifying(true);
    
    // Simulating auto-detection logic
    setTimeout(() => {
      setIsVerifying(false);
      
      switch(selectedRole) {
        case 'doctor':
          navigate("/doctor");
          break;
        case 'pharmacy':
          navigate("/pharmacy");
          break;
        case 'admin':
          navigate("/admin");
          break;
        default:
          toast.error("Role not recognized. Please contact SysAdmin.");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-slate-50 flex flex-col font-sans selection:bg-teal-500/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Enterprise Navbar */}
      <header className="border-b border-slate-800 bg-[#020817]/60 backdrop-blur-xl fixed top-0 w-full z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-teal-500/20 p-2 rounded-lg border border-teal-500/30">
                <Activity className="h-5 w-5 text-teal-400" />
              </div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                {selectedHospital} <span className="text-teal-400 font-medium">Staff Authentication</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link to="/" className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
                <span className="hidden sm:inline">Exit Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 pt-24 relative z-10">
        <Card className="w-full max-w-[440px] bg-slate-900/40 border-slate-800 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Top Status Bar */}
          <div className="h-1 w-full bg-slate-800 overflow-hidden">
             {isVerifying && <div className="h-full bg-teal-400 animate-progress w-full" />}
          </div>

          <CardHeader className="text-center pt-10 pb-6 space-y-2">
            <div className="mx-auto w-20 h-20 bg-teal-500/5 rounded-3xl flex items-center justify-center mb-4 border border-teal-500/20 shadow-inner">
               <Fingerprint className="h-10 w-10 text-teal-400" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              {selectedHospital} Portal
            </CardTitle>
            <CardDescription className="text-slate-400 font-medium tracking-wide text-xs uppercase">
              Secure Medical Personnel Authentication
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-10 pb-10">
            {/* Selection Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] ml-1">Facility</Label>
                <Select onValueChange={(value) => setSelectedHospital(value)} defaultValue="Medanta">
                  <SelectTrigger className="bg-slate-950/50 border-slate-700 h-10 text-slate-200 focus:ring-teal-500/50 transition-all text-xs">
                    <SelectValue placeholder="Facility" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                    <SelectItem value="Medanta">Medanta</SelectItem>
                    <SelectItem value="Apollo">Apollo</SelectItem>
                    <SelectItem value="Max">Max Health</SelectItem>
                    <SelectItem value="Fortis">Fortis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] ml-1">Role</Label>
                <Select onValueChange={(value) => setSelectedRole(value)} defaultValue="staff">
                  <SelectTrigger className="bg-slate-950/50 border-slate-700 h-10 text-slate-200 focus:ring-teal-500/50 transition-all text-xs">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="admin">System Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Input Group */}
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] ml-1">Official ID / Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                  <Input 
                    placeholder="staff_id@pharma-go.com" 
                    className="bg-slate-950/50 border-slate-700 h-12 pl-12 focus-visible:ring-teal-500/50 text-slate-200 placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] ml-1">Security Token</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    className="bg-slate-950/50 border-slate-700 h-12 pl-12 pr-12 focus-visible:ring-teal-500/50 text-slate-200"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Action Group */}
            <div className="space-y-3 pt-4">
              <Button 
                onClick={simulateLogin}
                disabled={isVerifying}
                className="w-full h-12 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold tracking-tight transition-all rounded-lg shadow-lg shadow-teal-500/20 active:scale-[0.98]"
              >
                {isVerifying ? "Verifying Access..." : "Access Staff Console"}
              </Button>

              <div className="flex items-center gap-4 py-2">
                <div className="h-[1px] flex-1 bg-slate-800" />
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Institutional SSO</span>
                <div className="h-[1px] flex-1 bg-slate-800" />
              </div>

              <Button 
                variant="outline" 
                onClick={handleSSOLogin}
                disabled={isLoading}
                className="w-full h-12 border-slate-700 hover:bg-slate-800 text-slate-300 gap-3 font-medium transition-all"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#5eead4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#2dd4bf"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#14b8a6"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#0d9488"/>
                </svg>
                Sign in with Hospital Workspace
              </Button>
            </div>
          </CardContent>

          {/* Compliance Footer */}
          <div className="bg-slate-950/50 p-6 border-t border-slate-800 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShieldCheck className="h-3 w-3 text-teal-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">HIPAA & GDPR Compliant</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed px-2">
              Unauthorized access to protected health information (PHI) is strictly monitored. 
              <span className="text-teal-500/80 cursor-pointer block mt-1 hover:underline">View Access Policy</span>
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}