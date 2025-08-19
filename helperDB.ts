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

export async function insertFact(db: SQLiteDatabase, fact: string) {
  const result = await db.runAsync(
    `INSERT INTO mathematicalFacts (fact) VALUES (?)`,
    [fact]
  )
  console.info(`Inserted fact with id: ${result.lastInsertRowId}`);
  return result.lastInsertRowId;
}

export async function getAllFacts(db: SQLiteDatabase) {
  const result = await db.getAllAsync(`SELECT * FROM mathematicalFacts`);
  return result 
}

export async function deleteFact(db: SQLiteDatabase, id: number) {
  await db.runAsync(`DELETE FROM mathematicalFacts WHERE id = ?`, [id]);
  console.info(`Deleted fact with id: ${id}`);
}

export async function deleteAllFacts(db: SQLiteDatabase) {
  await db.runAsync(`DELETE FROM mathematicalFacts`);
  console.info("Deleted all facts from the database.");
}
