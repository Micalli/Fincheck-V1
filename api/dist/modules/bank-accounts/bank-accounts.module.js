"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountsModule = void 0;
const common_1 = require("@nestjs/common");
const bank_accounts_service_1 = require("./services/bank-accounts.service");
const bank_accounts_controller_1 = require("./bank-accounts.controller");
const validate_bank_account_ownership_service_1 = require("./services/validate-bank-account-ownership.service");
let BankAccountsModule = class BankAccountsModule {
};
exports.BankAccountsModule = BankAccountsModule;
exports.BankAccountsModule = BankAccountsModule = __decorate([
    (0, common_1.Module)({
        controllers: [bank_accounts_controller_1.BankAccountsController],
        providers: [bank_accounts_service_1.BankAccountsService, validate_bank_account_ownership_service_1.ValidateBankAccountOwnershipService],
        exports: [validate_bank_account_ownership_service_1.ValidateBankAccountOwnershipService],
    })
], BankAccountsModule);
//# sourceMappingURL=bank-accounts.module.js.map