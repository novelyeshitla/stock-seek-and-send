import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { materialById, siteById, sites, stockStatus, totalAvailable } from "@/lib/mock-data";
import { useRequests } from "@/lib/requests-store";

export const Route = createFileRoute("/inventory/$materialId")({
  head: () => ({
    meta: [
      { title: "Material stock by site | MAS Construction" },
      {
        name: "description",
        content:
          "See which MAS Construction site holds this material, request a transfer and contact the store manager.",
      },
      { property: "og:title", content: "Material stock by site | MAS Construction" },
      {
        property: "og:description",
        content: "Stock per site, transfer requests and store manager contacts.",
      },
    ],
  }),
  component: MaterialDetail,
});

function MaterialDetail() {
  const { materialId } = Route.useParams();
  const material = materialById(materialId);
  const { createRequest } = useRequests();
  const navigate = useNavigate();

  const [openSiteId, setOpenSiteId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState("");
  const [destination, setDestination] = useState("s1");
  const [note, setNote] = useState("");

  if (!material) {
    return (
      <AppShell title="Material not found">
        <Button asChild>
          <Link to="/inventory">Back to inventory</Link>
        </Button>
      </AppShell>
    );
  }

  const submit = () => {
    const qty = Number(quantity);
    if (!openSiteId || !qty || qty <= 0) {
      toast.error("Enter a valid quantity");
      return;
    }
    const req = createRequest({
      materialId: material.id,
      fromSiteId: openSiteId,
      toSiteId: destination,
      quantity: qty,
      note: note || undefined,
    });
    setOpenSiteId(null);
    setQuantity("");
    setNote("");
    toast.success(`Request ${req.id} submitted`);
    navigate({ to: "/requests" });
  };

  const sourceSite = openSiteId ? siteById(openSiteId) : null;

  return (
    <AppShell title={material.name} subtitle={`${material.sku} · ${material.category}`}>
      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link to="/inventory">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to inventory
        </Link>
      </Button>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total available</p>
            <p className="font-display text-3xl font-bold">
              {totalAvailable(material)} {material.unit}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Minimum level</p>
            <p className="font-display text-3xl font-bold">
              {material.minLevel} {material.unit}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge
              className="mt-2"
              variant={stockStatus(material) === "critical" ? "destructive" : "secondary"}
            >
              {stockStatus(material)}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <h2 className="font-display mt-8 mb-3 text-2xl font-bold tracking-wide uppercase">
        Sites holding this material
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {material.stock.map((s) => {
          const site = siteById(s.siteId)!;
          const available = s.quantity - s.reserved;
          return (
            <Card key={s.siteId}>
              <CardHeader>
                <CardTitle className="font-display flex items-center justify-between text-xl">
                  {site.name}
                  <span className="text-accent">
                    {available} {material.unit}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  {site.city} · {s.reserved} {material.unit} reserved
                </p>
                <p className="font-medium">Store manager: {site.manager}</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => {
                      setOpenSiteId(s.siteId);
                      setDestination(sites.find((x) => x.id !== s.siteId)!.id);
                    }}
                  >
                    Request material
                  </Button>
                  <Button asChild variant="outline">
                    <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                      <Phone className="mr-1 h-4 w-4" /> Call
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={`mailto:${site.email}`}>
                      <Mail className="mr-1 h-4 w-4" /> Email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={openSiteId !== null} onOpenChange={(o) => !o && setOpenSiteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Request {material.name} from {sourceSite?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="qty">Quantity ({material.unit})</Label>
              <Input
                id="qty"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 120"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dest">Deliver to site</Label>
              <select
                id="dest"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {sites
                  .filter((s) => s.id !== openSiteId)
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">Note (optional)</Label>
              <Textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="When do you need it and what for?"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenSiteId(null)}>
              Cancel
            </Button>
            <Button onClick={submit}>Submit request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
