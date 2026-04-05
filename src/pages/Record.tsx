import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, FileText } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/doctor", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Patients", href: "/doctor/patients", icon: <Users className="h-5 w-5" /> },
  { label: "Records", href: "/doctor/records", icon: <FileText className="h-5 w-5" /> },
];

const records = [
  {
    id: "R001",
    patient: "Sarah Johnson",
    diagnosis: "Seasonal Flu",
    date: "March 15, 2026",
    details: "Patient shows mild fever and body aches. Prescribed rest, fluids, and antiviral medication."
  },
  {
    id: "R002",
    patient: "Michael Chen",
    diagnosis: "Viral Fever",
    date: "March 14, 2026",
    details: "High fever, fatigue, and headache. Blood tests normal. Prescribed paracetamol and hydration."
  },
  {
    id: "R003",
    patient: "Emily Davis",
    diagnosis: "Migraine",
    date: "March 12, 2026",
    details: "Severe headache with nausea. Advised pain management and follow-up if symptoms persist."
  },
];

export default function Record() {
  // 🔹 State for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  // 🔹 Function to open modal
  const handleViewRecord = (record: any) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  return (
    <DashboardLayout role="doctor" userName="Dr. Sarah Smith" navItems={navItems}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Medical Records</h1>

        {records.map((record) => (
          <Card key={record.id}>
            <CardHeader>
              <CardTitle>{record.patient}</CardTitle>
            </CardHeader>

            <CardContent className="flex justify-between items-center">
              <div className="space-y-1 text-sm">
                <p>Record ID: {record.id}</p>
                <p>Diagnosis: {record.diagnosis}</p>
                <p>Date: {record.date}</p>
              </div>

              <Button variant="outline" onClick={() => handleViewRecord(record)}>
                View Full Record
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* 🔹 Modal */}
        {showModal && selectedRecord && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-xl w-96 relative">
              <h2 className="font-semibold text-lg">{selectedRecord.patient}</h2>
              <p className="text-sm text-muted-foreground">
                Record ID: {selectedRecord.id} • Diagnosis: {selectedRecord.diagnosis}
              </p>
              <p className="mt-2 text-sm">{selectedRecord.details}</p>
              <p className="mt-1 text-xs text-muted-foreground">Date: {selectedRecord.date}</p>

              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}