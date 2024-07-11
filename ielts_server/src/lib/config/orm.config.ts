import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export const TypeOrmPostgresConfig = async (
	configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
	return {
		type: 'postgres',
		host: configService.get<string>('app.database.host', 'localhost'),
		port: configService.get<number>('app.database.port', 5432),
		username: configService.get<string>('app.database.username', 'postgres'),
		password: configService.get<string>('app.database.password', 'postgres'),
		database: configService.get<string>(
			'app.database.databaseName',
			'ielts-database',
		),
		ssl: configService.get<boolean>('app.database.ssl', false),
		entities: [__dirname + '/../**/*.entity{.ts,.js}'],
		autoLoadEntities: true,
		synchronize: configService.get<boolean>('app.isDev', false),
	};
};
