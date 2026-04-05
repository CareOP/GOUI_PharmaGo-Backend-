import { useState, useEffect } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, FileText } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/doctor", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Patients", href: "/doctor/patients", icon: <Users className="h-5 w-5" /> },
  { label: "Records", href: "/doctor/records", icon: <FileText className="h-5 w-5" /> },
];

export default function Patient() {
  const [patients, setPatients] = useState([]);
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientAge, setNewPatientAge] = useState("");
  const [newPatientCondition, setNewPatientCondition] = useState("");
  const [newPatientStatus, setNewPatientStatus] = useState("Active");

  // ===== Fetch existing patients =====
  useEffect(() => {
    axios.get("http://localhost:8080/api/patients") // Your backend endpoint
      .then((res) => setPatients(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ===== Add new patient =====
  const handleAddPatient = () => {
    const newPatient = {
      name: newPatientName,
      age: Number(newPatientAge),
      condition: newPatientCondition,
      status: newPatientStatus,
    };

    axios.post("http://localhost:8080/api/patients", newPatient)
      .then((res) => {
        setPatients([...patients, res.data]);
        setNewPatientName("");
        setNewPatientAge("");
        setNewPatientCondition("");
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
    <DashboardLayout role="doctor" userName="Dr. Sarah Smith" navItems={navItems}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Patients</h1>

        {/* Add New Patient Form */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Add New Patient</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Name"
              value={newPatientName}
              onChange={(e) => setNewPatientName(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Age"
              value={newPatientAge}
              onChange={(e) => setNewPatientAge(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Condition"
              value={newPatientCondition}
              onChange={(e) => setNewPatientCondition(e.target.value)}
              className="border p-2 rounded"
            />
            <Button onClick={handleAddPatient}>Add Patient</Button>
          </CardContent>
        </Card>

        {/* Patient Grid */}
        <div className="grid gap-4">
          {patients.map((patient) => (
            <Card key={patient.id}>
              <CardHeader>
                <CardTitle>{patient.name}</CardTitle>
              </CardHeader>

              <CardContent className="flex justify-between items-center">
                {/* <div className="space-y-1 text-sm">
                  <p>ID: {patient.id}</p>
                  <p>Age: {patient.age}</p>
                  <p>Condition: {patient.condition}</p>
                </div> */}

                <div className="flex items-center gap-3">
                  <Badge>{patient.status}</Badge>
                  {/* <Button variant="outline">View Profile</Button> */}
                  <Button variant="destructive" onClick={() => handleDelete(patient.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}