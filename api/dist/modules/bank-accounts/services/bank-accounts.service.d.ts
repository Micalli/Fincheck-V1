import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';
export declare class BankAccountsService {
    private readonly bankAccountsRepository;
    private readonly validateBankAccountOwnershipService;
    constructor(bankAccountsRepository: BankAccountsRepository, validateBankAccountOwnershipService: ValidateBankAccountOwnershipService);
    create(userId: string, createBankAccountDto: CreateBankAccountDto): Promise<{
        id: string;
        name: string;
        userId: string;
        type: import(".prisma/client").$Enums.BankAccountType;
        initialBalance: number;
        color: string;
    }>;
    findAllByUserId(userId: string): Promise<{
        currentBalance: number;
        id: string;
        name: string;
        userId: string;
        type: import(".prisma/client").$Enums.BankAccountType;
        initialBalance: number;
        color: string;
    }[]>;
    update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto): Promise<{
        id: string;
        name: string;
        userId: string;
        type: import(".prisma/client").$Enums.BankAccountType;
        initialBalance: number;
        color: string;
    }>;
    remove(userId: string, bankAccountId: string): Promise<any>;
}
