import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useEditTransactionModalController } from "./useEditTransactionModalController";
import { Transaction } from "../../../../../app/entities/Transaction";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";
import { TrashIcon } from "../../../../components/icons/TrashIcon";

interface EditTransactionModalProps {
    transaction: Transaction | null;
    open: boolean;
    onClose: () => void;
}

export function EditTransactionModal({
    transaction,
    onClose,
    open,
}: EditTransactionModalProps) {
    const {
        control,
        errors,
        handleSubmit,
        register,
        accounts,
        categories,
        isLoading,
        isDeleModalOpen,
        isLoadingDelete,
        handleDeleteTransaction,
        handleCloseDeleteModal,
        handleOpenDeleteModal,
        t,
    } = useEditTransactionModalController(transaction, onClose);

    const isExpense = transaction?.type === "EXPENSE";

    if (isDeleModalOpen) {
        return (
            <ConfirmDeleteModal
                isLoading={isLoadingDelete}
                onConfirm={handleDeleteTransaction}
                title={`Tem certeza que deseja excluir esta ${
                    isExpense
                        ? t("transactions.deleteExpenseTitle")
                        : t("transactions.deleteIncomeTitle")
                }?`}
                onClose={handleCloseDeleteModal}
            />
        );
    }

    return (
        <Modal
            title={
                isExpense
                    ? t("transactions.editExpense")
                    : t("transactions.editIncome")
            }
            open={open}
            onClose={onClose}
            rightAction={
                <button onClick={handleOpenDeleteModal}>
                    <TrashIcon className="w-6 h-6 text-red-900" />
                </button>
            }
        >
            <form onSubmit={handleSubmit}>
                <div>
                    <span className="text-gray-600 text-xs tracking-[0.5-px]">
                        {isExpense
                            ? t("placeholders.expenseValue")
                            : t("placeholders.incomeValue")}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-lg tracking-[0.5-px]">
                            {t("currency")}
                        </span>
                        <Controller
                            control={control}
                            name="value"
                            defaultValue="0"
                            render={({ field: { onChange, value } }) => (
                                <InputCurrency
                                    error={errors.value?.message}
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder={
                            isExpense
                                ? t("placeholders.expenseName")
                                : t("placeholders.incomeName")
                        }
                        error={errors.name?.message}
                        {...register("name")}
                    />

                    <Controller
                        control={control}
                        name="categoryId"
                        render={({ field: { onChange, value } }) => (
                            <Select
                                placeholder={t("placeholders.category")}
                                onChange={onChange}
                                value={value}
                                error={errors.categoryId?.message}
                                options={categories.map((category) => ({
                                    value: category.id,
                                    label: category.name,
                                }))}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="bankAccountId"
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <Select
                                placeholder={
                                    isExpense
                                        ? t("placeholders.payWith")
                                        : t("placeholders.receiveWith")
                                }
                                onChange={onChange}
                                value={value}
                                error={errors.bankAccountId?.message}
                                options={accounts.map((account) => ({
                                    value: account.id,
                                    label: account.name,
                                }))}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="date"
                        defaultValue={new Date()}
                        render={({ field: { value, onChange } }) => (
                            <DatePickerInput
                                error={errors.date?.message}
                                value={value}
                                onChange={onChange}
                                t={t}
                            />
                        )}
                    />
                </div>
                <Button className="w-full mt-6" isLoading={isLoading}>
                    {t("save")}
                </Button>
            </form>
        </Modal>
    );
}
