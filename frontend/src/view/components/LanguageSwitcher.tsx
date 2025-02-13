import ReactCountryFlag from "react-country-flag";
import { useLanguage } from "../../app/hooks/useLanguage";

export function LanguageSwitcher() {
    const { handleChangeLanguage, currentLanguage } = useLanguage();

    return (
        <div className="hover:opacity-65 active:opacity-55  transition-opacity ">
            {currentLanguage === "pt" ? (
                <ReactCountryFlag
                    countryCode="US"
                    svg
                    onClick={ handleChangeLanguage}
                    className="!h-8 !w-8 cursor-pointer"
                />
            ) : currentLanguage === "de" ? (
                <ReactCountryFlag
                    countryCode="FR"
                    svg
                    onClick={ handleChangeLanguage}
                    className="!h-8 !w-8 cursor-pointer"
                />
            ) : currentLanguage === "en" ?  (
                <ReactCountryFlag
                    countryCode="DE"
                    svg
                    onClick={ handleChangeLanguage}
                    className="!h-8 !w-8 cursor-pointer"
                />
            ) : currentLanguage === "fr" ?  (
                <ReactCountryFlag
                    countryCode="ES"
                    svg
                    onClick={ handleChangeLanguage}
                    className="!h-8 !w-8 cursor-pointer"
                />
            ) : currentLanguage === "es" &&  (
                <ReactCountryFlag
                    countryCode="BR"
                    svg
                    onClick={ handleChangeLanguage}
                    className="!h-8 !w-8 cursor-pointer"
                />
            )
            }
        </div>
    );
}
