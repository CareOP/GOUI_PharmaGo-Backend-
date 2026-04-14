import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import { 
  ShieldAlert, 
  ArrowLeft, 
  Mail, 
  Lock, 
  Building2, 
  Fingerprint, 
  Terminal,
  Cpu,
  Globe
} from "lucide-react";

export default function AdminLoginPage() {
  const { loginWithRedirect, isLoading } = useAuth0();
  const [adminId, setAdminId] = useState("");
  const [systemStatus, setSystemStatus] = useState("Operational");

  // Dynamic system status effect for "Professional" feel
  useEffect(() => {
    const statuses = ["Operational", "Secure", "Encrypted", "Verified"];
    const interval = setInterval(() => {
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAdminSSO = () => {
    loginWithRedirect({
      authorizationParams: { connection: 'google-oauth2', prompt: 'select_account' },
      appState: { returnTo: "/admin/dashboard" }
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 flex flex-col font-sans selection:bg-indigo-500/30">
      {/* Animated Background Mesh */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
      </div>

      {/* Admin Header */}
      <header className="border-b border-slate-800 bg-[#020617]/80 backdrop-blur-xl fixed top-0 w-full z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 p-2.5 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                <ShieldAlert className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl tracking-tighter leading-none">PharmaGO</h1>
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em] mt-1">Central Admin Command</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">System: {systemStatus}</span>
              </div>
              <ThemeToggle />
              <Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-medium">
                <ArrowLeft className="h-4 w-4" /> Exit
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 relative z-10 pt-24">
        <Card className="w-full max-w-[460px] bg-slate-900/40 border-slate-800 backdrop-blur-2xl shadow-2xl overflow-hidden ring-1 ring-white/5">
          {/* Progress bar for "Processing" feel */}
          <div className="h-1 w-full bg-slate-800">
            {isLoading && <div className="h-full bg-indigo-500 animate-infinite-scroll w-full" />}
          </div>

          <CardHeader className="text-center pt-12 pb-8 px-10">
            <div className="mx-auto w-20 h-20 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center mb-6 border border-slate-700 shadow-2xl">
               <Fingerprint className="h-10 w-10 text-indigo-400" />
            </div>
            <CardTitle className="text-3xl font-black tracking-tighter text-white mb-2">
              Admin Gateway
            </CardTitle>
            <CardDescription className="text-slate-400 text-sm font-medium">
              Enterprise management and hospital-wide resource control.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 px-10 pb-12">
            {/* Quick Status Bar */}
            <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-800/50">
              {[
                { label: "Uptime", val: "99.9%", icon: Cpu },
                { label: "Region", val: "IN-WEST", icon: Globe },
                { label: "Protocol", val: "v2.4", icon: Terminal },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <stat.icon className="h-3 w-3 text-indigo-500" />
                  <span className="text-[9px] text-slate-500 font-bold uppercase">{stat.label}</span>
                  <span className="text-[10px] text-slate-300 font-mono">{stat.val}</span>
                </div>
              ))}
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Admin Credentials</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  <Input 
                    type="email" 
                    placeholder="root_admin@pharmago.com" 
                    className="bg-slate-950/50 border-slate-700 h-14 pl-12 focus-visible:ring-indigo-500/50 text-slate-200"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={handleAdminSSO}
                  disabled={isLoading}
                  className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg tracking-tight rounded-xl transition-all shadow-[0_10px_30px_rgba(79,70,229,0.3)] active:scale-95 flex gap-3"
                >
                  <Lock className="h-5 w-5" />
                  {isLoading ? "Validating..." : "Initiate Secure Entry"}
                </Button>
6y

                <div className="relative py-2 flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-slate-800" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">or use gateway provider</span>
                  <div className="h-[1px] flex-1 bg-slate-800" />
                </div>

                <Button 
                  variant="outline" 
                  className="w-full h-12 border-slate-700 bg-transparent hover:bg-slate-800 text-slate-300 gap-3 font-semibold transition-all rounded-xl"
                  onClick={() => toast.info("Contact SysAdmin for manual overrides.")}
                >
                  <Building2 className="h-4 w-4" />
                  Request Emergency Access
                </Button>
              </div>
            </div>

            <div className="pt-4 text-center">
              <p className="text-[10px] text-slate-500 leading-relaxed max-w-[280px] mx-auto">
                Authorized access only. All actions are logged under 
                <span className="text-indigo-400 font-bold px-1 italic">AES-256</span> 
                standards.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer Branding */}
      <footer className="py-8 text-center border-t border-slate-900/50">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.4em]">
          PharmaGO Network • Internal Admin Node
        </p>
      </footer>
    </div>
  );
}