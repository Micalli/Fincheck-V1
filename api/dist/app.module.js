"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const users_module_1 = require("./modules/users/users.module");
const database_module_1 = require("./shared/database/database.module");
const auth_module_1 = require("./modules/auth/auth.module");
const auth_guard_1 = require("./modules/auth/auth.guard");
const categories_module_1 = require("./modules/categories/categories.module");
const bank_accounts_module_1 = require("./modules/bank-accounts/bank-accounts.module");
const transactions_module_1 = require("./modules/transactions/transactions.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            categories_module_1.CategoriesModule,
            bank_accounts_module_1.BankAccountsModule,
            transactions_module_1.TransactionsModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map