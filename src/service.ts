import * as Hapi from "@hapi/hapi";
import pg from 'pg';
import Boom from '@hapi/boom';

import {DataSource} from "typeorm";
import {AppDataSource} from '../configs/data-source.js';

const { Pool } = pg;

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
    private readonly dataSource: DataSource;
    private readonly INTERNAL_SERVICE_TOKEN: string;
    
    
    constructor(serviceOptions: DatabaseServiceOptions, databaseOptions: DatabaseOptions) {
        this.port = serviceOptions.port;
        this.host = serviceOptions.host || 'localhost';
        this.INTERNAL_SERVICE_TOKEN = process.env.INTERNAL_SERVICE_TOKEN || 'default-token';
        
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
        
        
        // Стратегия аутентификации
        /*
        this.server.auth.strategy('custom', 'custom', {

            authenticate: async (request: Hapi.Request, responseToolkit: Hapi.ResponseToolkit) => {
                const authHeader = request.headers.authorization;
                
                try {
                    const response = await fetch(`${AuthServiceInfo.AUTH_SERVICE_URL}/auth`, {
                        method: 'POST',
                        headers: {
                            'Authorization': authHeader
                        }
                    });
                    
                    if (!response.ok) {
                        Boom.unauthorized('Invalid token');
                    }
                    
                    const data = await response.json();
                    return responseToolkit.authenticated({ credentials: data.user });
                } catch (error) {
                    throw Boom.unauthorized('Authentication failed');
                }
            }
        });
         */

        this.dataSource = AppDataSource;
        
        this.server.route({
            method: 'GET',
            path: '/internal/data-source',
            options: {
                auth: false,
                handler: this.handleDataSourceRequest.bind(this),
                pre: [{
                    method: this.validateInternalToken.bind(this),
                }]
            }
        });
    }
    
    private validateInternalToken(request: Hapi.Request): Hapi.Lifecycle.ReturnValue {
        const token = request.headers['service-token'];
        
        if (!(token && token == this.INTERNAL_SERVICE_TOKEN)) {
            throw Boom.unauthorized('Invalid service token');
        }
        
        return null;
    }

    private async handleDataSourceRequest(): Promise<any> {
        if (!this.dataSource.isInitialized) {
            await this.dataSource.initialize();
        }

        // Вытаскиваем только нужный config
        // const config = {
        //     type: this.dataSource.options.type,
        //     host: this.dataSource.options.host,
        //     port: this.dataSource.options.port,
        //     username: this.dataSource.options.username,
        //     password: this.dataSource.options.password,
        //     database: this.dataSource.options.database,
        //     synchronize: this.dataSource.options.synchronize,
        //     logging: this.dataSource.options.logging,
        //     entities: this.dataSource.options.entities,
        //     migrations: this.dataSource.options.migrations,
        //     subscribers: this.dataSource.options.subscribers,
        // };

        return {
            type: this.dataSource.options.type,
            host: 'host' in this.dataSource.options ? this.dataSource.options.host : undefined,
            port: 'port' in this.dataSource.options ? this.dataSource.options.port : undefined,
            username: 'username' in this.dataSource.options ? this.dataSource.options.username : undefined,
            password: 'password' in this.dataSource.options ? this.dataSource.options.password : undefined,
            database: this.dataSource.options.database,
            synchronize: this.dataSource.options.synchronize,
            logging: this.dataSource.options.logging,
            entities: this.dataSource.options.entities,
            migrations: this.dataSource.options.migrations,
            subscribers: this.dataSource.options.subscribers,
        };
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
            
            process.on('SIGTERM', async () => {
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
