import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';
import { TransactionsType } from '../entities/Transaction';
export declare class TransactionsService {
    private readonly transactionsRepository;
    private readonly validateBankAccountOwnershipService;
    private readonly validateCategoryOwnershipService;
    private readonly validateTransactionOwnershipService;
    constructor(transactionsRepository: TransactionsRepository, validateBankAccountOwnershipService: ValidateBankAccountOwnershipService, validateCategoryOwnershipService: ValidateCategoryOwnershipService, validateTransactionOwnershipService: ValidateTransactionOwnershipService);
    create(userId: string, createTransactionDto: CreateTransactionDto): Promise<{
        id: string;
        name: string;
        userId: string;
        type: import(".prisma/client").$Enums.TransactionTupe;
        bankAccountId: string;
        categoryId: string;
        value: number;
        date: Date;
    }>;
    findAllByUserId(userId: string, filters: {
        month: number;
        year: number;
        bankAccountId?: string;
        type?: TransactionsType;
    }): Promise<{
        id: string;
        name: string;
        userId: string;
        type: import(".prisma/client").$Enums.TransactionTupe;
        bankAccountId: string;
        categoryId: string;
        value: number;
        date: Date;
    }[]>;
    update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto): Promise<{
        id: string;
        name: string;
        userId: string;
        type: import(".prisma/client").$Enums.TransactionTupe;
        bankAccountId: string;
        categoryId: string;
        value: number;
        date: Date;
    }>;
    remove(userId: string, transactionId: string): Promise<any>;
    private validateEntitiesOwnwerShip;
}
