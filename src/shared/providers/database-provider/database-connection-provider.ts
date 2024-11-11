import { SQLiteProvider } from "./sqlite.provider";

type DatabaseProvider = "sqlite";

const providers = {
  sqlite: SQLiteProvider,
};

export const DatabaseConnectionProvider =
  providers[(process.env.DATABASE_PROVIDER as DatabaseProvider) || "sqlite"];
