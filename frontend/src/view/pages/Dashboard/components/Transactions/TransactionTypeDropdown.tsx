import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { DropDownMenu } from "../../../../components/DropDownMenu";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";
import { TFunction } from 'i18next';

interface TransactionTypeDropdownProps {
    onSelect(type: "INCOME" | "EXPENSE" | undefined): void;
    selectedType: "INCOME" | "EXPENSE" | undefined;
    t: TFunction<"translation", undefined>;
}

export function TransactionTypeDropdown({
    onSelect,
    selectedType,
    t
}: TransactionTypeDropdownProps) {
    return (
        <DropDownMenu.Root>
            <DropDownMenu.Trigger>
                <button className="flex items-center gap-2">
                    {selectedType === "EXPENSE" && <ExpensesIcon />}
                    {selectedType === "INCOME" && <IncomeIcon />}
                    {selectedType === undefined && <TransactionsIcon />}

                    <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
                        {selectedType === "EXPENSE" &&
                            t("transactions.dropdown.expenses")}
                        {selectedType === "INCOME" &&
                            t("transactions.dropdown.incomes")}
                        {selectedType === undefined && t('transactions.dropdown.transactions')}
                    </span>
                    <ChevronDownIcon className="text-gray-900" />
                </button>
            </DropDownMenu.Trigger>
            <DropDownMenu.Content className="w-[279px]">
                <DropDownMenu.Item
                    className="gap-2"
                    onSelect={() => onSelect("INCOME")}
                >
                    <IncomeIcon />
                    {t("transactions.dropdown.incomes")}
                </DropDownMenu.Item>
                <DropDownMenu.Item
                    className="gap-2"
                    onSelect={() => onSelect("EXPENSE")}
                >
                    <ExpensesIcon />
                    {t("transactions.dropdown.expenses")}
                </DropDownMenu.Item>
                <DropDownMenu.Item
                    className="gap-2"
                    onSelect={() => onSelect(undefined)}
                >
                    <TransactionsIcon />
                    {t("transactions.dropdown.transactions")}
                </DropDownMenu.Item>
            </DropDownMenu.Content>
        </DropDownMenu.Root>
    );
}
