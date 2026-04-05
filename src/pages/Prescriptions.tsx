import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

import {
  LayoutDashboard,
  Calendar,
  FileText,
  Bell,
  User
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/patient", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Appointments", href: "/patient/appointments", icon: <Calendar className="h-5 w-5" /> },
  // { label: "Prescriptions", href: "/patient/prescriptions", icon: <FileText className="h-5 w-5" /> },s
  { label: "Notifications", href: "/patient/notifications", icon: <Bell className="h-5 w-5" /> },
  { label: "Profile", href: "/patient/profile", icon: <User className="h-5 w-5" /> },
];

export default function Prescriptions() {
  const prescriptions = [
    {
      id: "RX001",
      doctor: "Dr. Smith",
      medicines: ["Amoxicillin 500mg", "Ibuprofen 400mg"],
      status: "Ready",
    },
    {
      id: "RX002",
      doctor: "Dr. Patel",
      medicines: ["Metformin 850mg"],
      status: "Pending",
    },
  ];

  return (
    <DashboardLayout role="patient" userName="Sarah Johnson" navItems={navItems}>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Prescriptions</h1>

        {prescriptions.map((pres) => (
          <Card key={pres.id} className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle>Prescription {pres.id}</CardTitle>
            </CardHeader>

            <CardContent>
              <p>Doctor: {pres.doctor}</p>
              <p>Medicines:</p>

              <ul className="list-disc ml-5">
                {pres.medicines.map((med, i) => (
                  <li key={i}>{med}</li>
                ))}
              </ul>

              <p className="mt-2">Status: {pres.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}