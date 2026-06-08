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

function wrapWithRetry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context: any,
  isGetConnection = false
): T {
  return (async (...args: any[]) => {
    try {
      const result = await fn.apply(context, args);
      if (isGetConnection && result) {
        return wrapConnection(result);
      }
      return result;
    } catch (err: any) {
      if (
        err &&
        (err.code === "ECONNRESET" ||
          err.code === "PROTOCOL_CONNECTION_LOST" ||
          err.code === "EPIPE" ||
          err.code === "ETIMEDOUT")
      ) {
        console.warn(`[Database] Connection error ${err.code}. Retrying operation once...`);
        const result = await fn.apply(context, args);
        if (isGetConnection && result) {
          return wrapConnection(result);
        }
        return result;
      }
      throw err;
    }
  }) as unknown as T;
}

function wrapConnection(connection: any): any {
  return new Proxy(connection, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (
        typeof value === "function" &&
        (prop === "query" || prop === "execute")
      ) {
        return wrapWithRetry(value, target);
      }
      return value;
    },
  });
}

const rawPool =
  dbHost && dbUser && dbPassword && dbName
    ? mysql.createPool({
        host: dbHost,
        user: dbUser,
        password: dbPassword,
        database: dbName,
        port: parseInt(dbPort, 10),
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 30000, // Close idle connections after 30 seconds
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000, // Probe every 10 seconds
      })
    : null;

const pool =
  rawPool
    ? new Proxy(rawPool, {
        get(target, prop, receiver) {
          const value = Reflect.get(target, prop, receiver);
          if (
            typeof value === "function" &&
            (prop === "query" || prop === "execute" || prop === "getConnection")
          ) {
            return wrapWithRetry(value, target, prop === "getConnection");
          }
          return value;
        },
      })
    : createMissingEnvPool();

export default pool;
