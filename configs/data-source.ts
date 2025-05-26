import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { DataSource } from 'typeorm'
import { createRequire } from 'module'
import "reflect-metadata"

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "3255",
    database: process.env.DB_DATABASE || "DB-project",
    
    entities: [
        join(dirname(require.resolve('database-entity-service-lib')), 'entity/**/*.js'),
        join(__dirname, "entity/**/*.{ts,js}")
    ],
    
    migrations: [join(__dirname, "../migrations/**/*.{ts,js}")],
    synchronize: false,
    logging: true
})