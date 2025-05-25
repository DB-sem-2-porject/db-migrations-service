import jwt from 'jsonwebtoken'
import * as Hapi from "@hapi/hapi";
import pg from 'pg';
import { QueryResult } from "pg";
const { Pool } = pg;
import Boom from '@hapi/boom';

import {DataSource} from "typeorm";
import { AuthServiceInfo } from './auth-service-info.js';

export interface DatabaseServiceOptions {
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

export class DatabaseService {
    private port: number;
    private host: string;
    private server: Hapi.Server;
    private secretPhrase: string = "secret";
    private pool: pg.Pool;
    
    
    constructor(serviceOptions: DatabaseServiceOptions, databaseOptions: DatabaseOptions) {
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
        
        
        // Регистрируем стратегию аутентификации
        this.server.auth.strategy('custom', 'custom', {
            authenticate: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                const authHeader = request.headers.authorization;
                
                try {
                    const response = await fetch(`${AuthServiceInfo.AUTH_SERVICE_URL}/auth`, {
                        method: 'POST',
                        headers: {
                            'Authorization': authHeader
                        }
                    });
                    
                    if (!response.ok) {
                        throw Boom.unauthorized('Invalid token');
                    }
                    
                    const data = await response.json();
                    return h.authenticated({ credentials: data.user });
                } catch (err) {
                    throw Boom.unauthorized('Authentication failed');
                }
            }
        });
        
        
        this.server.route({
            method: 'POST',
            path: '/sql-query',
            options: {
                auth: 'auth-service',
                description: 'Execute SQL query',
                tags: ['api'],
            },
            handler: this.handleSqlQuery.bind(this)
        });
    }

    private async handleSqlQuery(request: Hapi.Request, responseToolkit: Hapi.ResponseToolkit) {
        const { query } = request.payload as { query: string };
        if (!query) {
            return responseToolkit.response({ error: 'Query is required' }).code(400);
        }
        try {
            const result: QueryResult = await this.pool.query(query);
            return { rows: result.rows, fields: result.fields?.map(f => f.name) };
        } catch (err: any) {
            return responseToolkit.response({ error: err.message }).code(400);
        }
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
