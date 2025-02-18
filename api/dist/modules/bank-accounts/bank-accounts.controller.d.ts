import { BankAccountsService } from './services/bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
export declare class BankAccountsController {
    private readonly bankAccountsService;
    constructor(bankAccountsService: BankAccountsService);
    create(createBankAccountDto: CreateBankAccountDto, userId: string): Promise<{
        id: string;
        name: string;
        userId: string;
        type: import(".prisma/client").$Enums.BankAccountType;
        initialBalance: number;
        color: string;
    }>;
    findAll(userId: string): Promise<{
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
