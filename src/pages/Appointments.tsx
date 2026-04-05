import { useEffect, useState } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrCode, LayoutDashboard, Users } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Reception", href: "/admin/reception", icon: <QrCode className="h-5 w-5" /> },
  { label: "Staff", href: "/admin/staff", icon: <Users className="h-5 w-5" /> },
];

export default function Reception() {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: "", age: "", condition: "", status: "Active" });
  const [showQR, setShowQR] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  // ===== FETCH existing patients =====
  useEffect(() => {
    axios.get("http://localhost:8080/api/reception")
      .then(res => setPatients(res.data))
      .catch(err => console.error(err));
  }, []);

  // ===== ADD patient =====
  const handleAddPatient = () => {
    axios.post("http://localhost:8080/api/reception", newPatient)
      .then(res => {
        setPatients([...patients, res.data]);
        setNewPatient({ name: "", age: "", condition: "", status: "Active" });
      })
      .catch(err => console.error(err));
  };

  // ===== DELETE patient =====
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/reception/${id}`)
      .then(() => setPatients(patients.filter(p => p.id !== id)))
      .catch(err => console.error(err));
  };

  // ===== QR generation =====
  const generateQR = (patient) => {
    const uniqueValue = `PAT-${patient.id}-QR-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    setQrValue(uniqueValue);
    setSelectedPatient(patient);
    setShowQR(true);
  };

  return (
    <DashboardLayout role="admin" userName="Admin User" navItems={navItems}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Reception Queue</h1>

        {/* Add New Patient Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Patient</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Name"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Age"
              value={newPatient.age}
              onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Condition"
              value={newPatient.condition}
              onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Status"
              value={newPatient.status}
              onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value })}
              className="border p-2 rounded"
            />
            <Button onClick={handleAddPatient}>Add Patient</Button>
          </CardContent>
        </Card>

        {/* Patient List */}
        <div className="space-y-4">
          {patients.map((patient) => (
            <Card key={patient.id}>
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{patient.name}</CardTitle>
              </CardHeader>

              <CardContent className="flex justify-between items-center">
                <div className="space-y-1 text-sm">
                  <p>ID: {patient.id}</p>
                  <p>Age: {patient.age}</p>
                  <p>Condition: {patient.condition}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">{patient.status}</Badge>
                  <Button size="sm" variant="default" onClick={() => generateQR(patient)}>QR</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(patient.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* QR Modal */}
        {showQR && selectedPatient && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-xl flex flex-col items-center gap-4 relative">
              <h2 className="font-semibold">Patient QR Code</h2>
              <p className="text-sm text-muted-foreground">
                {selectedPatient.name} - ID: {selectedPatient.id}
              </p>
              <QRCodeCanvas value={qrValue} size={200} />
              <p className="text-xs text-muted-foreground break-all">QR Value: {qrValue}</p>
              <Button variant="outline" onClick={() => setShowQR(false)}>Close</Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}