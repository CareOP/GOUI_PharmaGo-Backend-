import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/cards/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { analyticsData, patients, appointments } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  Settings,
  QrCode,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
  Brain,
  Sparkles,
  UserCheck,
  UserX,
  RefreshCw,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Reception", href: "/admin/reception", icon: <QrCode className="h-5 w-5" /> },
  { label: "Staff", href: "/admin/staff", icon: <Users className="h-5 w-5" /> },
];

const statusColors = {
  "checked-in": "bg-doctor text-doctor-foreground",
  waiting: "bg-patient text-patient-foreground",
  "with-doctor": "bg-admin text-admin-foreground",
  completed: "bg-muted text-muted-foreground",
  pending: "bg-pharmacy text-pharmacy-foreground",
};

export default function AdminDashboard() {
  const { patientFlow, todayStats, noShowRate, avgWaitTime, resourceUtilization } = analyticsData;

  return (
    <DashboardLayout role="admin" userName="Admin User" navItems={navItems}>
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Patients Today"
            value={todayStats.totalPatients}
            icon={<Users className="h-6 w-6" />}
            trend={{ value: 8, isPositive: true }}
            variant="admin"
          />
          <StatCard
            title="Checked In"
            value={todayStats.checkedIn}
            icon={<UserCheck className="h-6 w-6" />}
            variant="default"
          />
          <StatCard
            title="Completed"
            value={todayStats.completed}
            icon={<CheckCircle className="h-6 w-6" />}
            variant="default"
          />
          <StatCard
            title="No-Shows"
            value={todayStats.noShows}
            icon={<UserX className="h-6 w-6" />}
            trend={{ value: 2, isPositive: false }}
            variant="default"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Flow Chart */}
            <Card className="border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Patient Flow</CardTitle>
                    <p className="text-sm text-muted-foreground">Real-time patient traffic</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-1">
                      <span className="w-2 h-2 rounded-full bg-doctor animate-pulse" />
                      Live
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={patientFlow}>
                      <defs>
                        <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--admin))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--admin))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="hour" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="patients"
                        stroke="hsl(var(--admin))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPatients)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Reception Queue */}
            <Card className="border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-admin" />
                    <CardTitle className="text-lg">Reception Queue</CardTitle>
                  </div>
                  <Button size="sm" className="gap-2 bg-admin text-admin-foreground hover:bg-admin/90">
                    <QrCode className="h-4 w-4" />
                    Scan QR
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {patients.map((patient) => (
                      <div
                        key={patient.id}
                        className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {patient.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ID: {patient.id} • {patient.appointmentTime}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={cn(
                              "capitalize",
                              statusColors[patient.status as keyof typeof statusColors]
                            )}
                          >
                            {patient.status.replace("-", " ")}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Metrics */}
          <div className="space-y-6">
            {/* AI Predictions */}
            <Card className="border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-admin" />
                  <CardTitle className="text-lg">AI Predictions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-admin-muted border border-admin/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">No-Show Rate</span>
                    <div className="flex items-center gap-1 text-doctor">
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-sm font-medium">-2%</span>
                    </div>
                  </div>
                  <p className="text-3xl font-bold">{noShowRate}%</p>
                  <Progress value={100 - noShowRate} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    AI predicts 3 potential no-shows today
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Avg Wait Time</span>
                    <div className="flex items-center gap-1 text-doctor">
                      <TrendingDown className="h-4 w-4" />
                      <span className="text-sm font-medium">-3 min</span>
                    </div>
                  </div>
                  <p className="text-3xl font-bold">{avgWaitTime} min</p>
                  <Progress value={70} className="h-2 mt-2" />
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Resource Utilization</span>
                    <div className="flex items-center gap-1 text-pharmacy">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">+5%</span>
                    </div>
                  </div>
                  <p className="text-3xl font-bold">{resourceUtilization}%</p>
                  <Progress value={resourceUtilization} className="h-2 mt-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="h-4 w-4" />
                  Manage Schedules
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="h-4 w-4" />
                  Staff Overview
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <AlertCircle className="h-4 w-4" />
                  View Alerts
                </Button>
              </CardContent>
            </Card>

            {/* Department Status */}
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-lg">Department Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "General Medicine", load: 85, status: "busy" },
                  { name: "Pediatrics", load: 45, status: "normal" },
                  { name: "Cardiology", load: 92, status: "critical" },
                  { name: "Orthopedics", load: 60, status: "normal" },
                ].map((dept) => (
                  <div key={dept.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{dept.name}</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          dept.status === "critical" ? "text-destructive border-destructive" :
                          dept.status === "busy" ? "text-pharmacy border-pharmacy" :
                          "text-doctor border-doctor"
                        )}
                      >
                        {dept.load}%
                      </Badge>
                    </div>
                    <Progress
                      value={dept.load}
                      className={cn(
                        "h-2",
                        dept.status === "critical" && "[&>div]:bg-destructive",
                        dept.status === "busy" && "[&>div]:bg-pharmacy"
                      )}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
