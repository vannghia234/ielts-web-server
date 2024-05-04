"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const generate_jwt_service_1 = require("./shared/jwt/generate-jwt.service");
const swagger_config_1 = require("./lib/config/swagger.config");
async function bootstrap() {
    generate_jwt_service_1.GenerateJwtService.generateToken();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('/api');
    app.useGlobalPipes(new common_1.ValidationPipe());
    const document = swagger_1.SwaggerModule.createDocument(app, swagger_config_1.configSwagger);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.APP_PORT);
    new common_1.Logger('main').debug('Server is running with port ' + process.env.APP_PORT);
    new common_1.Logger('main').debug('Go to swagger ' + 'http://localhost:3000/api/');
}
bootstrap();
//# sourceMappingURL=main.js.map