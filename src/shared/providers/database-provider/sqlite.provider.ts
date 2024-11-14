import { AppError } from "@/shared/errors";
import sqlite3 from "sqlite3";
import { singleton } from "tsyringe";

@singleton()
export class SQLiteProvider {
  private db: sqlite3.Database;
  private initPromise: Promise<void>;

  constructor() {
    this.db = new sqlite3.Database(":memory:", async (err) => {
      if (err) {
        console.error("Failed to connect to database:", err.message);
        return;
      }
    });
    this.initPromise = this.initialize();
  }

  public async initialize(): Promise<void> {
    await this.runQuery(`
      CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        year INTEGER,
        title TEXT,
        studios TEXT,
        producers TEXT,
        winner TEXT
      );
    `);
  }

  private async ensureInitialized(): Promise<void> {
    await this.initPromise;
  }

  public async createQuery(query: string, params: any[] = []): Promise<number> {
    await this.ensureInitialized();
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) {
          console.error("Failed to run query:", err.message);
          return reject(new AppError(err.message, 460));
        }
        return resolve(this.lastID);
      });
    });
  }
  public async runQuery(query: string, params: any[] = []): Promise<void> {
    await this.ensureInitialized();
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) {
          console.error("Failed to run query:", err.message);
          return reject(new AppError(err.message, 460));
        }
        return resolve();
      });
    });
  }

  public async get<T = any>(
    query: string,
    params: any[] = []
  ): Promise<T | undefined> {
    await this.ensureInitialized();
    return new Promise((resolve, reject) => {
      this.db.get(query, params, (err, row) => {
        if (err) {
          console.error("Fail to run get query:", err.message);
          return reject(new AppError(err.message, 460));
        }
        return resolve(row as T);
      });
    });
  }

  public async getAll<T = any>(
    query: string,
    params: any[] = []
  ): Promise<T[]> {
    await this.ensureInitialized();
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err) {
          console.error("Erro ao executar query:", err.message);
          return reject(new AppError(err.message, 460));
        }
        return resolve(rows as T[]);
      });
    });
  }

  public close(): void {
    this.db.close((err) => {
      if (err) {
        console.error("Failed to close database connection:", err.message);
        return;
      }
    });
  }
}
