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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./services/transactions.service");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
const update_transaction_dto_1 = require("./dto/update-transaction.dto");
const ActiveUserId_1 = require("../../shared/decorators/ActiveUserId");
const OptionalParseUUIDPipe_1 = require("../../shared/pipes/OptionalParseUUIDPipe");
const Transaction_1 = require("./entities/Transaction");
const OptionalParseEnumPipe_copy_1 = require("../../shared/pipes/OptionalParseEnumPipe copy");
let TransactionsController = class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    create(createTransactionDto, userId) {
        return this.transactionsService.create(userId, createTransactionDto);
    }
    findAll(userId, month, year, bankAccountId, type) {
        return this.transactionsService.findAllByUserId(userId, {
            month,
            year,
            bankAccountId,
            type,
        });
    }
    update(userId, transactionId, updateTransactionDto) {
        return this.transactionsService.update(userId, transactionId, updateTransactionDto);
    }
    remove(userId, transactionId) {
        return this.transactionsService.remove(userId, transactionId);
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, ActiveUserId_1.ActiveUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto, String]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, ActiveUserId_1.ActiveUserId)()),
    __param(1, (0, common_1.Query)('month', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('year', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('bankAccountId', OptionalParseUUIDPipe_1.OptionalParseUUIDPipe)),
    __param(4, (0, common_1.Query)('type', new OptionalParseEnumPipe_copy_1.OptionalParseEnumPipe(Transaction_1.TransactionsType))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':transactionId'),
    __param(0, (0, ActiveUserId_1.ActiveUserId)()),
    __param(1, (0, common_1.Param)('transactionId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_transaction_dto_1.UpdateTransactionDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':transactionId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, ActiveUserId_1.ActiveUserId)()),
    __param(1, (0, common_1.Param)('transactionId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "remove", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map