export type Site = {
  id: string;
  name: string;
  city: string;
  manager: string;
  phone: string;
  email: string;
};

export type Stock = {
  siteId: string;
  quantity: number;
  reserved: number;
};

export type Material = {
  id: string;
  name: string;
  category: string;
  unit: string;
  sku: string;
  minLevel: number;
  stock: Stock[];
};

export type RequestStatus = "Submitted" | "Approved" | "In transit" | "Delivered";

export type MaterialRequest = {
  id: string;
  materialId: string;
  fromSiteId: string;
  toSiteId: string;
  quantity: number;
  status: RequestStatus;
  requestedBy: string;
  createdAt: string;
  note?: string;
};

export const REQUEST_FLOW: RequestStatus[] = [
  "Submitted",
  "Approved",
  "In transit",
  "Delivered",
];

export const sites: Site[] = [
  {
    id: "s1",
    name: "Bole Tower Project",
    city: "Addis Ababa",
    manager: "Sara Bekele",
    phone: "+251 911 234 567",
    email: "sara.bekele@masconstruction.com",
  },
  {
    id: "s2",
    name: "Adama Ring Road",
    city: "Adama",
    manager: "Yonas Tesfaye",
    phone: "+251 912 887 145",
    email: "yonas.tesfaye@masconstruction.com",
  },
  {
    id: "s3",
    name: "Hawassa Industrial Shed",
    city: "Hawassa",
    manager: "Meron Alemu",
    phone: "+251 913 550 902",
    email: "meron.alemu@masconstruction.com",
  },
  {
    id: "s4",
    name: "Central Warehouse",
    city: "Addis Ababa",
    manager: "Abel Girma",
    phone: "+251 914 010 778",
    email: "abel.girma@masconstruction.com",
  },
];

export const materials: Material[] = [
  {
    id: "m1",
    name: "Portland Cement 50kg",
    category: "Binders",
    unit: "bags",
    sku: "CEM-050",
    minLevel: 200,
    stock: [
      { siteId: "s1", quantity: 120, reserved: 20 },
      { siteId: "s2", quantity: 640, reserved: 40 },
      { siteId: "s4", quantity: 1850, reserved: 150 },
    ],
  },
  {
    id: "m2",
    name: "Rebar Ø12mm",
    category: "Steel",
    unit: "rods",
    sku: "RBR-012",
    minLevel: 300,
    stock: [
      { siteId: "s1", quantity: 940, reserved: 120 },
      { siteId: "s3", quantity: 180, reserved: 0 },
      { siteId: "s4", quantity: 2200, reserved: 300 },
    ],
  },
  {
    id: "m3",
    name: "Scaffolding Frame 2m",
    category: "Equipment",
    unit: "units",
    sku: "SCF-200",
    minLevel: 80,
    stock: [
      { siteId: "s2", quantity: 210, reserved: 30 },
      { siteId: "s3", quantity: 45, reserved: 5 },
    ],
  },
  {
    id: "m4",
    name: "Hollow Concrete Block 20cm",
    category: "Masonry",
    unit: "pcs",
    sku: "HCB-200",
    minLevel: 1000,
    stock: [
      { siteId: "s1", quantity: 4200, reserved: 400 },
      { siteId: "s2", quantity: 760, reserved: 60 },
      { siteId: "s4", quantity: 12000, reserved: 900 },
    ],
  },
  {
    id: "m5",
    name: "Waterproof Membrane Roll",
    category: "Finishing",
    unit: "rolls",
    sku: "WPM-010",
    minLevel: 40,
    stock: [
      { siteId: "s3", quantity: 12, reserved: 2 },
      { siteId: "s4", quantity: 96, reserved: 10 },
    ],
  },
  {
    id: "m6",
    name: "Diesel Generator 20kVA",
    category: "Equipment",
    unit: "units",
    sku: "GEN-020",
    minLevel: 2,
    stock: [
      { siteId: "s2", quantity: 3, reserved: 1 },
      { siteId: "s4", quantity: 5, reserved: 0 },
    ],
  },
  {
    id: "m7",
    name: "Timber Formwork Panel",
    category: "Formwork",
    unit: "panels",
    sku: "TFP-120",
    minLevel: 150,
    stock: [
      { siteId: "s1", quantity: 60, reserved: 10 },
      { siteId: "s3", quantity: 320, reserved: 20 },
    ],
  },
  {
    id: "m8",
    name: "Binding Wire 25kg",
    category: "Steel",
    unit: "coils",
    sku: "BWR-025",
    minLevel: 30,
    stock: [
      { siteId: "s1", quantity: 44, reserved: 4 },
      { siteId: "s2", quantity: 18, reserved: 0 },
      { siteId: "s4", quantity: 130, reserved: 15 },
    ],
  },
];

export const initialRequests: MaterialRequest[] = [
  {
    id: "REQ-1041",
    materialId: "m1",
    fromSiteId: "s4",
    toSiteId: "s1",
    quantity: 300,
    status: "In transit",
    requestedBy: "Site Engineer — Bole",
    createdAt: "2026-08-12",
    note: "Needed for slab casting on Friday.",
  },
  {
    id: "REQ-1039",
    materialId: "m5",
    fromSiteId: "s4",
    toSiteId: "s3",
    quantity: 25,
    status: "Approved",
    requestedBy: "Store Clerk — Hawassa",
    createdAt: "2026-08-10",
  },
  {
    id: "REQ-1032",
    materialId: "m3",
    fromSiteId: "s2",
    toSiteId: "s3",
    quantity: 40,
    status: "Delivered",
    requestedBy: "Foreman — Hawassa",
    createdAt: "2026-08-04",
  },
];

export const siteById = (id: string) => sites.find((s) => s.id === id);
export const materialById = (id: string) => materials.find((m) => m.id === id);

export const totalAvailable = (m: Material) =>
  m.stock.reduce((sum, s) => sum + (s.quantity - s.reserved), 0);

export const stockStatus = (m: Material) => {
  const available = totalAvailable(m);
  if (available <= m.minLevel * 0.5) return "critical" as const;
  if (available <= m.minLevel) return "low" as const;
  return "healthy" as const;
};
