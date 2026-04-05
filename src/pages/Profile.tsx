import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  // { label: "Appointments", href: "/patient/appointments", icon: <Calendar className="h-5 w-5" /> },
  // { label: "Prescriptions", href: "/patient/prescriptions", icon: <FileText className="h-5 w-5" /> },
  // { label: "Notifications", href: "/patient/notifications", icon: <Bell className="h-5 w-5" /> },
  { label: "Profile", href: "/patient/profile", icon: <User className="h-5 w-5" /> },
];

export default function Profile() {
  return (
    <DashboardLayout role="patient" userName="Sarah Johnson" navItems={navItems}>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Profile</h1>

        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <p>Name: Sarah Johnson</p>
            <p>Email: sarah@email.com</p>
            <p>Phone: +91 9876543210</p>
            <p>Blood Group: O+</p>
            <p>Age: 28</p>

            <Button className="mt-4">Edit Profile</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}