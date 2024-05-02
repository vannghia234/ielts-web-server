"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repository/user.repository");
const user_entity_1 = require("../../../lib/entity/user/user.entity");
const bcrypt_service_1 = require("./bcrypt.service");
const response_base_1 = require("../../../shared/constant/response_base");
let UserService = class UserService {
    constructor(usersRepository, bCryptService) {
        this.usersRepository = usersRepository;
        this.bCryptService = bCryptService;
    }
    async findAll() {
        return this.usersRepository.findAll();
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne(id);
        return user;
    }
    async update(id, updateUser) {
        const user = new user_entity_1.User();
        user.mail = updateUser.mail;
        user.name = updateUser.name;
        user.password = await this.bCryptService.hashPassWord(updateUser.password);
        user.role = updateUser.role;
        return this.usersRepository.update(id, user);
    }
    async remove(id) {
        return this.usersRepository.remove(id);
    }
    async findByUsername(username) {
        return await this.usersRepository.findByUsername(username);
    }
    async createUser(userDto) {
        if (userDto.password.length < 8) {
            throw new common_1.BadRequestException(new response_base_1.ResponseBase('40002', 'Mật khẩu tối thiểu 8 kí tự').toJSON());
        }
        const user = new user_entity_1.User();
        user.mail = userDto.mail;
        user.name = userDto.name;
        user.password = await this.bCryptService.hashPassWord(userDto.password);
        user.role = userDto.role;
        return await this.usersRepository.create(user);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UsersRepository,
        bcrypt_service_1.BCryptService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map