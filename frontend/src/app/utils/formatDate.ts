import { TFunction } from "i18next";

export function formatDate(date: Date, t: TFunction<"translation", undefined>) {
    return Intl.DateTimeFormat(t("formatCurrency.country"), {
        day: '2-digit',
        month:'2-digit',
        year: 'numeric'
    }).format(date);
}
