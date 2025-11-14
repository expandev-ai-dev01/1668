import sql, { ConnectionPool, IRecordSet, IResult, Request } from 'mssql';
import { config } from '@/config';
import { logger } from './logger';

let pool: ConnectionPool;

const dbConfig = {
  server: config.database.server,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  options: {
    ...config.database.options,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

export const getPool = async (): Promise<ConnectionPool> => {
  if (pool && pool.connected) {
    return pool;
  }
  try {
    pool = new ConnectionPool(dbConfig);
    await pool.connect();
    logger.info('Database connection pool established.');
    pool.on('error', (err) => {
      logger.error('Database pool error:', err);
      // You might want to handle pool errors, e.g., by trying to reconnect
    });
    return pool;
  } catch (err) {
    logger.error('Database connection failed:', err);
    throw new Error('Failed to establish database connection.');
  }
};

export const dbRequest = async (): Promise<Request> => {
  const connectionPool = await getPool();
  return connectionPool.request();
};

export const executeProcedure = async <T>(
  procedureName: string,
  params: Record<string, any>
): Promise<IRecordSet<T>> => {
  const request = await dbRequest();
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      // mssql library will infer the type
      request.input(key, params[key]);
    }
  }
  const result: IResult<T> = await request.execute(procedureName);
  return result.recordset;
};
