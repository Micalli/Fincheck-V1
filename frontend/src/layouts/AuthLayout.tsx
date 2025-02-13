// import { Outlet } from 'react-router-dom';
import { Outlet } from 'react-router-dom'

import { Logo } from '../view/components/Logo'
import { LanguageSwitcher } from '../view/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { Ilustration } from '../view/components/Ilustration';

export function AuthLayout() {

  const { t, } = useTranslation();

    return (
        <div className="flex w-full h-full">
            <div className=" w-full h-full flex justify-center items-center flex-col gap-16 lg:w-1/2">
                <div className="flex items-center gap-x-8">
                    <LanguageSwitcher />
                </div>
                <Logo className="h-6 text-gray-500" />

                <div className=" w-full  max-w-[504px] px-8">
                    <Outlet />
                </div>
            </div>

            <div className=" w-1/2 h-full p-8  justify-center items-center relative hidden lg:flex">
                <Ilustration/>
                <div className="max-w-[656px] bottom-8 mx-8 bg-white p-10 absolute rounded-b-[32px] ">
                    <Logo className="text-teal-900 h-8" />
                    <p className="text-gray-700 font-medium text-xl mt-6">
                        {t("welcomeText")}
                    </p>
                </div>
            </div>
        </div>
    );
}
