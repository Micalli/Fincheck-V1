import { useTranslation } from 'react-i18next';
import ilustrationPT from "../../assets/ilustrationPT.png";
import ilustrationUS from "../../assets/ilustrationUS.png";
import ilustrationDE from "../../assets/ilustrationDE.png";
import ilustrationES from "../../assets/ilustrationES.png";
import ilustrationFR from "../../assets/ilustrationFR.png";



export function Ilustration() {
      const { i18n: { language} } = useTranslation();
      const renderedIlustration =
          language === "pt"
              ? ilustrationPT
              : language === "en"
              ? ilustrationUS
              : language === "de"
              ? ilustrationDE
              : language === "es"
              ? ilustrationES
              : ilustrationFR

    return (
        <img
            src={renderedIlustration}
            className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]"
        />
    );
}
