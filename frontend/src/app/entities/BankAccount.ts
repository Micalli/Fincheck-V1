export interface BankAccount {
    id: string;
    name: string;
    initialBalance: number;
    type: "CHECKING" | "INVESTING" | "CASH";
    color: string;
    currentBalance: number;
}
