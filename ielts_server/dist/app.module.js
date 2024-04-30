"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const generate_jwt_service_1 = require("./shared/jwt/generate-jwt.service");
const auth_module_1 = require("./module/auth/auth.module");
const exam_module_1 = require("./module/exam/exam.module");
const question_module_1 = require("./module/question/question.module");
const shared_module_1 = require("./shared/shared.module");
const user_module_1 = require("./module/user/user.module");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const app_config_1 = require("./lib/config/app.config");
const typeorm_1 = require("@nestjs/typeorm");
const orm_config_1 = require("./lib/config/orm.config");
const post_interceptor_1 = require("./interceptor/post.interceptor");
const core_1 = require("@nestjs/core");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.AppConfig],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: orm_config_1.TypeOrmPostgresConfig,
            }),
            shared_module_1.SharedModule,
            user_module_1.UserModule,
            exam_module_1.ExamModule,
            question_module_1.QuestionModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            generate_jwt_service_1.GenerateJwtService,
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: post_interceptor_1.PostInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map