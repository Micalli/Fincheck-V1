import { TransactionsService } from './services/transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsType } from './entities/Transaction';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto, userId: string): Promise<{
        id: string;
        name: string;
        userId: string;
        type: import(".prisma/client").$Enums.TransactionTupe;
        bankAccountId: string;
        categoryId: string;
        value: number;
        date: Date;
    }>;
    findAll(userId: string, month: number, year: number, bankAccountId?: string, type?: TransactionsType): Promise<{
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
}
