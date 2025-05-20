import { DataSource } from 'typeorm';
import { User } from './entity/users.ts';
// ... импорт остальных сущностей

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'my_database',

    entities: [User, /* и другие */],
    migrations: ['migrations/*.ts'],
    migrationsTableName: 'migrations_history',



    synchronize: false,         // Никогда не используй true на проде
    logging: false,             // Включи true, если нужно видеть SQL
});
