import { createContext, useContext, useMemo, useState } from "react";
import { weddings as demoWeddings, type Wedding } from "@/data";

type WorkspaceContextValue = {
  weddings: Wedding[];
  addWedding: (input: Omit<Wedding, "id">) => Wedding;
  updateWedding: (id: string, input: Partial<Omit<Wedding, "id">>) => void;
};

const STORAGE_KEY = "world-wedding-local-weddings";
const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

function readLocalWeddings(): Wedding[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Wedding[]) : [];
  } catch {
    return [];
  }
}

function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [localWeddings, setLocalWeddings] = useState<Wedding[]>(readLocalWeddings);
  const weddings = useMemo(() => {
    const overrides = new Map(localWeddings.map((wedding) => [wedding.id, wedding]));
    const mergedDemos = demoWeddings.map((wedding) => overrides.get(wedding.id) ? { ...wedding, ...overrides.get(wedding.id) } : wedding);
    return [...mergedDemos, ...localWeddings.filter((wedding) => !demoWeddings.some((demo) => demo.id === wedding.id))];
  }, [localWeddings]);

  function persist(next: Wedding[]) {
    setLocalWeddings(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function addWedding(input: Omit<Wedding, "id">) {
    const baseId = slugify(input.couple) || "nouveau-mariage";
    const suffix = Date.now().toString(36).slice(-4);
    const wedding = { ...input, id: `${baseId}-${suffix}` };
    persist([...localWeddings, wedding]);
    return wedding;
  }

  function updateWedding(id: string, input: Partial<Omit<Wedding, "id">>) {
    const current = localWeddings.find((wedding) => wedding.id === id) ?? demoWeddings.find((wedding) => wedding.id === id);
    if (!current) return;
    const next = localWeddings.some((wedding) => wedding.id === id)
      ? localWeddings.map((wedding) => wedding.id === id ? { ...wedding, ...input } : wedding)
      : [...localWeddings, { ...current, ...input }];
    persist(next);
  }

  return <WorkspaceContext.Provider value={{ weddings, addWedding, updateWedding }}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return context;
}
