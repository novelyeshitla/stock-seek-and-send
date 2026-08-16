import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Boxes, Building2, Truck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  materials,
  materialById,
  siteById,
  sites,
  stockStatus,
  totalAvailable,
} from "@/lib/mock-data";
import { useRequests } from "@/lib/requests-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | MAS Construction Inventory" },
      {
        name: "description",
        content:
          "Live overview of material stock, low-stock alerts and open transfer requests across MAS Construction sites.",
      },
      { property: "og:title", content: "Dashboard | MAS Construction Inventory" },
      {
        property: "og:description",
        content: "Track materials, sites and transfer requests in one place.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { requests } = useRequests();
  const lowStock = materials.filter((m) => stockStatus(m) !== "healthy");
  const openRequests = requests.filter((r) => r.status !== "Delivered");

  const stats = [
    { label: "Materials tracked", value: materials.length, icon: Boxes },
    { label: "Active sites", value: sites.length, icon: Building2 },
    { label: "Open requests", value: openRequests.length, icon: Truck },
    { label: "Low stock items", value: lowStock.length, icon: AlertTriangle },
  ];

  return (
    <AppShell title="Dashboard" subtitle="Sunday overview — all sites">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-display text-4xl font-bold">{value}</p>
              </div>
              <Icon className="h-8 w-8 text-accent" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display tracking-wide uppercase">Low stock alerts</CardTitle>
            <Button asChild variant="secondary" size="sm">
              <Link to="/inventory">Find material</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStock.map((m) => (
              <Link
                key={m.id}
                to="/inventory/$materialId"
                params={{ materialId: m.id }}
                className="flex items-center justify-between rounded border border-border p-3 transition-colors hover:bg-muted"
              >
                <div>
                  <p className="font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {totalAvailable(m)} {m.unit} available · min {m.minLevel}
                  </p>
                </div>
                <Badge variant={stockStatus(m) === "critical" ? "destructive" : "secondary"}>
                  {stockStatus(m)}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-display tracking-wide uppercase">Recent requests</CardTitle>
            <Button asChild variant="secondary" size="sm">
              <Link to="/requests">Track all</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {requests.slice(0, 4).map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded border border-border p-3"
              >
                <div>
                  <p className="font-medium">{materialById(r.materialId)?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.id} · {siteById(r.fromSiteId)?.name} → {siteById(r.toSiteId)?.name}
                  </p>
                </div>
                <Badge variant="outline">{r.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
