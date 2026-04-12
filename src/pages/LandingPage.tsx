import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Required: npm install framer-motion
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
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
  Quote,
  ChevronDown,
  PlusCircle,
  LogIn,
  Sparkles
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
    link: "/login/patient",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-cyan-500/50",
    iconColor: "text-cyan-400"
  },
  {
    role: "doctor",
    title: "Doctors",
    description: "Manage appointments, access patient histories, and AI-assisted diagnostics.",
    icon: <Stethoscope className="h-8 w-8" />,
    link: "/doctor",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "group-hover:border-emerald-500/50",
    iconColor: "text-emerald-400"
  },
  {
    role: "admin",
    title: "Hospital Admin",
    description: "Monitor operations, manage resources, and view real-time analytics.",
    icon: <Building2 className="h-8 w-8" />,
    link: "/login/institution",
    color: "from-purple-500/20 to-indigo-500/20",
    border: "group-hover:border-purple-500/50",
    iconColor: "text-purple-400"
  },
  {
    role: "pharmacy",
    title: "Pharmacy",
    description: "Process prescriptions, manage inventory, and track order fulfillment.",
    icon: <Pill className="h-8 w-8" />,
    link: "/pharmacy",
    color: "from-orange-500/20 to-amber-500/20",
    border: "group-hover:border-orange-500/50",
    iconColor: "text-orange-400"
  },
];

export default function LandingPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020817] text-slate-50 selection:bg-teal-500/30 overflow-x-hidden">
      {/* Mesh Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Modern Glass Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#020817]/70 backdrop-blur-xl border-b border-slate-800' : 'py-6 bg-transparent'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                PharmaGO
              </span>
            </motion.div>
            
            <nav className="hidden lg:flex items-center gap-8">
              {['Features', 'Solutions', 'About'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-sm font-medium text-slate-400 hover:text-teal-400 transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="relative">
                <Button 
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20"
                >
                  Access Portal <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                      className="absolute top-full right-0 mt-4 w-72 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-2xl p-3 shadow-2xl z-[60]"
                    >
                      <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Medical Institutions</div>
                      <Link to="/login/staff" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-teal-500/10 hover:text-teal-400 transition-all group">
                        <LogIn className="h-4 w-4" /> Staff Authentication
                      </Link>
                      <Link to="/login/admin_login" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-white/5 transition-all group mb-2">
                        <PlusCircle className="h-4 w-4" /> Register Facility
                      </Link>
                      <div className="h-[1px] bg-slate-800 my-2" />
                      <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Patients</div>
                      <Link to="/login/patient" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-blue-500/10 hover:text-blue-400 transition-all group">
                        <Users className="h-4 w-4" /> Patient Sign In
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <Badge variant="outline" className="mb-6 py-1 px-4 border-teal-500/30 bg-teal-500/5 text-teal-400 rounded-full animate-bounce">
              <Sparkles className="h-3 w-3 mr-2" /> AI-Powered Healthcare Automation
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.9] mb-8">
              Transforming Care <br />
              <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent italic">
                with Intelligence.
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
              The next-generation SaaS ecosystem bridging the gap between clinical excellence and operational efficiency.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-slate-700 hover:bg-slate-800 text-slate-200 text-lg">
                Watch Ecosystem Demo
              </Button>
            </div>

            {/* Premium Quote Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative p-10 rounded-[2rem] bg-slate-900/40 border border-slate-800 backdrop-blur-md shadow-2xl max-w-3xl mx-auto group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote size={120} />
              </div>
              <p className="text-2xl font-medium text-slate-200 mb-6 leading-tight relative z-10">
                "We elevate the human hand to heal through focused technology."
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-8 bg-teal-500/50" />
                <span className="font-bold text-teal-400 uppercase tracking-widest text-xs">Dr. Ben Carson</span>
                <div className="h-px w-8 bg-teal-500/50" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section id="solutions" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-4">Ecosystem</Badge>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                Tailored for Every Role.
              </h2>
            </div>
            <p className="text-slate-400 max-w-sm">
              Dedicated high-performance dashboards designed for every stakeholder in the hospital lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={item.link}>
                  <Card className={`h-full bg-slate-900/40 border-slate-800 hover:bg-slate-800/60 transition-all duration-500 group cursor-pointer overflow-hidden backdrop-blur-sm relative border-t-2 ${item.border}`}>
                    <CardContent className="p-8">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                        <div className={item.iconColor}>{item.icon}</div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-8">{item.description}</p>
                      <div className={`flex items-center gap-2 font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${item.iconColor}`}>
                        <span>Explore Dashboard</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Horizontal Slider Style */}
      <section id="features" className="py-32 bg-slate-950/50 border-y border-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Core Capabilities.
            </h2>
            <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-900 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl block leading-none">PharmaGO</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Medical Excellence</span>
              </div>
            </div>
            
            <div className="flex gap-12">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Product</span>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Platform</a>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Security</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Legal</span>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">HIPAA</a>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-slate-900 text-center md:text-left">
            <p className="text-sm text-slate-500 font-medium">
              © 2026 PharmaGO Health. Built for the future of clinical automation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}