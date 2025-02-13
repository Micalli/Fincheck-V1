import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { bankAccontService } from "../../../../../app/services/bankAccountsService";
import { CreateBankAccountParams } from "../../../../../app/services/bankAccountsService/create";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { useTranslation } from 'react-i18next';

const schema = z.object({
    name: z.string().nonempty("Nome da conta é obrigatório"),
    initialBalance: z.string().min(1, "Saldo inicial é obrigatório"),
    type: z.enum(["CHECKING", "INVESTING", "CASH"]),
    color: z.string().min(1, "Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;
export function useNewAccountModalController() {
    const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();
    const {t} = useTranslation()
    const {
        handleSubmit: hookFormSubmit,
        register,
        formState: { errors },
        control,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: CreateBankAccountParams) => {
            return bankAccontService.create(data);
        },
    });

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            await mutateAsync({
                ...data,
                initialBalance: currencyStringToNumber(data.initialBalance),
            });
            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
            toast.success(t("toastMessages.accounts.createAccountSuccess"));
            closeNewAccountModal();
            reset();
        } catch (error) {
            toast.error(t("toastMessages.accounts.createAccountError"));
        }
    });

    return {
        isNewAccountModalOpen,
        closeNewAccountModal,
        register,
        errors,
        handleSubmit,
        control,
        isPending,
        t
    };
}
