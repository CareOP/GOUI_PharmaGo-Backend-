import { useState, useEffect } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, QrCode, UserPlus, Trash2 } from "lucide-react";

export default function Staff() {
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Reception", href: "/admin/reception", icon: <QrCode className="h-5 w-5" /> },
    { label: "Staff", href: "/admin/staff", icon: <Users className="h-5 w-5" /> },
  ];

  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: "", role: "", department: "" });

  // ===== Fetch staff from backend =====
  const fetchStaff = () => {
    axios.get("http://localhost:8080/api/staff")
      .then(res => setStaff(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // ===== Add Staff =====
  const addStaff = () => {
    axios.post("http://localhost:8080/api/staff", newStaff)
      .then(() => {
        fetchStaff();
        setNewStaff({ name: "", role: "", department: "" });
      })
      .catch(err => console.error(err));
  };

  // ===== Delete Staff =====
  const deleteStaff = (id) => {
    axios.delete(`http://localhost:8080/api/staff/${id}`)
      .then(() => fetchStaff())
      .catch(err => console.error(err));
  };

  return (
    <DashboardLayout role="admin" userName="Admin User" navItems={navItems}>
      <div className="space-y-6">

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Hospital Staff</h1>
        </div>

        {/* Add Staff Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add Staff</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Name"
              value={newStaff.name}
              onChange={e => setNewStaff({ ...newStaff, name: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Role"
              value={newStaff.role}
              onChange={e => setNewStaff({ ...newStaff, role: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Department"
              value={newStaff.department}
              onChange={e => setNewStaff({ ...newStaff, department: e.target.value })}
              className="border p-2 rounded"
            />
            <Button onClick={addStaff}>Add Staff</Button>
          </CardContent>
        </Card>

        {/* Staff List */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {staff.map(member => (
              <div key={member.id} className="flex items-center justify-between border p-4 rounded-lg">
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.department}</p>
                </div>
                <Badge variant="outline">{member.role}</Badge>
                <Button size="sm" variant="destructive" onClick={() => deleteStaff(member.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}