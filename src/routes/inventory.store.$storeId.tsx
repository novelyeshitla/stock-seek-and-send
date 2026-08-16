import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GROUP_LABEL,
  STORE_TYPE_LABEL,
  WASTE_LABEL,
  availableAt,
  materialsAtSite,
  reinforcementsAtSite,
  siteById,
  wasteAtSite,
  type Material,
  type MaterialGroup,
} from "@/lib/mock-data";


export const Route = createFileRoute("/inventory/store/$storeId")({
  head: () => ({
    meta: [
      { title: "Store inventory | MAS Construction" },
      {
        name: "description",
        content:
          "Office accessories, site accessories and reinforcement bar stock held in this MAS Construction store, with manager contact details.",
      },
      { property: "og:title", content: "Store inventory | MAS Construction" },
      {
        property: "og:description",
        content: "Office and site accessories plus reinforcement bars per store.",
      },
    ],
  }),
  component: StoreInventory,
});

function StoreInventory() {
  const { storeId } = Route.useParams();
  const store = siteById(storeId);

  if (!store) {
    return (
      <AppShell title="Store not found">
        <Button asChild>
          <Link to="/inventory">Back to stores</Link>
        </Button>
      </AppShell>
    );
  }

  const items = materialsAtSite(store.id);
  const bars = reinforcementsAtSite(store.id);

  const groupItems = (group: MaterialGroup) => items.filter((m) => m.group === group);

  return (
    <AppShell title={store.name} subtitle={`${STORE_TYPE_LABEL[store.type]} · ${store.city}`}>
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link to="/inventory">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to stores
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="font-display tracking-wide uppercase">Store contact</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm sm:grid-cols-2">
          <p className="font-medium">Store manager: {store.manager}</p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" /> {store.city}
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-accent" /> {store.phone}
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-accent" /> {store.email}
          </p>
          <div className="flex gap-2 sm:col-span-2">
            <Button asChild size="sm">
              <a href={`tel:${store.phone.replace(/\s/g, "")}`}>Call</a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a href={`mailto:${store.email}`}>Email</a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {(["office", "site"] as MaterialGroup[]).map((group) => (
        <section key={group} className="mt-8">
          <h2 className="font-display mb-3 text-2xl font-bold tracking-wide uppercase">
            {GROUP_LABEL[group]}
          </h2>
          <ItemGrid items={groupItems(group)} storeId={store.id} />

          {group === "site" ? (
            <div className="mt-6">
              <h3 className="font-display mb-3 text-xl font-bold tracking-wide uppercase">
                Reinforcements by diameter
              </h3>
              {bars.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No reinforcement bars held in this store.
                </p>
              ) : (
                <Card>
                  <CardContent className="overflow-x-auto pt-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-muted-foreground">
                          <th className="pb-2 pr-4 font-medium">Diameter</th>
                          <th className="pb-2 pr-4 font-medium">Grade</th>
                          <th className="pb-2 pr-4 font-medium">Length</th>
                          <th className="pb-2 pr-4 font-medium">Weight / rod</th>
                          <th className="pb-2 pr-4 font-medium">Available rods</th>
                          <th className="pb-2 font-medium">Total weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bars.map((r) => {
                          const rods = availableAt(r.stock, store.id);
                          return (
                            <tr key={r.id} className="border-b border-border/60 last:border-0">
                              <td className="py-2 pr-4 font-display text-base font-bold">
                                Ø{r.diameter} mm
                              </td>
                              <td className="py-2 pr-4">{r.grade}</td>
                              <td className="py-2 pr-4">{r.length} m</td>
                              <td className="py-2 pr-4">{r.weightPerRod} kg</td>
                              <td className="py-2 pr-4">{rods}</td>
                              <td className="py-2">
                                {Math.round(rods * r.weightPerRod).toLocaleString()} kg
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : null}
        </section>
      ))}

      <section className="mt-8">
        <h2 className="font-display mb-3 text-2xl font-bold tracking-wide uppercase">
          Unused & wasted materials
        </h2>
        {waste.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nothing reported as unused or wasted in this store.
          </p>
        ) : (
          <Card>
            <CardContent className="overflow-x-auto pt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-2 pr-4 font-medium">Item</th>
                    <th className="pb-2 pr-4 font-medium">Qty</th>
                    <th className="pb-2 pr-4 font-medium">Type</th>
                    <th className="pb-2 pr-4 font-medium">Reason</th>
                    <th className="pb-2 font-medium">Reported</th>
                  </tr>
                </thead>
                <tbody>
                  {waste.map((w) => (
                    <tr key={w.id} className="border-b border-border/60 align-top last:border-0">
                      <td className="py-2 pr-4 font-medium">{w.itemName}</td>
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {w.quantity} {w.unit}
                      </td>
                      <td className="py-2 pr-4">
                        <Badge variant={w.kind === "wasted" ? "destructive" : "secondary"}>
                          {WASTE_LABEL[w.kind]}
                        </Badge>
                      </td>
                      <td className="py-2 pr-4 text-muted-foreground">{w.reason}</td>
                      <td className="py-2 whitespace-nowrap">
                        {w.date}
                        <p className="text-xs text-muted-foreground">{w.reportedBy}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button asChild variant="ghost" size="sm" className="mt-3">
                <Link to="/waste">View all unused & wasted</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </AppShell>
  );
}


function ItemGrid({ items, storeId }: { items: Material[]; storeId: string }) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Nothing stocked in this category.</p>;
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((m) => (
        <Card key={m.id}>
          <CardContent className="space-y-3 pt-6">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-display text-lg font-bold">{m.name}</p>
                <p className="text-xs text-muted-foreground">
                  {m.sku} · {m.category}
                </p>
              </div>
              <Badge variant="outline">{m.category}</Badge>
            </div>
            <p className="text-sm">
              <span className="font-display text-2xl font-bold">
                {availableAt(m.stock, storeId)}
              </span>{" "}
              <span className="text-muted-foreground">{m.unit} available here</span>
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link to="/inventory/$materialId" params={{ materialId: m.id }}>
                All sites & request
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
