import { DataSource } from 'typeorm'
import { join } from 'path'
import 'reflect-metadata'

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "3255",
  database: process.env.DB_DATABASE || "DB-project",
  
  entities: [
    join(process.cwd(), "node_modules/database-entity-service-lib/dist/entities/**/*.js")
  ],
  
  migrations: [
    join(process.cwd(), "migrations/**/*.{ts,js}")
  ],
  
  synchronize: false,
})