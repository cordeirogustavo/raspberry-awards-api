export interface IDatabaseConnectionProvider {
  initialize(): Promise<void>;
  runQuery(query: string, params: any[]): Promise<void>;
  createQuery(query: string, params: any[]): Promise<number>;
  get<T = any>(query: string, params: any[]): Promise<T | undefined>;
  getAll<T = any>(query: string, params: any[]): Promise<T[]>;
  close(): void;
}
