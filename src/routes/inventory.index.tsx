import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { materials, siteById, stockStatus, totalAvailable } from "@/lib/mock-data";

export const Route = createFileRoute("/inventory/")({
  head: () => ({
    meta: [
      { title: "Inventory | MAS Construction" },
      {
        name: "description",
        content:
          "Search MAS Construction material inventory and see which site holds available stock right now.",
      },
      { property: "og:title", content: "Inventory | MAS Construction" },
      {
        property: "og:description",
        content: "Search materials and find the site that has stock available.",
      },
    ],
  }),
  component: Inventory,
});

function Inventory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(materials.map((m) => m.category)))],
    [],
  );

  const results = materials.filter((m) => {
    const matchesQuery = `${m.name} ${m.sku} ${m.category}`
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    return matchesQuery && (category === "All" || m.category === category);
  });

  return (
    <AppShell title="Inventory" subtitle="Find a material, then see which site has it">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search material name or SKU (e.g. cement, RBR-012)"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={c === category ? "default" : "outline"}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((m) => (
          <Card key={m.id}>
            <CardContent className="space-y-3 pt-6">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-xl font-bold">{m.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {m.sku} · {m.category}
                  </p>
                </div>
                <Badge
                  variant={
                    stockStatus(m) === "critical"
                      ? "destructive"
                      : stockStatus(m) === "low"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {stockStatus(m)}
                </Badge>
              </div>
              <p className="text-sm">
                <span className="font-display text-2xl font-bold">{totalAvailable(m)}</span>{" "}
                <span className="text-muted-foreground">{m.unit} available</span>
              </p>
              <ul className="space-y-1 text-sm">
                {m.stock.map((s) => (
                  <li key={s.siteId} className="flex justify-between text-muted-foreground">
                    <span>{siteById(s.siteId)?.name}</span>
                    <span className="text-foreground">
                      {s.quantity - s.reserved} {m.unit}
                    </span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full">
                <Link to="/inventory/$materialId" params={{ materialId: m.id }}>
                  View sites & request
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
        {results.length === 0 ? (
          <p className="text-muted-foreground">No materials match your search.</p>
        ) : null}
      </div>
    </AppShell>
  );
}
