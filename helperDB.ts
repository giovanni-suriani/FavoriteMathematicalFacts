// db.ts
import { type SQLiteDatabase } from "expo-sqlite"
import { type Fact } from "@/types/math-facts"

export async function initializeDatabase(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS mathematicalFacts (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      fact TEXT NOT NULL
    );
  `)

  console.info("Database initialized and table ensured.")
}

// export async function insertFact(db: SQLiteDatabase, fact: string) {
//   const result = await db.runAsync(
//     `INSERT INTO mathematicalFacts (fact) VALUES (?)`,
//     [fact]
//   )
//   console.info(`Inserted fact with id: ${result.lastInsertRowId}`);
//   return result.lastInsertRowId;
// }

// Writing with new Fact type
export async function insertFact(
  db: SQLiteDatabase,
  fact: string
): Promise<Fact> {
  const result = await db.runAsync(
    `INSERT INTO mathematicalFacts (fact) VALUES (?)`,
    [fact]
  )
  const id = result.lastInsertRowId
  console.info(`Inserted fact with id: ${id}`)
  return { id, fact }
}

export async function getAllFacts(db: SQLiteDatabase): Promise<Fact[]> {
  const result = await db.getAllAsync(`SELECT * FROM mathematicalFacts`)
  const rows = result as Fact[]
  console.info(`Retrieved ${result.length} facts from the database.`)
  return rows.map((row) => ({ id: row.id, fact: row.fact }))
}

export async function deleteFact(db: SQLiteDatabase, id: number) {
  await db.runAsync(`DELETE FROM mathematicalFacts WHERE id = ?`, [id])
  console.info(`Deleted fact with id: ${id}`)
}

export async function deleteAllFacts(db: SQLiteDatabase) {
  await db.runAsync(`DELETE FROM mathematicalFacts`)
  console.info("Deleted all facts from the database.")
}
