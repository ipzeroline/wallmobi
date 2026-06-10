import mysql from "mysql2/promise";
import type { Pool } from "mysql2/promise";

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT || "3306";
const dbConnectionLimit = Math.max(1, parseInt(process.env.DB_CONNECTION_LIMIT || "4", 10) || 4);
const dbIdleLimit = Math.max(1, Math.min(dbConnectionLimit, parseInt(process.env.DB_MAX_IDLE || String(dbConnectionLimit), 10) || dbConnectionLimit));
const dbQueueLimit = Math.max(0, parseInt(process.env.DB_QUEUE_LIMIT || "200", 10) || 200);
const dbConnectTimeout = Math.max(1000, parseInt(process.env.DB_CONNECT_TIMEOUT_MS || "10000", 10) || 10000);

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
      const retryableCodes = new Set([
        "ECONNRESET",
        "PROTOCOL_CONNECTION_LOST",
        "EPIPE",
        "ETIMEDOUT",
        "EADDRNOTAVAIL",
      ]);

      if (err && retryableCodes.has(err.code)) {
        console.warn(`[Database] Connection error ${err.code}. Retrying operation once...`);
        await new Promise((resolve) => setTimeout(resolve, 250));
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
        connectionLimit: dbConnectionLimit,
        maxIdle: dbIdleLimit,
        queueLimit: dbQueueLimit,
        connectTimeout: dbConnectTimeout,
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
