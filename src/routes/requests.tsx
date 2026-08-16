import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Mail, Phone } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { REQUEST_FLOW, materialById, siteById } from "@/lib/mock-data";
import { useRequests } from "@/lib/requests-store";

export const Route = createFileRoute("/requests")({
  head: () => ({
    meta: [
      { title: "Track Requests | MAS Construction Inventory" },
      {
        name: "description",
        content:
          "Track material transfer requests between MAS Construction sites from submission to delivery.",
      },
      { property: "og:title", content: "Track Requests | MAS Construction Inventory" },
      {
        property: "og:description",
        content: "Follow every material request from submitted to delivered.",
      },
    ],
  }),
  component: Requests();
});

function Requests() {
  const { requests, advance } = useRequests();

  return (
    <AppShell title="Requests" subtitle="Track material transfers between sites">
      {requests.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">No requests yet.</p>
            <Button asChild className="mt-4">
              <Link to="/inventory">Find material</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <div className="space-y-4">
        {requests.map((r) => {
          const material = materialById(r.materialId);
          const from = siteById(r.fromSiteId);
          const to = siteById(r.toSiteId);
          const stepIndex = REQUEST_FLOW.indexOf(r.status);

          return (
            <Card key={r.id}>
              <CardContent className="space-y-4 pt-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-xl font-bold">
                      {r.quantity} {material?.unit} · {material?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {r.id} · {from?.name} → {to?.name} · requested {r.createdAt} by {r.requestedBy}
                    </p>
                    {r.note ? <p className="mt-1 text-sm">“{r.note}”</p> : null}
                  </div>
                  <Badge variant={r.status === "Delivered" ? "secondary" : "outline"}>
                    {r.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  {REQUEST_FLOW.map((step, i) => (
                    <div key={step} className="flex flex-1 items-center gap-2">
                      <div className="flex-1">
                        <div
                          className={`flex h-7 items-center justify-center rounded text-xs font-medium ${
                            i <= stepIndex
                              ? "bg-accent text-accent-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {i < stepIndex ? <Check className="h-4 w-4" /> : step}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {r.status !== "Delivered" ? (
                    <Button size="sm" onClick={() => advance(r.id)}>
                      Advance to {REQUEST_FLOW[stepIndex + 1]}
                    </Button>
                  ) : null}
                  <Button asChild size="sm" variant="outline">
                    <a href={`tel:${from?.phone.replace(/\s/g, "")}`}>
                      <Phone className="mr-1 h-4 w-4" /> Call {from?.manager}
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <a href={`mailto:${from?.email}`}>
                      <Mail className="mr-1 h-4 w-4" /> Email store
                    </a>
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
