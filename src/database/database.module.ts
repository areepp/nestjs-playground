import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PostgresDialect } from 'kysely';
import { Database } from './database.model';
import {
  ConfigurableModuleClass,
  DATABASE_OPTIONS,
  DatabaseOptions,
} from './database.module-definition';

@Global()
@Module({
  exports: [Database],
  providers: [
    {
      provide: Database,
      inject: [DATABASE_OPTIONS],
      useFactory: (databaseOptions: DatabaseOptions) => {
        const dialect = new PostgresDialect({
          pool: new Pool({
            host: databaseOptions.host,
            port: databaseOptions.port,
            user: databaseOptions.user,
            password: databaseOptions.password,
            database: databaseOptions.database,
          }),
        });

        return new Database({
          dialect,
        });
      },
    },
  ],
})
export class DatabaseModule extends ConfigurableModuleClass {}
