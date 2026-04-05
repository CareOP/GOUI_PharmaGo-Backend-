import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/cards/StatCard";
import { PrescriptionCard } from "@/components/cards/PrescriptionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prescriptions, inventory } from "@/lib/mockData";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  FileText,
  BarChart3,
  Settings,
  Search,
  Pill,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  QrCode,
  Brain,
  Sparkles,
  ShoppingCart,
  Truck,
} from "lucide-react";

const navItems = [
  // { label: "Dashboard", href: "/pharmacy", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Prescriptions", href: "/pharmacy/prescriptions", icon: <FileText className="h-5 w-5" /> },
  { label: "Inventory", href: "/pharmacy/inventory", icon: <Package className="h-5 w-5" /> },
  
];

export default function PharmacyDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [rxList, setRxList] = useState(prescriptions);

  const lowStockItems = inventory.filter((item) => item.stock < item.minStock);
  const pendingOrders = rxList.filter((rx) => rx.status === "pending" || rx.status === "processing");
  const readyOrders = rxList.filter((rx) => rx.status === "ready");

  const handleProcessOrder = (id: string) => {
    setRxList((prev) =>
      prev.map((rx) =>
        rx.id === id
          ? { ...rx, status: (rx.status === "pending" ? "processing" : "ready") as "pending" | "processing" | "ready" | "dispensed" }
          : rx
      )
    );
    toast.success("Order status updated!");
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="pharmacy" userName="MediCare Pharmacy" navItems={navItems}>
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Pending Orders"
            value={pendingOrders.length}
            icon={<Clock className="h-6 w-6" />}
            variant="pharmacy"
          />
          <StatCard
            title="Ready for Pickup"
            value={readyOrders.length}
            icon={<CheckCircle className="h-6 w-6" />}
            variant="default"
          />
          <StatCard
            title="Low Stock Items"
            value={lowStockItems.length}
            icon={<AlertTriangle className="h-6 w-6" />}
            variant="default"
          />
          <StatCard
            title="Today's Revenue"
            value="$2,450"
            icon={<TrendingUp className="h-6 w-6" />}
            trend={{ value: 12, isPositive: true }}
            variant="default"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Prescriptions */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-pharmacy" />
                    <CardTitle className="text-lg">Prescription Orders</CardTitle>
                  </div>
                  <Button size="sm" className="gap-2 bg-pharmacy text-pharmacy-foreground hover:bg-pharmacy/90">
                    <QrCode className="h-4 w-4" />
                    Scan QR
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pending" className="w-full">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="pending" className="flex-1 gap-2">
                      Pending
                      <Badge variant="secondary">{pendingOrders.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="ready" className="flex-1 gap-2">
                      Ready
                      <Badge variant="secondary">{readyOrders.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="flex-1">
                      Completed
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="pending">
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {pendingOrders.map((rx) => (
                          <PrescriptionCard
                            key={rx.id}
                            id={rx.id}
                            patientName={rx.patientName}
                            doctor={rx.doctor}
                            date={rx.date}
                            medications={rx.medications}
                            status={rx.status as "pending" | "processing" | "ready" | "dispensed"}
                            onFulfill={() => handleProcessOrder(rx.id)}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="ready">
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {readyOrders.map((rx) => (
                          <PrescriptionCard
                            key={rx.id}
                            id={rx.id}
                            patientName={rx.patientName}
                            doctor={rx.doctor}
                            date={rx.date}
                            medications={rx.medications}
                            status={rx.status as "pending" | "processing" | "ready" | "dispensed"}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="completed">
                    <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mb-4 opacity-50" />
                      <p>24 orders completed today</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card className="border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-pharmacy" />
                    <CardTitle className="text-lg">Inventory Management</CardTitle>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Truck className="h-4 w-4" />
                    Reorder
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search medicines..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {filteredInventory.map((item) => {
                      const isLow = item.stock < item.minStock;
                      const stockPercentage = (item.stock / item.minStock) * 100;
                      return (
                        <div
                          key={item.id}
                          className={cn(
                            "p-4 rounded-lg border transition-all",
                            isLow && "bg-destructive/5 border-destructive/20"
                          )}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-10 h-10 rounded-lg flex items-center justify-center",
                                isLow ? "bg-destructive/10" : "bg-pharmacy/10"
                              )}>
                                <Pill className={cn(
                                  "h-5 w-5",
                                  isLow ? "text-destructive" : "text-pharmacy"
                                )} />
                              </div>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">{item.category}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{item.stock} units</p>
                              <p className="text-sm text-muted-foreground">${item.price}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={Math.min(stockPercentage, 100)}
                              className={cn(
                                "h-2 flex-1",
                                isLow && "[&>div]:bg-destructive"
                              )}
                            />
                            {isLow && (
                              <Badge variant="destructive" className="text-xs">
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Demand Prediction */}
            <Card className="border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-pharmacy" />
                  <CardTitle className="text-lg">AI Predictions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-pharmacy-muted border border-pharmacy/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-pharmacy" />
                    <span className="font-medium text-sm">Demand Forecast</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Predicted 40% increase in cold medicine demand next week. 
                    Consider restocking now.
                  </p>
                  <Button size="sm" variant="outline" className="mt-3 w-full gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Auto-Order Suggested
                  </Button>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium">Top Predicted Demands</p>
                  {[
                    { name: "Amoxicillin", increase: "+35%" },
                    { name: "Vitamin C", increase: "+28%" },
                    { name: "Ibuprofen", increase: "+22%" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-muted">
                      <span className="text-sm">{item.name}</span>
                      <Badge variant="secondary" className="text-doctor">
                        {item.increase}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stock Alerts */}
            <Card className="border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Stock Alerts</CardTitle>
                  <Badge variant="destructive">{lowStockItems.length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-3">
                    {lowStockItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20"
                      >
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.stock} / {item.minStock} min
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="destructive">
                          Reorder
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-lg">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Orders Processed</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Fulfillment Time</span>
                  <span className="font-bold">8 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Items Dispensed</span>
                  <span className="font-bold">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Customer Rating</span>
                  <span className="font-bold">4.8 ⭐</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
