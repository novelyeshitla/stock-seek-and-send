export type StoreType = "super" | "mini" | "site";

export const STORE_TYPE_LABEL: Record<StoreType, string> = {
  super: "Super store",
  mini: "Mini store",
  site: "Site store",
};

export type Site = {
  id: string;
  name: string;
  type: StoreType;
  description: string;
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

export type MaterialGroup = "office" | "site";

export const GROUP_LABEL: Record<MaterialGroup, string> = {
  office: "Office accessories",
  site: "Site accessories",
};

export type Reinforcement = {
  id: string;
  diameter: number;
  grade: string;
  length: number;
  weightPerRod: number;
  stock: Stock[];
};

export type Material = {
  id: string;
  name: string;
  group: MaterialGroup;
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
  note?: string | undefined;
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
    name: "Bole Tower Site Store",
    type: "site",
    description: "On-site store serving the Bole Tower high-rise build.",
    city: "Addis Ababa",
    manager: "Sara Bekele",
    phone: "+251 911 234 567",
    email: "sara.bekele@masconstruction.com",
  },
  {
    id: "s2",
    name: "Adama Mini Store",
    type: "mini",
    description: "Regional mini store feeding the Adama Ring Road works.",
    city: "Adama",
    manager: "Yonas Tesfaye",
    phone: "+251 912 887 145",
    email: "yonas.tesfaye@masconstruction.com",
  },
  {
    id: "s3",
    name: "Hawassa Site Store",
    type: "site",
    description: "On-site store for the Hawassa industrial shed package.",
    city: "Hawassa",
    manager: "Meron Alemu",
    phone: "+251 913 550 902",
    email: "meron.alemu@masconstruction.com",
  },
  {
    id: "s4",
    name: "Central Super Store",
    type: "super",
    description: "Main super store — bulk stock and all central procurement.",
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
    group: "site",
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
    group: "site",
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
    group: "site",
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
    group: "site",
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
    group: "site",
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
    group: "site",
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
    group: "site",
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
    group: "site",
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
  {
    id: "m9",
    name: "A4 Copy Paper (Ream)",
    group: "office",
    category: "Stationery",
    unit: "reams",
    sku: "OFF-A4R",
    minLevel: 40,
    stock: [
      { siteId: "s4", quantity: 220, reserved: 20 },
      { siteId: "s2", quantity: 35, reserved: 5 },
      { siteId: "s1", quantity: 18, reserved: 0 },
    ],
  },
  {
    id: "m10",
    name: "Laser Printer Toner",
    group: "office",
    category: "IT & Printing",
    unit: "cartridges",
    sku: "OFF-TNR",
    minLevel: 10,
    stock: [
      { siteId: "s4", quantity: 24, reserved: 2 },
      { siteId: "s2", quantity: 6, reserved: 1 },
    ],
  },
  {
    id: "m11",
    name: "Site Logbook / Register",
    group: "office",
    category: "Stationery",
    unit: "books",
    sku: "OFF-LOG",
    minLevel: 25,
    stock: [
      { siteId: "s4", quantity: 90, reserved: 10 },
      { siteId: "s1", quantity: 12, reserved: 2 },
      { siteId: "s3", quantity: 9, reserved: 0 },
    ],
  },
  {
    id: "m12",
    name: "Office Desk Chair",
    group: "office",
    category: "Furniture",
    unit: "units",
    sku: "OFF-CHR",
    minLevel: 8,
    stock: [
      { siteId: "s4", quantity: 26, reserved: 4 },
      { siteId: "s2", quantity: 7, reserved: 0 },
    ],
  },
  {
    id: "m13",
    name: "Laptop (Site Engineer)",
    group: "office",
    category: "IT & Printing",
    unit: "units",
    sku: "OFF-LTP",
    minLevel: 4,
    stock: [
      { siteId: "s4", quantity: 9, reserved: 2 },
      { siteId: "s1", quantity: 3, reserved: 1 },
    ],
  },
  {
    id: "m14",
    name: "Drawing Plotter Roll A1",
    group: "office",
    category: "IT & Printing",
    unit: "rolls",
    sku: "OFF-PLT",
    minLevel: 15,
    stock: [
      { siteId: "s4", quantity: 40, reserved: 5 },
      { siteId: "s3", quantity: 6, reserved: 1 },
    ],
  },
];

export const reinforcements: Reinforcement[] = [
  {
    id: "r6",
    diameter: 6,
    grade: "S-300",
    length: 12,
    weightPerRod: 2.66,
    stock: [
      { siteId: "s4", quantity: 1800, reserved: 200 },
      { siteId: "s2", quantity: 420, reserved: 40 },
      { siteId: "s1", quantity: 260, reserved: 20 },
    ],
  },
  {
    id: "r8",
    diameter: 8,
    grade: "S-400",
    length: 12,
    weightPerRod: 4.74,
    stock: [
      { siteId: "s4", quantity: 1450, reserved: 150 },
      { siteId: "s2", quantity: 380, reserved: 30 },
      { siteId: "s3", quantity: 190, reserved: 10 },
    ],
  },
  {
    id: "r10",
    diameter: 10,
    grade: "S-400",
    length: 12,
    weightPerRod: 7.4,
    stock: [
      { siteId: "s4", quantity: 1120, reserved: 120 },
      { siteId: "s1", quantity: 340, reserved: 40 },
      { siteId: "s3", quantity: 150, reserved: 0 },
    ],
  },
  {
    id: "r12",
    diameter: 12,
    grade: "S-400",
    length: 12,
    weightPerRod: 10.66,
    stock: [
      { siteId: "s4", quantity: 2200, reserved: 300 },
      { siteId: "s1", quantity: 940, reserved: 120 },
      { siteId: "s2", quantity: 210, reserved: 20 },
    ],
  },
  {
    id: "r14",
    diameter: 14,
    grade: "S-400",
    length: 12,
    weightPerRod: 14.5,
    stock: [
      { siteId: "s4", quantity: 860, reserved: 60 },
      { siteId: "s3", quantity: 120, reserved: 10 },
    ],
  },
  {
    id: "r16",
    diameter: 16,
    grade: "S-400",
    length: 12,
    weightPerRod: 18.94,
    stock: [
      { siteId: "s4", quantity: 640, reserved: 80 },
      { siteId: "s1", quantity: 180, reserved: 20 },
    ],
  },
  {
    id: "r20",
    diameter: 20,
    grade: "S-400",
    length: 12,
    weightPerRod: 29.6,
    stock: [
      { siteId: "s4", quantity: 300, reserved: 40 },
      { siteId: "s2", quantity: 60, reserved: 0 },
    ],
  },
  {
    id: "r24",
    diameter: 24,
    grade: "S-400",
    length: 12,
    weightPerRod: 42.6,
    stock: [{ siteId: "s4", quantity: 120, reserved: 10 }],
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

export const storesByType = (type: StoreType) => sites.filter((s) => s.type === type);
export const materialsAtSite = (siteId: string) =>
  materials.filter((m) => m.stock.some((s) => s.siteId === siteId));
export const reinforcementsAtSite = (siteId: string) =>
  reinforcements.filter((r) => r.stock.some((s) => s.siteId === siteId));
export const availableAt = (stock: Stock[], siteId: string) => {
  const row = stock.find((s) => s.siteId === siteId);
  return row ? row.quantity - row.reserved : 0;
};

export const stockStatus = (m: Material) => {
  const available = totalAvailable(m);
  if (available <= m.minLevel * 0.5) return "critical" as const;
  if (available <= m.minLevel) return "low" as const;
  return "healthy" as const;
};
