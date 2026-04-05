import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import {
  Activity,
  Users,
  Stethoscope,
  Building2,
  Pill,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  { id: "patient", label: "Patient", icon: <Users className="h-5 w-5" />, color: "patient", path: "/patient" },
  { id: "doctor", label: "Doctor", icon: <Stethoscope className="h-5 w-5" />, color: "doctor", path: "/doctor" },
  { id: "admin", label: "Admin", icon: <Building2 className="h-5 w-5" />, color: "admin", path: "/admin" },
  { id: "pharmacy", label: "Pharmacy", icon: <Pill className="h-5 w-5" />, color: "pharmacy", path: "/pharmacy" },
];

const roleStyles = {
  patient: "border-patient bg-patient-muted hover:bg-patient hover:text-patient-foreground",
  doctor: "border-doctor bg-doctor-muted hover:bg-doctor hover:text-doctor-foreground",
  admin: "border-admin bg-admin-muted hover:bg-admin hover:text-admin-foreground",
  pharmacy: "border-pharmacy bg-pharmacy-muted hover:bg-pharmacy hover:text-pharmacy-foreground",
};

const activeRoleStyles = {
  patient: "bg-patient text-patient-foreground border-patient",
  doctor: "bg-doctor text-doctor-foreground border-doctor",
  admin: "bg-admin text-admin-foreground border-admin",
  pharmacy: "bg-pharmacy text-pharmacy-foreground border-pharmacy",
};

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<string>("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const role = roles.find((r) => r.id === selectedRole);
    if (role) {
      toast.success(`Welcome! Logged in as ${role.label}`);
      navigate(role.path);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">PharmaGO</span>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border shadow-lg">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label>Select Your Role</Label>
                <div className="grid grid-cols-4 gap-2">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200",
                        selectedRole === role.id
                          ? activeRoleStyles[role.color as keyof typeof activeRoleStyles]
                          : roleStyles[role.color as keyof typeof roleStyles]
                      )}
                    >
                      {role.icon}
                      <span className="text-xs font-medium">{role.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full gradient-primary text-primary-foreground">
                Sign In
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a href="#" className="text-primary hover:underline font-medium">
                  Sign up
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
