// helperStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Fact } from "@/types/math-facts";

const FACT_PREFIX = "fact_";
const FACT_COUNT_KEY = "fact_count"; // optional legacy counter

// ---------- Key helpers ----------
const buildKey = (id: number) => `${FACT_PREFIX}${id}`;
const parseIdFromKey = (key: string): number | null => {
  const m = key.match(/^fact_(\d+)$/);
  return m ? Number(m[1]) : null;
};

// Load all (key,value) for fact_* keys
async function loadAllEntries(): Promise<readonly [string, string | null][]> {
  const allKeys = await AsyncStorage.getAllKeys();
  const factKeys = allKeys.filter((k) => k.startsWith(FACT_PREFIX));
  if (factKeys.length === 0) return [];
  return await AsyncStorage.multiGet(factKeys);  
}


// Compute next id from existing keys
async function computeNextId(): Promise<number> {
  const entries = await loadAllEntries();
  let maxId = 0;
  for (const [key] of entries) {
    const id = parseIdFromKey(key);
    if (id && id > maxId) maxId = id;
  }
  return maxId + 1;
}

// ---------- Public API ----------

/** Add a fact and return the created object with a stable id. */
export async function addFact(fact: string): Promise<Fact> {
  const value = fact?.trim();
  if (!value) throw new Error("Fact cannot be empty");

  const id = await computeNextId();
  const key = buildKey(id);

  await AsyncStorage.setItem(key, value);

  // (Optional) maintain legacy counter; safe but not required
  try {
    const countRaw = await AsyncStorage.getItem(FACT_COUNT_KEY);
    const count = countRaw ? Number(countRaw) : 0;
    const next = Number.isFinite(count) ? Math.max(count, id) : id;
    await AsyncStorage.setItem(FACT_COUNT_KEY, String(next));
  } catch {
    // ignore counter failures
  }

  return { id, fact: value };
}

/** Get facts as objects: [{ id, fact }, ...], sorted by id asc. */
export async function getAllFactsAsObjects(): Promise<Fact[]> {
  const entries = await loadAllEntries();
  const facts: Fact[] = [];

  for (const [key, value] of entries) {
    const id = parseIdFromKey(key);
    if (id && typeof value === "string") {
      facts.push({ id, fact: value });
    }
  }

  facts.sort((a, b) => a.id - b.id);
  return facts;
}

/** Get facts as plain strings (order by id asc). */
// export async function getAllFacts(): Promise<string[]> {
//   const objs = await getAllFactsAsObjects();
//   return objs.map((o) => o.fact);
// }
// 

export async function getAllFacts(): Promise<Fact[]>{
  const entries = await loadAllEntries();
  const facts: Fact[] = [];

  for (const [key, value] of entries) {
    const id = parseIdFromKey(key);
    if (id && typeof value === "string") {
      facts.push({ id, fact: value });
    }
  }

  facts.sort((a, b) => a.id - b.id);
  return facts;
}

/** Replace the text of a fact by id. Returns updated fact, or throws if missing. */
export async function updateFact(id: number, fact: string): Promise<Fact> {
  const value = fact?.trim();
  if (!value) throw new Error("Fact cannot be empty");

  const key = buildKey(id);
  const exists = await AsyncStorage.getItem(key);
  if (exists === null) throw new Error(`Fact ${id} not found`);

  await AsyncStorage.setItem(key, value);
  return { id, fact: value };
}

/** Remove a fact by id. No compaction; ids remain stable. */
export async function removeFactById(id: number): Promise<void> {
  await AsyncStorage.removeItem(buildKey(id));

  // (Optional) adjust legacy counter downwards if you want strictly “max id”
  try {
    const currentRaw = await AsyncStorage.getItem(FACT_COUNT_KEY);
    const current = currentRaw ? Number(currentRaw) : 0;
    if (current === id) {
      // recompute max id among remaining items
      const entries = await loadAllEntries();
      let maxId = 0;
      for (const [key] of entries) {
        const kId = parseIdFromKey(key);
        if (kId && kId > maxId) maxId = kId;
      }
      await AsyncStorage.setItem(FACT_COUNT_KEY, String(maxId));
    }
  } catch {
    // ignore counter failures
  }
}

/** Remove by storage key directly (e.g., "fact_7"). */
export async function removeFactByKey(key: string): Promise<void> {
  if (!key.startsWith(FACT_PREFIX)) throw new Error("Invalid fact key");
  await AsyncStorage.removeItem(key);
}

/** Clear all facts and the legacy counter. */
export async function clearFacts(): Promise<void> {
  const entries = await loadAllEntries();
  if (entries.length) {
    await AsyncStorage.multiRemove(entries.map(([k]) => k));
  }
  await AsyncStorage.removeItem(FACT_COUNT_KEY);
}

/** Convenience: ensure there’s at least one example fact (dev only). */
export async function seedIfEmpty(sample: string = "E = mc^2"): Promise<void> {
  const entries = await loadAllEntries();
  if (entries.length === 0) {
    await addFact(sample);
  }
}
