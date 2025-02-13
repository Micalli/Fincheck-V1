import { createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../../../app/entities/BankAccount";
import { localStorageKeys } from '../../../../../app/config/localStorageKeys';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
interface DashboardContextValue {
    areValuesVisible: boolean;
    isNewAccountModalOpen: boolean;
    isNewTransactionOpen: boolean;
    isEditAccountModalOpen: boolean;
    accountBeingEdited: null | BankAccount;
    newTransactionType: "INCOME" | "EXPENSE" | null;
    toggleVisibility(): void;
    closeNewAccountModal(): void;
    openNewAccountModal(): void;
    closeEditAccountModal(): void;
    openEditAccountModal(bankAccount: BankAccount): void;
    openNewTransactionModal(type: "INCOME" | "EXPENSE"): void;
    closeNewTransactionModal(): void;
   t: TFunction<'translation', undefined>
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
     const [areValuesVisible, setAreValuesVisible] = useState<boolean>(() => {
         const areValuesVisibleStoraged = localStorage.getItem(
             localStorageKeys.ARE_VALUES_VISIBLE
         );
         return areValuesVisibleStoraged !== "false";
     });
     const {t}= useTranslation()
    const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
        useState(false);
    const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(true);
    const [accountBeingEdited, setAccountBeingEdited] =
        useState<null | BankAccount>(null);

    const [newTransactionType, setNewTransactionType] = useState<
        "INCOME" | "EXPENSE" | null
    >(null);

    const toggleVisibility = useCallback(() => {
        setAreValuesVisible((prevState) => {
            localStorage.setItem(
                localStorageKeys.ARE_VALUES_VISIBLE,
                String(!prevState)
            );
            return !prevState;
        });
    }, []);

    const openNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(true);
    }, []);

    const closeNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(false);
    }, []);
    const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
        setIsEditAccountModalOpen(true);
        setAccountBeingEdited(bankAccount);
    }, []);

    const closeEditAccountModal = useCallback(() => {
        setIsEditAccountModalOpen(false);
        setAccountBeingEdited(null);
    }, []);

    const openNewTransactionModal = useCallback(
        (type: "INCOME" | "EXPENSE") => {
            setNewTransactionType(type);
            setIsNewTransactionModalOpen(true);
        },
        []
    );

    const closeNewTransactionModal = useCallback(() => {
        setNewTransactionType(null);
        setIsNewTransactionModalOpen(false);
    }, []);

    return (
        <DashboardContext.Provider
            value={{
                areValuesVisible,
                isNewAccountModalOpen,
                isNewTransactionOpen: isNewTransactionModalOpen,
                newTransactionType,
                isEditAccountModalOpen,
                accountBeingEdited,
                toggleVisibility,
                openNewAccountModal,
                closeNewAccountModal,
                closeEditAccountModal,
                openEditAccountModal,
                closeNewTransactionModal,
                openNewTransactionModal,
                t
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
}
