import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { STORE_TYPE_LABEL, materials, sites } from "@/lib/mock-data";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Store Managers | MAS Construction" },
      {
        name: "description",
        content:
          "Contact details for MAS Construction site store managers — call or email about material transfers.",
      },
      { property: "og:title", content: "Store Managers | MAS Construction" },
      {
        property: "og:description",
        content: "Reach the store manager of any MAS Construction site.",
      },
    ],
  }),
  component: Contacts,
});

function Contacts() {
  return (
    <AppShell title="Store managers" subtitle="Reach the person holding the stock">
      <div className="grid gap-4 md:grid-cols-2">
        {sites.map((site) => {
          const items = materials.filter((m) => m.stock.some((s) => s.siteId === site.id)).length;
          return (
            <Card key={site.id}>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <p className="font-display text-xl font-bold">{site.manager}</p>
                  <p className="text-sm text-muted-foreground">
                    {STORE_TYPE_LABEL[site.type]} manager · {site.name}
                  </p>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" /> {site.city}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-accent" /> {site.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-accent" /> {site.email}
                  </p>
                  <p className="text-muted-foreground">{items} material types in store</p>
                </div>
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <a href={`tel:${site.phone.replace(/\s/g, "")}`}>Call</a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <a href={`mailto:${site.email}`}>Email</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
