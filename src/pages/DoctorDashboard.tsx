import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/cards/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { appointments, patients } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Settings,
  User,
  Clock,
  Stethoscope,
  Brain,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  Video,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/doctor", icon: <LayoutDashboard className="h-5 w-5" /> },
  // { label: "Appointments", href: "/doctor/appointments", icon: <Calendar className="h-5 w-5" /> },
  { label: "Patients", href: "/doctor/patients", icon: <Users className="h-5 w-5" /> },
  { label: "Records", href: "/doctor/records", icon: <FileText className="h-5 w-5" /> },
  
];

const patientQueue = patients.map((p, i) => ({
  ...p,
  waitTime: (i + 1) * 5,
  priority: i === 0 ? "high" : i === 1 ? "medium" : "normal",
  symptoms: ["Fever", "Cough", "Fatigue"].slice(0, Math.floor(Math.random() * 3) + 1),
}));

export default function DoctorDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const todayAppointments = appointments.filter((a) => a.doctor === "Dr. Smith");
  const currentPatient = patients.find((p) => p.status === "with-doctor");

  return (
    <DashboardLayout role="doctor" userName="Dr. Sarah Smith" navItems={navItems}>
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Today's Patients"
            value="18"
            icon={<Users className="h-6 w-6" />}
            trend={{ value: 12, isPositive: true }}
            variant="doctor"
          />
          <StatCard
            title="Consultations Done"
            value="11"
            icon={<CheckCircle className="h-6 w-6" />}
            variant="default"
          />
          <StatCard
            title="Pending"
            value="7"
            icon={<Clock className="h-6 w-6" />}
            variant="default"
          />
          <StatCard
            title="Avg Wait Time"
            value="8 min"
            icon={<AlertCircle className="h-6 w-6" />}
            trend={{ value: 15, isPositive: true }}
            variant="default"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Patient Queue */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Patient */}
            {currentPatient && (
              <Card className="border-2 border-doctor">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-doctor text-doctor-foreground">In Session</Badge>
                      <CardTitle className="text-lg">Current Patient</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Video className="h-4 w-4" />
                        Video
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <MessageSquare className="h-4 w-4" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-doctor/10 flex items-center justify-center">
                      <User className="h-8 w-8 text-doctor" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold">{currentPatient.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {currentPatient.age} years • ID: {currentPatient.id}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Appointment</p>
                          <p className="font-medium">{currentPatient.appointmentTime}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p className="font-medium">General Checkup</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium">15 min</p>
                        </div>
                      </div>
                      <Card className="bg-doctor-muted border-doctor/20">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-4 w-4 text-doctor" />
                            <span className="text-sm font-medium">AI Pre-Assessment</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Patient reports headache and fatigue for 3 days. 
                            AI suggests checking for seasonal flu or stress-related symptoms.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 bg-doctor text-doctor-foreground hover:bg-doctor/90">
                      Complete & Prescribe
                    </Button>
                    <Button variant="outline">View History</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Patient Queue */}
            <Card className="border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Patient Queue</CardTitle>
                  <Badge variant="secondary">{patientQueue.length} waiting</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="waiting" className="w-full">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="waiting" className="flex-1">Waiting</TabsTrigger>
                    <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
                  </TabsList>
                  <TabsContent value="waiting">
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-3">
                        {patientQueue.filter((p) => p.status !== "completed").map((patient, index) => (
                          <div
                            key={patient.id}
                            onClick={() => setSelectedPatient(patient.id)}
                            className={cn(
                              "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md",
                              selectedPatient === patient.id && "ring-2 ring-doctor"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                  <User className="h-5 w-5" />
                                </div>
                                <span className={cn(
                                  "absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-primary-foreground",
                                  patient.priority === "high" ? "bg-destructive" :
                                  patient.priority === "medium" ? "bg-pharmacy" : "bg-muted-foreground"
                                )}>
                                  {index + 1}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{patient.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {patient.age} yrs • {patient.appointmentTime}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex flex-wrap gap-1 justify-end mb-1">
                                {patient.symptoms.map((s) => (
                                  <Badge key={s} variant="secondary" className="text-xs">
                                    {s}
                                  </Badge>
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Wait: {patient.waitTime} min
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="completed">
                    <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mb-4 opacity-50" />
                      <p>11 patients completed today</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Schedule & AI Insights */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card className="border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Today's Schedule</CardTitle>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[250px]">
                  <div className="space-y-3">
                    {todayAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className={cn(
                          "p-3 rounded-lg border transition-colors",
                          apt.status === "in-progress" && "bg-doctor-muted border-doctor"
                        )}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{apt.time}</span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {apt.status.replace("-", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm">{apt.patientName}</p>
                        <p className="text-xs text-muted-foreground">{apt.type}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-doctor" />
                  <CardTitle className="text-lg">AI Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-doctor-muted border border-doctor/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-doctor" />
                    <span className="font-medium text-sm">Schedule Optimization</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    3 appointments can be rescheduled to reduce gaps. 
                    This could save 45 minutes today.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2 w-full">
                    Apply Suggestions
                  </Button>
                </div>

                <div className="p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-pharmacy" />
                    <span className="font-medium text-sm">No-Show Prediction</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Patient Lisa Anderson has a 35% chance of no-show based on history.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-2 mb-2">
                    <Stethoscope className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Pattern Detected</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Increase in flu-like symptoms this week. 
                    Consider preparing additional testing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
