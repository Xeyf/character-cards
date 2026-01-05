// Shared storage module for card data
// This provides a singleton in-memory store and KV accessor

export type SharedCardData = {
  sheet: any;
  prompt?: string;
  createdAt: number;
};

// Singleton in-memory store
class MemoryStore {
  private static instance: MemoryStore;
  private store: Map<string, SharedCardData>;

  private constructor() {
    this.store = new Map();
  }

  static getInstance(): MemoryStore {
    if (!MemoryStore.instance) {
      MemoryStore.instance = new MemoryStore();
    }
    return MemoryStore.instance;
  }

  set(id: string, data: SharedCardData): void {
    this.store.set(id, data);
  }

  get(id: string): SharedCardData | null {
    return this.store.get(id) || null;
  }
}

// Lazy-loaded KV instance
let kvInstance: any = null;
let kvLoadAttempted = false;

function getKV() {
  if (!kvLoadAttempted) {
    kvLoadAttempted = true;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      kvInstance = require("@vercel/kv").kv;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.warn("Vercel KV not available, using in-memory storage");
    }
  }
  return kvInstance;
}

// Storage interface
export const storage = {
  async set(id: string, data: SharedCardData): Promise<void> {
    const kv = getKV();
    if (kv) {
      try {
        await kv.set(`card:${id}`, JSON.stringify(data), { ex: 90 * 24 * 60 * 60 });
        return;
      } catch (error) {
        console.error("KV storage failed, falling back to in-memory:", error);
      }
    }
    MemoryStore.getInstance().set(id, data);
  },

  async get(id: string): Promise<SharedCardData | null> {
    const kv = getKV();
    if (kv) {
      try {
        const stored = await kv.get(`card:${id}`);
        if (stored) {
          return typeof stored === "string" ? JSON.parse(stored) : stored;
        }
      } catch (error) {
        console.error("KV retrieval failed, trying in-memory:", error);
      }
    }
    return MemoryStore.getInstance().get(id);
  },
};
