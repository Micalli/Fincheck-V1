import { useEffect, useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionFilters } from "../../../../../app/services/transactionsService/getAll";
import { Transaction } from "../../../../../app/entities/Transaction";
import { useTranslation } from 'react-i18next';

export function useTransactionsController() {
    const { areValuesVisible } = useDashboard();

    const [filters, setfilters] = useState<TransactionFilters>({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    });

    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [transactionBeingEdited, setTransactionBeingEdited] =
        useState<null | Transaction>(null);

    const { isFetching, transactions, isInitialLoading, refetch } =
        useTransactions(filters);

    useEffect(() => {
        refetch();
    }, [filters, refetch]);

    const { t, i18n: {language} } = useTranslation();

    function handleChangeFilters<TFilter extends keyof TransactionFilters>(
        filter: TFilter
    ) {
        return (value: TransactionFilters[TFilter]) => {
            if (value === filters[filter]) return;

            setfilters((prevState) => ({
                ...prevState,
                [filter]: value,
            }));
        };
    }

    function handleApplyFilters({
        bankAccountId,
        year,
    }: {
        bankAccountId: string | undefined;
        year: number;
    }) {
        handleChangeFilters("bankAccountId")(bankAccountId);
        handleChangeFilters("year")(year);
        setIsFiltersModalOpen(false);
    }

    function handleOpenFiltersModal() {
        setIsFiltersModalOpen(true);
    }

    function handleCloseFiltersModal() {
        setIsFiltersModalOpen(false);
    }
    function handleOpenEditModal(transaction: Transaction) {
        setIsEditModalOpen(true);
        setTransactionBeingEdited(transaction);
    }

    function handleCloseEditModal() {
        setIsEditModalOpen(false);
        setTransactionBeingEdited(null);
    }

    return {
        areValuesVisible,
        isInitialLoading,
        isLoading: isFetching,
        transactions,
        handleCloseFiltersModal,
        handleOpenFiltersModal,
        isFiltersModalOpen,
        handleChangeFilters,
        filters,
        handleApplyFilters,
        transactionBeingEdited,
        isEditModalOpen,
        handleOpenEditModal,
        handleCloseEditModal,
        t,
        currentLanguage: language,
    };
}
