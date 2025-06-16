//data-source.ts
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { DataSource } from 'typeorm'
import { createRequire } from 'module'
import "reflect-metadata"

import * as Entities from 'database-entity-service-lib';

const allEntities = Object.values(Entities).filter(e => typeof e === 'function');

const __dirname = dirname(fileURLToPath(import.meta.url))

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
    port: parseInt(process.env.DB_PORT ? process.env.DB_PORT : "5432"),
    username: process.env.DB_USERNAME ? process.env.DB_USERNAME : "postgres",
    password: process.env.DB_PASSWORD || "3255",
    database: process.env.DB_DATABASE || "DB-project",
    
    entities: allEntities,
    
    migrations: [join(__dirname, "../migrations/**/*.{ts,js}")],
    synchronize: false,
    logging: true
})