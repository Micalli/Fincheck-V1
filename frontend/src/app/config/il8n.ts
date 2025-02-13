import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ptJSON from "./locales/pt/pt.json";
import enJSON from "./locales/en/en.json";
import deJSON from "./locales/de/de.json";
import esJSON from "./locales/es/es.json";
import frJSON from "./locales/fr/fr.json";



import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            pt: { ...ptJSON },
            en: { ...enJSON },
            de: { ...deJSON },
            es: { ...esJSON },
            fr: { ...frJSON },
        },
    });
export default i18n;
