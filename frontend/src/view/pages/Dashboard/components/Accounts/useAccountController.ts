import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useBankAccount } from "../../../../../app/hooks/useBankAccount";
import { useTranslation } from "react-i18next";

export function useAccountController() {
    const windowWidth = useWindowWidth();

    const { areValuesVisible, toggleVisibility, openNewAccountModal } =
        useDashboard();
    const { t } = useTranslation();

    const [sliderState, setSliderState] = useState({
        isBeginning: true,
        isEnd: false,
    });

    const { accounts, isFetching } = useBankAccount();

    const currentBalance = useMemo(() => {
        return accounts.reduce(
            (total, account) => total + account.currentBalance,
            0
        );
    }, [accounts]);

    return {
        sliderState,
        setSliderState,
        windowWidth,
        areValuesVisible,
        toggleVisibility,
        isLoading: isFetching,
        openNewAccountModal,
        accounts,
        currentBalance,
        t,
    };
}
