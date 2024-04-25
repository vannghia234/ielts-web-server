"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const generate_jwt_service_1 = require("./shared/jwt/generate-jwt.service");
async function bootstrap() {
    generate_jwt_service_1.GenerateJwtService.generateToken();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('/api');
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('ielts test swagger')
        .setDescription('the ielts test description')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('ielts')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const configService = new config_1.ConfigService();
    const b = configService.get('app.isDev');
    await app.listen(process.env.APP_PORT);
    new common_1.Logger().debug('Server is running with port ' + process.env.APP_PORT);
    new common_1.Logger().debug('Go to swagger ' + 'http://localhost:3000/api/');
}
bootstrap();
//# sourceMappingURL=main.js.map