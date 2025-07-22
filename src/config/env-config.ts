import { config } from 'dotenv'

config()

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
  NODE_ENV,
  PORT,
  JWT_SECRET,
} = process.env

export const envConfig = {
  dbHost: DB_HOST || 'localhost',
  dbPort: DB_PORT || '5432',
  dbUser: DB_USER || 'postgres',
  dbPass: DB_PASS || 'root',
  dbName: DB_NAME || 'postgres',
  nodeEnv: NODE_ENV || 'prod',
  port: PORT || '3000',
  jwtSecret: JWT_SECRET,
}
