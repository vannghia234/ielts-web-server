"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmPostgresConfig = void 0;
const TypeOrmPostgresConfig = async (configService) => {
    return {
        type: 'postgres',
        host: configService.get('app.database.host', 'localhost'),
        port: configService.get('app.database.port', 5432),
        username: configService.get('app.database.username', 'postgres'),
        password: configService.get('app.database.password', 'postgres'),
        database: configService.get('app.database.databaseName', 'postgres'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: configService.get('app.isDev', false),
    };
};
exports.TypeOrmPostgresConfig = TypeOrmPostgresConfig;
//# sourceMappingURL=orm.config.js.map