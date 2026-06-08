import mysql from "mysql2/promise";
import type { Pool } from "mysql2/promise";

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT || "3306";

const missingDbEnvMessage =
  "Missing database environment variables. Please configure DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME.";

function createMissingEnvPool(): Pool {
  return new Proxy({} as Pool, {
    get() {
      throw new Error(missingDbEnvMessage);
    },
  });
}

const pool =
  dbHost && dbUser && dbPassword && dbName
    ? mysql.createPool({
        host: dbHost,
        user: dbUser,
        password: dbPassword,
        database: dbName,
        port: parseInt(dbPort, 10),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
      })
    : createMissingEnvPool();

export default pool;
