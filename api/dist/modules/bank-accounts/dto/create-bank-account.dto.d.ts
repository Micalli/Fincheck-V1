import { BankAccountType } from '../entities/BankAccount';
export declare class CreateBankAccountDto {
    name: string;
    initialBalance: number;
    type: BankAccountType;
    color: string;
}
