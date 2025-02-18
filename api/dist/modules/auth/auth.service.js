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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_repositories_1 = require("../../shared/database/repositories/users.repositories");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_2 = require("bcryptjs");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async singin(singInDto) {
        const { email, password } = singInDto;
        const user = await this.usersRepository.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciais inválida.');
        }
        const isPasswordValid = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Senha inválida.');
        }
        const accessToken = await this.generateAccessToken(user.id);
        return { accessToken };
    }
    async singup(singupDto) {
        const { name, email, password } = singupDto;
        const emailTaken = await this.usersRepository.findUnique({
            where: { email },
            select: { id: true },
        });
        if (emailTaken) {
            throw new common_1.ConflictException('O e-mail ja está em uso.');
        }
        const hashedPassword = await (0, bcryptjs_2.hash)(password, 12);
        const user = await this.usersRepository.create({
            data: {
                email,
                name,
                password: hashedPassword,
                categories: {
                    createMany: {
                        data: [
                            { name: 'Salário', icon: 'salary', type: 'INCOME' },
                            { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
                            { name: 'Outro', icon: 'other', type: 'INCOME' },
                            { name: 'Casa', icon: 'home', type: 'EXPENSE' },
                            { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
                            { name: 'Educação', icon: 'education', type: 'EXPENSE' },
                            { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
                            { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
                            { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
                            { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
                            { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
                            { name: 'Outro', icon: 'other', type: 'EXPENSE' },
                        ],
                    },
                },
            },
        });
        const accessToken = await this.generateAccessToken(user.id);
        return { accessToken };
    }
    async generateAccessToken(userId) {
        return await this.jwtService.signAsync({ sub: userId });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repositories_1.UsersRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map