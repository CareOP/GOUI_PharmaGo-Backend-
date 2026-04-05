import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  FileText,
  Search,
  Pill,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  // { label: "Dashboard", href: "/pharmacy", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Prescriptions", href: "/pharmacy/prescriptions", icon: <FileText className="h-5 w-5" /> },
  { label: "Inventory", href: "/pharmacy/inventory", icon: <Package className="h-5 w-5" /> },
];

export default function PharmacyInventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inventory, setInventory] = useState([]);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:8080/api/medicines")
      .then((res) => res.json())
      .then((data) => {
        console.log("Medicines:", data);
        setInventory(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  // ✅ FILTER
  const filteredInventory = inventory.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="pharmacy" userName="MediCare Pharmacy" navItems={navItems}>
      <div className="space-y-6">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Inventory Management</CardTitle>

            {/* <Button variant="outline" className="gap-2">
              <Truck className="h-4 w-4" />
              Reorder
            </Button> */}
          </CardHeader>

          <CardContent>

            {/* SEARCH */}
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <ScrollArea className="h-[450px]">
              <div className="space-y-3">

                {filteredInventory.map((item) => {

                  // ✅ Define min stock (custom logic)
                  const minStock = 50; 
                  const isLow = item.stock < minStock;
                  const percentage = (item.stock / minStock) * 100;

                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "border rounded-lg p-4",
                        isLow && "bg-destructive/5 border-destructive/20"
                      )}
                    >

                      <div className="flex justify-between mb-2">

                        <div className="flex gap-3">

                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <Pill className="h-5 w-5 text-pharmacy" />
                          </div>

                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Medicine
                            </p>
                          </div>

                        </div>

                        <div className="text-right">
                          <p className="font-bold">{item.stock} units</p>
                          <p className="text-sm text-muted-foreground">
                            ₹{item.price}
                          </p>
                        </div>

                      </div>

                      <div className="flex gap-2 items-center">

                        <Progress
                          value={Math.min(percentage, 100)}
                          className="flex-1 h-2"
                        />

                        {isLow && (
                          <Badge variant="destructive">
                            Low Stock
                          </Badge>
                        )}

                      </div>

                    </div>
                  );
                })}

              </div>
            </ScrollArea>

          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}