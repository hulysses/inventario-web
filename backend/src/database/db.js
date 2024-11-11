import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve('../inventario-web.db');

export const db = new Database(dbPath);