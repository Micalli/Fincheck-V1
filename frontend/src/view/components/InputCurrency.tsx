import { CrossCircledIcon } from "@radix-ui/react-icons";
import { NumericFormat } from "react-number-format";
import { cn } from "../../app/utils/cn";

interface InputCurrencyProps {
    error?: string;
    onChange?(value: string): void;
    value?: string | number;
}

export function InputCurrency({ error, onChange, value }: InputCurrencyProps) {
    return (
        <div>
            <NumericFormat
                className={cn(
                    "w-full font-bold  text-gray-800 text-[32px] tracking-[-1px] outline-none",
                    error && "text-red-900"
                )}
                onChange={(event) => onChange?.(event.target.value)}
                thousandSeparator="."
                decimalSeparator=","
                value={value}
            />
            {error && (
                <div className="flex gap-2 items-center mt-2 text-red-900">
                    <CrossCircledIcon />
                    <span className="text-xs">{error}</span>
                </div>
            )}
        </div>
    );
}
