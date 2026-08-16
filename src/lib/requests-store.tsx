import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  initialRequests,
  REQUEST_FLOW,
  type MaterialRequest,
  type RequestStatus,
} from "./mock-data";

type NewRequest = {
  materialId: string;
  fromSiteId: string;
  toSiteId: string;
  quantity: number;
  note?: string | undefined;
};

type Ctx = {
  requests: MaterialRequest[];
  createRequest: (input: NewRequest) => MaterialRequest;
  advance: (id: string) => void;
};

const RequestsContext = createContext<Ctx | null>(null);

export function RequestsProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<MaterialRequest[]>(initialRequests);

  const createRequest = useCallback((input: NewRequest) => {
    const req: MaterialRequest = {
      id: `REQ-${1100 + Math.floor(Math.random() * 800)}`,
      status: "Submitted",
      requestedBy: "You (Site Engineer)",
      createdAt: new Date().toISOString().slice(0, 10),
      ...input,
    };
    setRequests((prev) => [req, ...prev]);
    return req;
  }, []);

  const advance = useCallback((id: string) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const next = REQUEST_FLOW[Math.min(REQUEST_FLOW.indexOf(r.status) + 1, REQUEST_FLOW.length - 1)];
        return { ...r, status: next as RequestStatus };
      }),
    );
  }, []);

  const value = useMemo(() => ({ requests, createRequest, advance }), [requests, createRequest, advance]);

  return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>;
}

export function useRequests() {
  const ctx = useContext(RequestsContext);
  if (!ctx) throw new Error("useRequests must be used inside RequestsProvider");
  return ctx;
}
