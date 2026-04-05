import { Card, CardContent } from "@/components/ui/card";
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
  // { label: "Prescriptions", href: "/patient/prescriptions", icon: <FileText className="h-5 w-5" /> },
  // { label: "Notifications", href: "/patient/notifications", icon: <Bell className="h-5 w-5" /> },
  { label: "Profile", href: "/patient/profile", icon: <User className="h-5 w-5" /> },
];

export default function Notifications() {
  const notifications = [
    {
      title: "Appointment Confirmed",
      message: "Your appointment with Dr. Smith is confirmed.",
    },
    {
      title: "Prescription Ready",
      message: "Your prescription is ready for pickup.",
    },
    {
      title: "Lab Results Available",
      message: "Your blood test results are now available.",
    },
  ];

  return (
    <DashboardLayout role="patient" userName="Sarah Johnson" navItems={navItems}>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Notifications</h1>

        {notifications.map((noti, index) => (
          <Card key={index} className="bg-slate-900 border-slate-700">
            <CardContent className="p-4">
              <h2 className="font-semibold">{noti.title}</h2>
              <p className="text-sm text-gray-400">{noti.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}