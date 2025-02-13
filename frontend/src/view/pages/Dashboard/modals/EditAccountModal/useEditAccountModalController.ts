import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { bankAccontService } from "../../../../../app/services/bankAccountsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { UpdateBankAccountParams } from "../../../../../app/services/bankAccountsService/update";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const schema = z.object({
    name: z.string(),
    initialBalance: z.union([
        z.string().min(1, "Saldo inicial é obrigatório"),
        z.number(),
    ]),
    type: z.enum(["CHECKING", "INVESTING", "CASH"]),
    color: z.string().min(1, "Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;
export function useEditAccountModalController() {
    const {
        isEditAccountModalOpen,
        closeEditAccountModal,
        accountBeingEdited,
    } = useDashboard();

    const [isDeleModalOpen, setIsDeleModalOpen] = useState(false);
    const { t } = useTranslation();

    const {
        handleSubmit: hookFormSubmit,
        register,
        formState: { errors },
        control,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            color: accountBeingEdited?.color,
            name: accountBeingEdited?.name,
            type: accountBeingEdited?.type,
            initialBalance: accountBeingEdited?.initialBalance,
        },
    });

    const queryClient = useQueryClient();
    const { mutateAsync: updateAccount, isPending } = useMutation({
        mutationFn: async (data: UpdateBankAccountParams) => {
            return bankAccontService.update(data);
        },
    });

    const { mutateAsync: removeAccount, isPending: isLoadingDelete } =
        useMutation({
            mutationFn: async (bankAccountId: string) => {
                return bankAccontService.remove(bankAccountId);
            },
        });

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            await updateAccount({
                ...data,
                id: accountBeingEdited!.id,
                initialBalance: currencyStringToNumber(data.initialBalance),
            });
            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
            toast.success(t("toastMessages.accounts.editAccountSuccess"));
            closeEditAccountModal();
        } catch (error) {
            toast.error(t("toastMessages.accounts.editAccountError"));
        }
    });
    function handleOpenDeleteModal() {
        setIsDeleModalOpen(true);
    }

    function handleCloseDeleteModal() {
        setIsDeleModalOpen(false);
    }

    async function handleDeleteAccount() {
        try {
            await removeAccount(accountBeingEdited!.id);
            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
            toast.success(t("toastMessages.accounts.deleteAccountSuccess"));
            closeEditAccountModal();
        } catch (error) {
            toast.error(t("toastMessages.accounts.deleteAccountError"));
        }
    }


    return {
        isEditAccountModalOpen,
        closeEditAccountModal,
        register,
        errors,
        handleSubmit,
        control,
        isPending,
        accountBeingEdited,
        isDeleModalOpen,
        handleCloseDeleteModal,
        handleOpenDeleteModal,
        handleDeleteAccount,
        isLoadingDelete,
        t,
    };
}
