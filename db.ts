// db.ts
import { type SQLiteDatabase } from "expo-sqlite"

export async function initializeDatabase(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS mathematicalFacts (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      fact TEXT NOT NULL
    );
  `)
  console.info("Database initialized and table ensured.");
}


