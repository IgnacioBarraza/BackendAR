import { DataSource } from 'typeorm'
import { envConfig } from './env-config'

const { dbHost, dbPort, dbUser, dbPass, dbName, nodeEnv } = envConfig

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbHost || 'localhost',
  port: dbPort ? parseInt(dbPort, 10) : 5432,
  username: dbUser || 'postgres',
  password: dbPass || 'postgres',
  database: dbName || 'postgres',
  synchronize: nodeEnv === 'dev',
  logging: nodeEnv === 'dev',
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
})

export const initDatabase = async () => {
  await AppDataSource.initialize()
}
