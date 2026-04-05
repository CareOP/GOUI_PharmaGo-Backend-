import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/cards/StatCard";
import { AppointmentCard } from "@/components/cards/AppointmentCard";
import { AIChatbot } from "@/components/AIChatbot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { QRCodeCanvas } from "qrcode.react";

import {
  LayoutDashboard,
  Calendar,
  Activity,
  Clock,
  Pill,
  Brain,
  Search,
  Plus,
  Sparkles,
  AlertCircle,
  User,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/patient", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Profile", href: "/patient/profile", icon: <User className="h-5 w-5" /> },
];

export default function PatientDashboard() {
  // ===== State =====
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showBooking, setShowBooking] = useState(false);

  const [newAppt, setNewAppt] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    status: "",
    symptoms: "",
  });

  // ===== Fetch Appointments from Backend =====
  useEffect(() => {
    fetch("http://localhost:8080/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error(err));
  }, []);

  // ===== CRUD Handlers =====
  const handleCreate = () => {
    fetch("http://localhost:8080/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAppt),
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments((prev) => [...prev, data]);
        alert("Appointment Added!");
        setNewAppt({
          patientId: "",
          doctorId: "",
          date: "",
          time: "",
          status: "",
          symptoms: "",
        });
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id: string) => {
    fetch(`http://localhost:8080/api/appointments/${id}`, { method: "DELETE" })
      .then(() => setAppointments((prev) => prev.filter((a) => a.id !== id)))
      .catch((err) => console.error(err));
  };

  // Upcoming confirmed appointments
  const upcomingAppointments = appointments.filter((a) => a.status === "confirmed");

  return (
    <DashboardLayout role="patient" userName="Sarah Johnson" navItems={navItems}>
      <div className="space-y-6 p-6">
        {/* ===== Quick Stats ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Upcoming Appointments"
            value={upcomingAppointments.length.toString()}
            icon={<Calendar className="h-6 w-6" />}
            variant="patient"
          />
          <StatCard
            title="Active Prescriptions"
            value="3"
            icon={<Pill className="h-6 w-6" />}
            variant="default"
          />
          <StatCard
            title="Health Score"
            value="85%"
            icon={<Activity className="h-6 w-6" />}
            trend={{ value: 5, isPositive: true }}
            variant="default"
          />
          <StatCard
            title="Next Checkup"
            value="7 days"
            icon={<Clock className="h-6 w-6" />}
            variant="default"
          />
        </div>

        {/* ===== Main Dashboard Content ===== */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ===== Main Content: AI + Appointments ===== */}
          <div className="flex-1 space-y-6">
            {/* ===== AI Symptom Assessment ===== */}
            <Card className="border w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">AI Symptom Assessment</CardTitle>
                      <p className="text-sm text-muted-foreground">Pre-fill your case history</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    AI Powered
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search or describe symptoms..." className="pl-10" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Fever", "Cough", "Headache", "Fatigue", "Nausea", "Dizziness"].map(
                    (symptom) => (
                      <label
                        key={symptom}
                        className="flex items-center gap-2 p-2 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                      >
                        <Checkbox
                          checked={selectedSymptoms.includes(symptom)}
                          onCheckedChange={(checked) => {
                            if (checked)
                              setSelectedSymptoms([...selectedSymptoms, symptom]);
                            else
                              setSelectedSymptoms(
                                selectedSymptoms.filter((s) => s !== symptom)
                              );
                          }}
                        />
                        <span className="text-sm">{symptom}</span>
                      </label>
                    )
                  )}
                </div>

                {selectedSymptoms.length > 0 && (
                  <Card className="bg-patient-muted border-patient/20">
                    <CardContent className="p-4 flex flex-col gap-2">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-patient mt-0.5" />
                        <div className="space-y-2">
                          <p className="text-sm font-medium">AI Assessment Result</p>
                          <p className="text-sm text-muted-foreground">
                            Based on your symptoms ({selectedSymptoms.join(", ")}), we
                            recommend consulting with a General Physician.
                          </p>
                          <Button
                            size="sm"
                            onClick={() => setShowBooking(true)}
                            className="gap-2"
                          >
                            <Plus className="h-4 w-4" /> Book Appointment
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* ===== Create / List Appointments ===== */}
            <Card className="border w-full">
              <CardHeader>
                <CardTitle className="text-lg">Manage Appointments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* CREATE FORM */}
                <div className="space-y-2 border p-4 rounded">
                  <h2 className="font-semibold">Add Appointment</h2>
                  <input
                    placeholder="Patient ID"
                    value={newAppt.patientId}
                    onChange={(e) =>
                      setNewAppt({ ...newAppt, patientId: e.target.value })
                    }
                    className="border p-2 w-full"
                  />
                  <input
                    placeholder="Doctor ID"
                    value={newAppt.doctorId}
                    onChange={(e) =>
                      setNewAppt({ ...newAppt, doctorId: e.target.value })
                    }
                    className="border p-2 w-full"
                  />
                  <input
                    placeholder="Date"
                    type="date"
                    value={newAppt.date}
                    onChange={(e) =>
                      setNewAppt({ ...newAppt, date: e.target.value })
                    }
                    className="border p-2 w-full"
                  />
                  <input
                    placeholder="Time"
                    type="time"
                    value={newAppt.time}
                    onChange={(e) =>
                      setNewAppt({ ...newAppt, time: e.target.value })
                    }
                    className="border p-2 w-full"
                  />
                  <input
                    placeholder="Status"
                    value={newAppt.status}
                    onChange={(e) =>
                      setNewAppt({ ...newAppt, status: e.target.value })
                    }
                    className="border p-2 w-full"
                  />
                  <input
                    placeholder="Symptoms"
                    value={newAppt.symptoms}
                    onChange={(e) =>
                      setNewAppt({ ...newAppt, symptoms: e.target.value })
                    }
                    className="border p-2 w-full"
                  />
                  <Button onClick={handleCreate}>Add Appointment</Button>
                </div>

                {/* LIST */}
                {appointments.map((appt) => (
                  <Card key={appt.id} className="w-full">
                    <CardHeader>
                      <CardTitle>Doctor: {appt.doctorId}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center">
                      <div>
                        <p>Date: {appt.date}</p>
                        <p>Time: {appt.time}</p>
                        <p>Status: {appt.status}</p>
                      </div>
                      <Button onClick={() => handleDelete(appt.id)}>Delete</Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* ===== Sidebar: QR Code for Confirmed Appointments ===== */}
          <div className="w-full lg:w-1/3 space-y-6">
            {upcomingAppointments.map((appt) => (
              <Card key={appt.id} className="border w-full">
                <CardHeader>
                  <CardTitle>Check-in QR Code</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <QRCodeCanvas
                    value={JSON.stringify({
                      appointmentId: appt.id,
                      patientId: appt.patientId,
                      doctorId: appt.doctorId,
                      date: appt.date,
                      time: appt.time,
                    })}
                    size={180}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <AIChatbot />
    </DashboardLayout>
  );
}