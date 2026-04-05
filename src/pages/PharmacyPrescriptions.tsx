import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrescriptionCard } from "@/components/cards/PrescriptionCard";
import { toast } from "sonner";

import {
  LayoutDashboard,
  Package,
  FileText,
} from "lucide-react";

const navItems = [
  // { label: "Dashboard", href: "/pharmacy", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Prescriptions", href: "/pharmacy/prescriptions", icon: <FileText className="h-5 w-5" /> },
  { label: "Inventory", href: "/pharmacy/inventory", icon: <Package className="h-5 w-5" /> },
];

export default function PharmacyPrescriptions() {

  const [rxList, setRxList] = useState([]);

  // ✅ FORM STATE
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState(1);

  // ✅ FETCH
  useEffect(() => {
    fetch("http://localhost:8080/api/orders")
      .then((res) => res.json())
      .then((data) => setRxList(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ CREATE ORDER (REAL INPUT)
  const createOrder = () => {
    if (!medicineName) {
      toast.error("Enter medicine name");
      return;
    }

    fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Date.now().toString(),
        medicineName: medicineName,
        quantity: Number(quantity),
        status: "Pending",
      }),
    })
      .then((res) => res.json())
      .then((newOrder) => {
        setRxList((prev) => [...prev, newOrder]);
        toast.success("Order created!");

        // ✅ RESET FORM
        setMedicineName("");
        setQuantity(1);
      })
      .catch(() => toast.error("Failed to create order"));
  };

  // ✅ DELETE
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/orders/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setRxList((prev) => prev.filter((rx) => rx.id !== id));
        toast.success("Deleted!");
      });
  };

  // ✅ UPDATE
  const handleProcessOrder = (id) => {
    fetch(`http://localhost:8080/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Ready",
      }),
    })
      .then(() => {
        setRxList((prev) =>
          prev.map((rx) =>
            rx.id === id ? { ...rx, status: "Ready" } : rx
          )
        );
        toast.success("Updated!");
      });
  };

  // ✅ FILTER
  const pendingOrders = rxList.filter(
    (rx) =>
      rx.status?.toLowerCase() === "pending" ||
      rx.status?.toLowerCase() === "processing"
  );

  const readyOrders = rxList.filter(
    (rx) => rx.status?.toLowerCase() === "ready"
  );

  return (
    <DashboardLayout role="pharmacy" userName="MediCare Pharmacy" navItems={navItems}>
      <div className="space-y-6">

        {/* ✅ FORM */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Order</CardTitle>
          </CardHeader>

          <CardContent className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Medicine Name"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              className="border p-2 rounded w-full text-black"
            />

            <input
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-2 rounded w-24 text-black"
            />

            <Button onClick={createOrder}>
              Add
            </Button>
          </CardContent>
        </Card>

        {/* ✅ ORDERS */}
        <Card>
          <CardHeader>
            <CardTitle>Prescription Orders</CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="pending">

              <TabsList className="w-full mb-4">
                <TabsTrigger value="pending" className="flex-1">
                  Pending <Badge className="ml-2">{pendingOrders.length}</Badge>
                </TabsTrigger>

                <TabsTrigger value="ready" className="flex-1">
                  Ready <Badge className="ml-2">{readyOrders.length}</Badge>
                </TabsTrigger>
              </TabsList>

              {/* PENDING */}
<TabsContent value="pending">
  <ScrollArea className="h-[400px]">
    <div className="space-y-4">
      {pendingOrders.map((rx) => (
        <div key={rx.id} className="w-full space-y-2">
          <PrescriptionCard
            id={rx.id}
            patientName="Walk-in Patient"
            doctor="General"
            date="Today"
            medications={[`${rx.medicineName} (x${rx.quantity})`]}
            status={rx.status?.toLowerCase()}
            onFulfill={() => handleProcessOrder(rx.id)}
          />
          <div className="flex justify-end">
            <Button variant="destructive" onClick={() => handleDelete(rx.id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  </ScrollArea>
</TabsContent>

{/* READY */}
<TabsContent value="ready">
  <ScrollArea className="h-[400px]">
    <div className="space-y-4">
      {readyOrders.map((rx) => (
        <div key={rx.id} className="w-full space-y-2">
          <PrescriptionCard
            id={rx.id}
            patientName="Walk-in Patient"
            doctor="General"
            date="Today"
            medications={[`${rx.medicineName} (x${rx.quantity})`]}
            status={rx.status?.toLowerCase()}
          />
          <div className="flex justify-end">
            <Button variant="destructive" onClick={() => handleDelete(rx.id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  </ScrollArea>
</TabsContent>

            </Tabs>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}