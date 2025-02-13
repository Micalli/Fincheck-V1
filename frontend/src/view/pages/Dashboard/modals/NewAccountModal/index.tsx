import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
    const {
        closeNewAccountModal,
        isNewAccountModalOpen,
        errors,
        handleSubmit,
        register,
        control,
        isPending,
        t
    } = useNewAccountModalController();

    return (
        <Modal
            title={t("accounts.newAccountTitle")}
            open={isNewAccountModalOpen}
            onClose={closeNewAccountModal}
        >
            <form onSubmit={handleSubmit}>
                <div>
                    <span className="text-gray-600 text-xs tracking-[0.5-px]">
                        {t("accounts.initialBalance")}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-lg tracking-[0.5-px]">
                            {t("currency")}
                        </span>
                        <Controller
                            name="initialBalance"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <InputCurrency
                                    error={errors.initialBalance?.message}
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
                        placeholder={t("placeholders.accountName")}
                        error={errors.name?.message}
                        {...register("name")}
                    />

                    <Controller
                        name="type"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                error={errors.type?.message}
                                placeholder={t("placeholders.type")}
                                options={[
                                    {
                                        label: "Conta Corrente",
                                        value: "CHECKING",
                                    },
                                    {
                                        label: "Investimentos",
                                        value: "INVESTING",
                                    },
                                    {
                                        label: "Dinheiro",
                                        value: "CASH",
                                    },
                                ]}
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />

                    <Controller
                        name="color"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <ColorsDropdownInput
                                value={value}
                                onChange={onChange}
                                error={errors.color?.message}
                                t={t}
                            />
                        )}
                    />
                </div>
                <Button className="w-full mt-6" isLoading={isPending}>
                    {t("accounts.create")}
                </Button>
            </form>
        </Modal>
    );
}
