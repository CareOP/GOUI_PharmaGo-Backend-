import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroBg from "@/assets/hero-bg.jpg";
import {
  Activity,
  Calendar,
  Pill,
  QrCode,
  Brain,
  Shield,
  Users,
  Stethoscope,
  Building2,
  ArrowRight,
  Check,
  Sparkles,
  BarChart3,
  Clock,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI Symptom Assessment",
    description: "Intelligent pre-consultation analysis powered by advanced AI to prepare accurate case histories.",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Smart Scheduling",
    description: "AI-optimized appointment booking that reduces wait times and maximizes resource utilization.",
  },
  {
    icon: <QrCode className="h-6 w-6" />,
    title: "QR Code Check-in",
    description: "Seamless patient intake with contactless QR code scanning for instant verification.",
  },
  {
    icon: <Pill className="h-6 w-6" />,
    title: "Pharmacy Integration",
    description: "Direct prescription flow to pharmacy with real-time inventory and fulfillment tracking.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Predictive Analytics",
    description: "AI-driven insights for no-show predictions, demand forecasting, and resource planning.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure & Compliant",
    description: "Enterprise-grade security with HIPAA compliance and encrypted patient data.",
  },
];

const roles = [
  {
    role: "patient",
    title: "Patients",
    description: "Book appointments, check symptoms with AI, and manage prescriptions seamlessly.",
    icon: <Users className="h-8 w-8" />,
    link: "/patient",
    color: "gradient-patient",
  },
  {
    role: "doctor",
    title: "Doctors",
    description: "Manage appointments, access patient histories, and AI-assisted diagnostics.",
    icon: <Stethoscope className="h-8 w-8" />,
    link: "/doctor",
    color: "gradient-doctor",
  },
  {
    role: "admin",
    title: "Hospital Admin",
    description: "Monitor operations, manage resources, and view real-time analytics.",
    icon: <Building2 className="h-8 w-8" />,
    link: "/admin",
    color: "gradient-admin",
  },
  {
    role: "pharmacy",
    title: "Pharmacy",
    description: "Process prescriptions, manage inventory, and track order fulfillment.",
    icon: <Pill className="h-8 w-8" />,
    link: "/pharmacy",
    color: "gradient-pharmacy",
  },
];

const stats = [
  { value: "50K+", label: "Patients Served" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "35%", label: "Wait Time Reduced" },
  { value: "24/7", label: "AI Availability" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">PharmaGO</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#roles" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Solutions
              </a>
              <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              {/* <Link to="/login" className="hidden sm:block">
                <Button size="sm" className="gradient-primary text-primary-foreground">
                  Get Started
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* <Badge variant="secondary" className="px-4 py-2 text-sm gap-2">
              <Sparkles className="h-4 w-4" />
              AI-Powered Healthcare Automation
            </Badge> */}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Transform Healthcare with{" "}
              <span className="text-primary">PharmaGO</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Platform connecting patients, doctors, hospitals, and pharmacies 
              with AI-driven symptom assessment and seamless prescription fulfillment.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="gradient-primary text-primary-foreground gap-2 px-8">
                  Get Started
                  {/* <ArrowRight className="h-5 w-5" /> */}
                </Button>
              </Link>
              {/* <Button size="lg" variant="outline" className="gap-2">
                <Activity className="h-5 w-5" />
                Watch Demo
              </Button> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for Modern Healthcare
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools powered by AI to streamline every aspect of healthcare delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border bg-card hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Workflow</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Seamless Patient Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From appointment booking to prescription fulfillment — all in one connected platform.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: 1, title: "Book", desc: "AI symptom check & appointment", icon: <Calendar className="h-5 w-5" /> },
                { step: 2, title: "Check-in", desc: "QR code hospital intake", icon: <QrCode className="h-5 w-5" /> },
                { step: 3, title: "Consult", desc: "Doctor consultation", icon: <Stethoscope className="h-5 w-5" /> },
                { step: 4, title: "Fulfill", desc: "Pharmacy prescription", icon: <Pill className="h-5 w-5" /> },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <Card className="border bg-card text-center p-6 h-full">
                    <div className="w-10 h-10 rounded-full gradient-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-bold">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mx-auto mb-3">
                      {item.icon}
                    </div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Role Cards Section */}
      <section id="roles" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Solutions</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tailored for Every Role
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dedicated dashboards designed for each stakeholder in the healthcare ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((item, index) => (
              <Link key={index} to={item.link}>
                <Card className="border bg-card h-full hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div className={`w-16 h-16 rounded-2xl ${item.color} text-primary-foreground flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                      <span>Explore Dashboard</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-20">
  <div className="container mx-auto px-4">
    <Card className="border-0 gradient-primary text-primary-foreground overflow-hidden">
      <CardContent className="p-8 md:p-12 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-background rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-background rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Transform Your Healthcare Operations
          </h2>
          <p className="text-lg opacity-90">
            PharmaGO Health helps healthcare providers streamline operations, manage patient care efficiently, 
            and improve overall healthcare experiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="gap-2 px-8">
                Get Started
                {/* <ArrowRight className="h-5 w-5" /> */}
              </Button>
            </Link>
            {/* <Button size="lg" variant="outline" className="gap-2 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Learn More
            </Button> */}
          </div>
          <div className="flex items-center justify-center gap-6 pt-4 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Easy to use</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Secure and reliable</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Customizable for your needs</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Activity className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">PharmaGO</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 PharmaGO Health. All rights reserved.
            </p>
            {/* <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
