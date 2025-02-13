import { ExitIcon } from "@radix-ui/react-icons";
import { DropDownMenu } from "./DropDownMenu";
import { useAuth } from "../../app/contexts/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { getNameInitialLetters } from '../../app/utils/getNameInitialLetters';
export function UserMenu() {
    const { singnout, user } = useAuth();
    const { t } = useTranslation();

    return (
        <DropDownMenu.Root>
            <DropDownMenu.Trigger>
                <div className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100 cursor-pointer">
                    <span className="text-sm tracking-[0.5px] text-teal-900 font-medium ">
                        {getNameInitialLetters(user?.name ?? '')}
                    </span>
                </div>
            </DropDownMenu.Trigger>
            <DropDownMenu.Content className="w-32">
                <DropDownMenu.Item
                    className="flex items-center justify-between"
                    onSelect={singnout}
                >
                    {t("logoutText")}
                    <ExitIcon className="w-4 h-4" />
                </DropDownMenu.Item>
            </DropDownMenu.Content>
        </DropDownMenu.Root>
    );
}
