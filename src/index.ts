import {DatabaseService} from './service.ts';
import {readFileSync} from 'node:fs';
import { AppDataSource } from '../configs/data-source.ts'
import { User, UserService } from 'database-entity-service-lib';

function index (): void {
  let userService: UserService = new UserService(AppDataSource);
  let serviceConfigFileContent = readFileSync('./configs/service-config.json', 'utf8');
  
  let serviceConfig = JSON.parse(serviceConfigFileContent);
  let service: DatabaseService = new DatabaseService({
        port: serviceConfig.port,
        host: serviceConfig.host,
      },
      {
        host: serviceConfig.host,
        port: serviceConfig.port,
        database: serviceConfig.database,
        user: serviceConfig.user,
        password: serviceConfig.password,
      });

  service.start();

}


index()