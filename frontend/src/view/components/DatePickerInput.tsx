import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { useState } from "react";
import { formatDate } from '../../app/utils/formatDate';
import { Popover } from './Popover';
import { DatePicker } from './DatePicker';
import { TFunction } from 'i18next';

interface DatePickerInputProps {
    error?: string;
    className?: string;
    value?: Date;
    onChange?(date: Date): void;
    t: TFunction<"translation", undefined>;
}

export function DatePickerInput({
    className,
    value,
    error,
    onChange,
    t
}: DatePickerInputProps) {
    const [selectedDate, setSelectedDate] = useState(value ?? new Date());

    function handleChangeDate(date: Date) {
        setSelectedDate(date);
        onChange?.(date);
    }
    return (
        <div>
            <Popover.Root>
                <Popover.Trigger>
                    <button
                        type="button"
                        className={cn(
                            "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] pt-4 text-gray-700  focus:border-gray-800 transition-all outline-none text-left relative",
                            error && "!border-red-900",
                            className
                        )}
                    >
                        <span className="absolute text-xs text-gray-700 left-[13px] top-2 pointer-events-none">
                            {t("placeholders.date")}
                        </span>
                        <span>{formatDate(selectedDate, t)}</span>
                    </button>
                </Popover.Trigger>
                <Popover.Content>
                    <DatePicker
                        value={selectedDate}
                        onChange={handleChangeDate}
                    />
                </Popover.Content>
            </Popover.Root>

            {error && (
                <div className="flex gap-2 items-center mt-2 text-red-900">
                    <CrossCircledIcon />
                    <span className="text-xs">{error}</span>
                </div>
            )}
        </div>
    );
}
