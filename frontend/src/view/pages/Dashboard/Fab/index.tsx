import { PlusIcon } from "@radix-ui/react-icons";
import { DropDownMenu } from "../../../components/DropDownMenu";
import { CategoryIcon } from "../../../components/icons/categories/CategoryIcon";
import { BankAccountIcon } from "../../../components/BankAccountIcon";
import { useDashboard } from "../components/DashboardContext/useDashboard";

export function Fab() {
    const { openNewAccountModal, openNewTransactionModal, t} = useDashboard();

    return (
        <div className="fixed right-4 bottom-4">
            <DropDownMenu.Root>
                <DropDownMenu.Trigger>
                    <button className="  bg-teal-900 rounded-full w-12 h-12 text-white flex items-center justify-center">
                        <PlusIcon className=" w-6 h-6" />
                    </button>
                </DropDownMenu.Trigger>
                <DropDownMenu.Content className="w-[279px]">
                    <DropDownMenu.Item
                        className="gap-2"
                        onSelect={() => openNewTransactionModal("EXPENSE")}
                    >
                        <CategoryIcon type="expense" />
                        {t("fab.newExpense")}
                    </DropDownMenu.Item>
                    <DropDownMenu.Item
                        className="gap-2"
                        onSelect={() => openNewTransactionModal("INCOME")}
                    >
                        <CategoryIcon type="income" />
                        {t("fab.newIncome")}
                    </DropDownMenu.Item>
                    <DropDownMenu.Item
                        className="gap-2"
                        onSelect={openNewAccountModal}
                    >
                        <BankAccountIcon />
                        {t("fab.newAccount")}
                    </DropDownMenu.Item>
                </DropDownMenu.Content>
            </DropDownMenu.Root>
        </div>
    );
}
