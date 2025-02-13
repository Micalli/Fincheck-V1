import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export function NewTransactionModal() {
    const {
        closeNewTransactionModal,
        isNewTransactionOpen,
        newTransactionType,
        control,
        errors,
        handleSubmit,
        register,
        accounts,
        categories,
        isPending,
        t
    } = useNewTransactionModalController();

    const isExpense = newTransactionType === "EXPENSE";

    return (
        <Modal
            title={isExpense ? t("fab.newExpense") : t("fab.newIncome")}
            open={isNewTransactionOpen}
            onClose={closeNewTransactionModal}
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
                        defaultValue=""
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
                <Button className="w-full mt-6" isLoading={isPending}>
                    {t("transactions.create")}
                </Button>
            </form>
        </Modal>
    );
}
