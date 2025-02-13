import { useState } from "react";
import { useTranslation } from "react-i18next";

export function useLanguage() {
 const { t, i18n } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const handleChangeLanguage = () => {
        const langueges= ['pt','en','de', 'fr','es']
        const languageIndex = langueges.findIndex((languege) => {
            return languege === i18n.language;
        });
        const newLanguage = langueges[languageIndex + 1] ?? langueges[0];
        setCurrentLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };

    return { handleChangeLanguage, currentLanguage, t };
}
