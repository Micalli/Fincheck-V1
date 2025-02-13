import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import { cn } from "../../../../../../app/utils/cn";
import { useFiltersModalController } from "./useFiltersModalController";

interface FiltersModalProps {
    open: boolean;
    onClose?(): void;
    onApplyFilters(filters: { bankAccountId: string | undefined; year: number }): void;
}

export function FiltersModal({
    onClose,
    open,
    onApplyFilters,
}: FiltersModalProps) {
    const {
        handleSelectBankAccount,
        selectedBankAccountId,
        selectedYear,
        handleChangeYear,
        accounts,
        t
    } = useFiltersModalController();
    return (
        <Modal
            open={open}
            title={t("transactions.filtersModal.title")}
            onClose={onClose}
        >
            <div>
                <span className="text-lg tracking-[-1px] font-bold text-gray-800">
                    {t("transactions.filtersModal.account")}
                </span>

                <div className="space-y-2 mt-2 flex flex-col  ">
                    {accounts.map((account) => (
                        <button
                            key={account.id}
                            onClick={() => handleSelectBankAccount(account.id)}
                            className={cn(
                                "p-2 rounded-2xl  text-gray-800 hover:bg-gray-50 transition-colors flex  items-start",
                                account.id === selectedBankAccountId &&
                                    "!bg-gray-200"
                            )}
                        >
                            {account.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-10">
                <span className="text-lg tracking-[-1px] font-bold text-gray-800">
                    {t("transactions.filtersModal.year")}
                </span>

                <div className=" mt-2 w-52 flex items-center justify-between ">
                    <button
                        className="w-12 h-12 flex justify-center items-center"
                        onClick={() => handleChangeYear(-1)}
                    >
                        <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <div className="flex-1 text-center">
                        <span className="font-medium text-sm tracking-[-0.5px]">
                            {selectedYear}
                        </span>
                    </div>

                    <button
                        className="w-12 h-12 flex justify-center items-center"
                        onClick={() => handleChangeYear(1)}
                    >
                        <ChevronRightIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
            <Button
                className="w-full mt-10"
                onClick={() =>
                    onApplyFilters({
                        bankAccountId: selectedBankAccountId,
                        year: selectedYear,
                    })
                }
            >
                {t("transactions.filtersModal.submit")}
            </Button>
        </Modal>
    );
}
