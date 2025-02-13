import { ChevronDownIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { DropDownMenu } from "./DropDownMenu";
import { ColorIcon } from "./icons/ColorIcon";
import { useState } from "react";
import { TFunction } from 'i18next';
interface ColorsDropdownInputProps {
    error?: string;
    className?: string;
    onChange?(value: string): void;
    value?: string;
    t: TFunction<"translation", undefined>;
}

type Color = {
    color: string;
    bg: string;
};

const colors: Color[] = [
    { color: "#868E96", bg: "#F8F9FA" },
    { color: "#FA5252", bg: "#FFF5F5" },
    { color: "#E64980", bg: "#FFF0F6" },
    { color: "#BE4BDB", bg: "#F8F0FC" },
    { color: "#7950F2", bg: "#F3F0FF" },
    { color: "#4C6EF5", bg: "#EDF2FF" },
    { color: "#228BE6", bg: "#E7F5FF" },
    { color: "#15AABF", bg: "#E3FAFC" },
    { color: "#12B886", bg: "#E6FCF5" },
    { color: "#40C057", bg: "#EBFBEE" },
    { color: "#82C91E", bg: "#F4FCE3" },
    { color: "#FAB005", bg: "#FFF9DB" },
    { color: "#FD7E14", bg: "#FFF4E6" },
    { color: "#212529", bg: "#F8F9FA" },
];

export function ColorsDropdownInput({
    className,
    error,
    onChange,
    value,
    t
}: ColorsDropdownInputProps) {
    const [selectedColor, setSelectedColor] = useState<null | Color>(() => {
        if (!value) {
            return null;
        }

        return colors.find((c) => c.color === value) ?? null;
    });

    function handleSelect(color: Color) {
        setSelectedColor(color);
        onChange?.(color.color);
    }
    return (
        <div>
            <DropDownMenu.Root>
                <DropDownMenu.Trigger>
                    <button
                        className={cn(
                            "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px]  text-gray-700  focus:border-gray-800 transition-all outline-none text-left relative",
                            error && "!border-red-900",
                            className
                        )}
                    >
                        {t("placeholders.color")}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {!selectedColor && (
                                <ChevronDownIcon className="w-6 h-6 text-gray-800 " />
                            )}
                            {selectedColor && (
                                <ColorIcon
                                    bg={selectedColor.bg}
                                    color={selectedColor.color}
                                />
                            )}
                        </div>
                    </button>
                </DropDownMenu.Trigger>
                <DropDownMenu.Content className="grid grid-cols-4">
                    {colors.map((color) => (
                        <DropDownMenu.Item
                            key={color.color}
                            onSelect={() => handleSelect(color)}
                        >
                            <ColorIcon bg={color.bg} color={color.color} />
                        </DropDownMenu.Item>
                    ))}
                </DropDownMenu.Content>
            </DropDownMenu.Root>
            {error && (
                <div className="flex gap-2 items-center mt-2 text-red-900">
                    <CrossCircledIcon />
                    <span className="text-xs">{error}</span>
                </div>
            )}
        </div>
    );
}
