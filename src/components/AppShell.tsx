import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Package, ClipboardList, Phone, HardHat } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/inventory", label: "Inventory", icon: Package },
  { to: "/requests", label: "Requests", icon: ClipboardList },
  { to: "/contacts", label: "Store managers", icon: Phone },
] as const;

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background md:flex">
      <aside className="bg-sidebar text-sidebar-foreground md:w-64 md:shrink-0">
        <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground">
            <HardHat className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg leading-none font-bold tracking-wide uppercase">
              MAS Construction
            </p>
            <p className="text-xs text-sidebar-foreground/60">Inventory management</p>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto p-3 md:flex-col">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex items-center gap-2 rounded px-3 py-2 text-sm whitespace-nowrap text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeProps={{
                className:
                  "bg-sidebar-primary text-sidebar-primary-foreground font-semibold hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
              }}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1">
        <header className="border-b border-border bg-card px-5 py-5 md:px-8">
          <h1 className="font-display text-3xl font-bold tracking-wide uppercase">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
        </header>
        <div className="px-5 py-6 md:px-8">{children}</div>
      </main>
    </div>
  );
}
