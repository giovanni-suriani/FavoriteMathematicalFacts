import AsyncStorage from "@react-native-async-storage/async-storage";

const FACT_COUNT_KEY = "fact_count";

export async function addFact(fact: string) {
  try {
    if (!fact || !fact.trim()) {
      throw new Error("Fact cannot be empty");
    }

    const countRaw = await AsyncStorage.getItem(FACT_COUNT_KEY);
    const count = countRaw ? Number(countRaw) : 0;

    const key = `fact_${count + 1}`;
    await AsyncStorage.setItem(key, fact);

    await AsyncStorage.setItem(FACT_COUNT_KEY, String(count + 1));
    console.log(`Fact added: ${key} = ${fact}`);
    const all_facts = await getAllFacts();
    console.log("All facts:", all_facts);
  } catch (err) {
    console.error("Failed to add fact:", err);
    throw new Error("Could not add fact"); // rethrow with a clear message
  }
}

export async function getAllFacts(): Promise<string[]> {
  try {
    const countRaw = await AsyncStorage.getItem(FACT_COUNT_KEY);
    const count = countRaw ? Number(countRaw) : 0;

    const keys = Array.from({ length: count }, (_, i) => `fact_${i + 1}`);
    const entries = await AsyncStorage.multiGet(keys);

    return entries.map(([_, value]) => value ?? "");
  } catch (err) {
    console.error("Failed to get all facts:", err);
    throw new Error("Could not load facts");
  }
}

export async function clearFacts() {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const factKeys = allKeys.filter(k => k.startsWith("fact_") || k === FACT_COUNT_KEY);
    await AsyncStorage.multiRemove(factKeys);
    console.log("All facts cleared from storage.");
  } catch (err) {
    console.error("Failed to clear facts:", err);
    throw new Error("Could not clear facts");
  }
}

export async function removeFact(key: string) {
  try {
    await AsyncStorage.removeItem(key);
    const countRaw = await AsyncStorage.getItem(FACT_COUNT_KEY);
    const count = countRaw ? Number(countRaw) : 0;

    if (count > 0) {
      await AsyncStorage.setItem(FACT_COUNT_KEY, String(count - 1));
    }
  } catch (err) {
    console.error(`Failed to remove fact ${key}:`, err);
    throw new Error("Could not remove fact");
  }
}
