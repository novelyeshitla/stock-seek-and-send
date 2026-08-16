import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  STORE_TYPE_LABEL,
  WASTE_LABEL,
  siteById,
  wasteRecords,
  wasteTotal,
  type WasteKind,
} from "@/lib/mock-data";

export const Route = createFileRoute("/waste")({
  head: () => ({
    meta: [
      { title: "Unused & wasted materials | MAS Construction" },
      {
        name: "description",
        content:
          "Log of unused returnable materials and wasted unusable materials across MAS Construction super, mini and site stores.",
      },
      { property: "og:title", content: "Unused & wasted materials | MAS Construction" },
      {
        property: "og:description",
        content: "Track returnable surplus and unusable waste per store with reasons and reporters.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Waste,
});

const filters = ["all", "unused", "wasted"] as const;

function Waste() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");

  const rows = wasteRecords.filter((w) => filter === "all" || w.kind === filter);

  return (
    <AppShell
      title="Unused & wasted"
      subtitle="Surplus that can be returned, and material written off as waste"
    >
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Unused / returnable lines" value={countOf("unused")} />
        <SummaryCard label="Wasted / unusable lines" value={countOf("wasted")} />
        <SummaryCard
          label="Total quantity written off"
          value={wasteTotal("wasted").toLocaleString()}
        />
      </div>

      <div className="mb-4 flex gap-2">
        {filters.map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : WASTE_LABEL[f]}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display tracking-wide uppercase">Waste log</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2 pr-4 font-medium">Ref</th>
                <th className="pb-2 pr-4 font-medium">Item</th>
                <th className="pb-2 pr-4 font-medium">Qty</th>
                <th className="pb-2 pr-4 font-medium">Type</th>
                <th className="pb-2 pr-4 font-medium">Store</th>
                <th className="pb-2 pr-4 font-medium">Reason</th>
                <th className="pb-2 font-medium">Reported</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((w) => {
                const store = siteById(w.siteId);
                return (
                  <tr key={w.id} className="border-b border-border/60 align-top last:border-0">
                    <td className="py-3 pr-4 font-mono text-xs">{w.id}</td>
                    <td className="py-3 pr-4 font-medium">{w.itemName}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">
                      <span className="font-display text-base font-bold">{w.quantity}</span>{" "}
                      <span className="text-muted-foreground">{w.unit}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <KindBadge kind={w.kind} />
                    </td>
                    <td className="py-3 pr-4">
                      {store ? (
                        <Link
                          to="/inventory/store/$storeId"
                          params={{ storeId: store.id }}
                          className="underline decoration-dotted"
                        >
                          {store.name}
                        </Link>
                      ) : (
                        "—"
                      )}
                      {store ? (
                        <p className="text-xs text-muted-foreground">
                          {STORE_TYPE_LABEL[store.type]}
                        </p>
                      ) : null}
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">{w.reason}</td>
                    <td className="py-3 whitespace-nowrap">
                      {w.date}
                      <p className="text-xs text-muted-foreground">{w.reportedBy}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </AppShell>
  );
}

function countOf(kind: WasteKind) {
  return wasteRecords.filter((w) => w.kind === kind).length;
}

function SummaryCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="font-display text-3xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

export function KindBadge({ kind }: { kind: WasteKind }) {
  return (
    <Badge variant={kind === "wasted" ? "destructive" : "secondary"} className="whitespace-nowrap">
      {WASTE_LABEL[kind]}
    </Badge>
  );
}
