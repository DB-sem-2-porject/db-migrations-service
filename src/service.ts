import jwt from 'jsonwebtoken'
import * as Hapi from "@hapi/hapi";
import pg from 'pg';
import { QueryResult } from "pg";
const { Pool } = pg;

import {DataSource} from "typeorm";



export interface AuthServiceOptions {
    port: number;
    host?: string;
}
interface AuthPayload {
    email: string;
    password: string;
}

export interface LoginServiceOptions {
    port: number;
    host?: string;
}
export interface DatabaseOptions {
    user: string;
    host?: string;
    database: string;
    password: string;
    port: number;
}
interface LoginPayload {
    email: string;
    password: string;
}

export class AuthService {
    private port: number;
    private host: string;
    private server: Hapi.Server;
    private secretPhrase: string = "secret";
    private pool: pg.Pool;


    constructor(serviceOptions: AuthServiceOptions, databaseOptions: DatabaseOptions) {
        this.port = serviceOptions.port;
        this.host = serviceOptions.host || 'localhost';

        this.server = Hapi.server({
            port: serviceOptions.port,
            host: serviceOptions.host || 'localhost',
        });

        this.pool = new Pool({
            host: databaseOptions.host || 'localhost',
            port: databaseOptions.port,
            database: databaseOptions.database,
            user: databaseOptions.user,
            password: databaseOptions.password,
        });
    }


    public start(): void {

        try {
            this.server.start().then(r => {
            });
            process.on('SIGINT', async () => {
                console.log('\nStopping server...');
                await this.server.stop();
                process.exit(0);
            });
            console.log(`Server running at: ${this.server.info.uri}`);
        } catch (err) {
            console.error('Failed to start server:', err);
            process.exit(1);
        }
    }
}