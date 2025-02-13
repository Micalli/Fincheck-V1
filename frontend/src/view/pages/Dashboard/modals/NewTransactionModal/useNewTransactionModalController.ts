import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccount } from "../../../../../app/hooks/useBankAccount";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { CreateTransactionParams } from "../../../../../app/services/transactionsService/create";
import toast from "react-hot-toast";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { useTranslation } from "react-i18next";

const schema = z.object({
    value: z.union([z.string().min(1, "Informe o valor."), z.number()]),
    name: z.string().min(1, "Informe o nome."),
    categoryId: z.string().min(1, "Informe a categoria."),
    bankAccountId: z.string().min(1, "Informe a categoria."),
    date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
    const {
        isNewTransactionOpen,
        closeNewTransactionModal,
        newTransactionType,
    } = useDashboard();
    const { t } = useTranslation();

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const { accounts } = useBankAccount();
    const { categories: categoriesList } = useCategories();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: CreateTransactionParams) => {
            return transactionsService.create(data);
        },
    });

    const categories = useMemo(() => {
        return categoriesList.filter(
            (category) => category.type === newTransactionType
        );
    }, [categoriesList, newTransactionType]);

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            await mutateAsync({
                ...data,
                value: currencyStringToNumber(data.value),
                type: newTransactionType!,
                date: data.date.toISOString(),
            });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            toast.success(
                newTransactionType === "EXPENSE"
                    ? t("toastMessages.transactions.createExpenseSuccess")
                    : t("toastMessages.transactions.createIncomeSuccess")
            );
            closeNewTransactionModal();
            reset();
        } catch (error) {
            toast.error(
                newTransactionType === "EXPENSE"
                    ? t("toastMessages.transactions.createExpenseError")
                    : t("toastMessages.transactions.createIncomeError")
            );
        }
    });

    return {
        isNewTransactionOpen,
        closeNewTransactionModal,
        newTransactionType,
        register,
        control,
        errors,
        reset,
        handleSubmit,
        accounts,
        categories,
        isPending,
        t,
    };
}
