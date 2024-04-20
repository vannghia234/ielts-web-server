import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
export declare const TypeOrmPostgresConfig: (configService: ConfigService) => Promise<TypeOrmModuleOptions>;
