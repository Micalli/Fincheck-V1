import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccount } from "../../../../../app/hooks/useBankAccount";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { Transaction } from "../../../../../app/entities/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { UpdateTransactionParams } from "../../../../../app/services/transactionsService/update";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { useTranslation } from 'react-i18next';

const schema = z.object({
    value: z.union([z.string().min(1, "Informe o valor."), z.number()]),
    name: z.string().min(1, "Informe o nome."),
    categoryId: z.string().min(1, "Informe a categoria."),
    bankAccountId: z.string().min(1, "Informe a categoria."),
    date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
    transaction: Transaction | null,
    onClose: () => void
) {
    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            bankAccountId: transaction?.bankAccountId,
            categoryId: transaction?.categoryId,
            date: transaction ? new Date(transaction.date) : new Date(),
            name: transaction?.name,
            value: transaction?.value,
        },
    });
    const {t} = useTranslation()

    const queryClient = useQueryClient();

    const [isDeleModalOpen, setIsDeleModalOpen] = useState(false);

    const { accounts } = useBankAccount();
    const { categories: categoriesList } = useCategories();

    const categories = useMemo(() => {
        return categoriesList.filter(
            (category) => category.type === transaction?.type
        );
    }, [categoriesList, transaction]);

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: UpdateTransactionParams) => {
            return transactionsService.update(data);
        },
    });

    const { mutateAsync: removeTransaction, isPending: isLoadingDelete } =
        useMutation({
            mutationFn: async (transactionId: string) => {
                return transactionsService.remove(transactionId);
            },
        });
    async function handleDeleteTransaction() {
        try {
            await removeTransaction(transaction!.id);
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });

            toast.success(
                transaction!.type === "EXPENSE"
                    ? t("toastMessages.transactions.removeExpenseSuccess")
                    : t("toastMessages.transactions.removeIncomeSuccess")
            );
            onClose();
        } catch (error) {
            transaction!.type === "EXPENSE"
                ? t("toastMessages.transactions.removeExpenseError")
                : t("toastMessages.transactions.removeIncomeError");
        }
    }

    function handleCloseDeleteModal() {
        setIsDeleModalOpen(false);
    }

    function handleOpenDeleteModal() {
        setIsDeleModalOpen(true);
    }
    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            await mutateAsync({
                ...data,
                id: transaction!.id,
                value: currencyStringToNumber(data.value),
                type: transaction!.type,
                date: data.date.toISOString(),
            });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });

            toast.success(
                transaction!.type === "EXPENSE"
                    ? t("toastMessages.transactions.editExpenseSuccess")
                    : t("toastMessages.transactions.editIncomeSuccess")
            );
            onClose();
        } catch (error) {
            toast.error(
                transaction!.type === "EXPENSE"
                    ? t("toastMessages.transactions.editExpenseError")
                    : t("toastMessages.transactions.editIncomeError")
            );
        }
    });
    return {
        register,
        control,
        errors,
        reset,
        handleSubmit,
        accounts,
        categories,
        isLoading: isPending,
        isDeleModalOpen,
        isLoadingDelete,
        handleDeleteTransaction,
        handleCloseDeleteModal,
        handleOpenDeleteModal,
        t,
    };
}
