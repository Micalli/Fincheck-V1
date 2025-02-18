import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
export declare class ValidateBankAccountOwnershipService {
    private readonly bankAccountsRepository;
    constructor(bankAccountsRepository: BankAccountsRepository);
    validate(userId: string, bankAccountId: string): Promise<void>;
}
