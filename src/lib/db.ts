import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import sqlite from 'better-sqlite3';
import { sessionTable, userTable } from 'db/schema';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sqliteDB = sqlite('./db/demo.db', { verbose: console.log });
export const db = drizzle(sqliteDB);

export const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
