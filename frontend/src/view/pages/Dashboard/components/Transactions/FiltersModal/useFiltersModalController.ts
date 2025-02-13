import { useState } from "react";
import { useBankAccount } from '../../../../../../app/hooks/useBankAccount';
import { useTranslation } from 'react-i18next';

export function useFiltersModalController() {
    const [selectedBankAccountId, setSelectedBankAccountId] = useState<
        undefined | string
    >(undefined);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const { accounts} = useBankAccount()

    function handleSelectBankAccount(bankAccountId: string) {
        setSelectedBankAccountId((prevState) =>
            prevState === bankAccountId ? undefined : bankAccountId
        );
    }

    function handleChangeYear(step: number) {
        setSelectedYear((prevState) => prevState + step);
    }

    const{t} = useTranslation()

    return {
        selectedBankAccountId,
        selectedYear,
        handleSelectBankAccount,
        handleChangeYear,
        accounts,
        t
    };
}
