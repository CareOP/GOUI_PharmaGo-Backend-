import { useState, useEffect } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrCode, LayoutDashboard, Users } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

export default function Reception() {
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Reception", href: "/admin/reception", icon: <QrCode className="h-5 w-5" /> },
    { label: "Staff", href: "/admin/staff", icon: <Users className="h-5 w-5" /> },
  ];

  const [patients, setPatients] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatientName, setNewPatientName] = useState("");
  const [newAppointmentTime, setNewAppointmentTime] = useState("");

  // ===== Fetch existing patients =====
  useEffect(() => {
    axios.get("http://localhost:8080/api/patients") // Replace with your backend URL
      .then((res) => setPatients(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ===== Generate QR =====
  const generateQR = (patient) => {
    const uniqueValue = `PAT-${patient.id}-QR-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    setQrValue(uniqueValue);
    setSelectedPatient(patient);
    setShowQR(true);
  };

  // ===== Add new patient =====
  const handleAddPatient = () => {
    const newPatient = {
      name: newPatientName,
      appointmentTime: newAppointmentTime,
      status: "Pending",
    };
    axios.post("http://localhost:8080/api/patients", newPatient)
      .then((res) => {
        setPatients([...patients, res.data]);
        setNewPatientName("");
        setNewAppointmentTime("");
      })
      .catch((err) => console.error(err));
  };

  // ===== Delete patient =====
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/patients/${id}`)
      .then(() => setPatients(patients.filter((p) => p.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <DashboardLayout role="admin" userName="Admin User" navItems={navItems}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Reception Queue</h1>

        {/* Add Patient */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Add New Patient</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Patient Name"
              value={newPatientName}
              onChange={(e) => setNewPatientName(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Appointment Time"
              value={newAppointmentTime}
              onChange={(e) => setNewAppointmentTime(e.target.value)}
              className="border p-2 rounded"
            />
            <Button onClick={handleAddPatient}>Add Patient</Button>
          </CardContent>
        </Card>

        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Check-In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between border p-4 rounded-lg">
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ID: {patient.id} • {patient.appointmentTime}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{patient.status}</Badge>
                  <Button size="sm" className="gap-1" onClick={() => generateQR(patient)}>
                    <QrCode className="h-4 w-4" /> Scan QR
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(patient.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* QR Modal */}
        {showQR && selectedPatient && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-xl flex flex-col items-center gap-4 relative">
              <h2 className="font-semibold">Patient QR Code</h2>
              <p className="text-sm text-muted-foreground">
                {selectedPatient.name} - ID: {selectedPatient.id}
              </p>
              <QRCodeCanvas value={qrValue} size={200} />
              <p className="text-xs text-muted-foreground break-all">{qrValue}</p>
              <Button variant="outline" onClick={() => setShowQR(false)}>Close</Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}