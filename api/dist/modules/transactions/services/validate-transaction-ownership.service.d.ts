import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
export declare class ValidateTransactionOwnershipService {
    private readonly transactionsRepository;
    constructor(transactionsRepository: TransactionsRepository);
    validate(userId: string, transactionId: string): Promise<void>;
}
