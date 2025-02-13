import  { useState } from "react";
import * as RdxSelect from "@radix-ui/react-select";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    CrossCircledIcon,
} from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";

interface SelectProps {
    name?: string;
    error?: string;
    className?: string;
    placeholder?: string;
    options: {
        value: string;
        label: string;
    }[];
    onChange?(value: string): void;
    value?: string;
}

export function Select({
    error,
    className,
    placeholder,
    options,
    onChange,
    value
}: SelectProps) {
    function handleSelect(value: string) {
        setSelectedValue(value);
        onChange?.(value)
    }
    const [selectedValue, setSelectedValue] = useState(value ?? '');
    return (
        <div>
            <div className="relative">
                <label
                    className={cn(
                        "absolute z-10  top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none",
                        selectedValue &&
                            " text-xs left-[13px] top-2 transition-all translate-y-0"
                    )}
                >
                    {placeholder}
                </label>
                <RdxSelect.Root value={value} onValueChange={handleSelect}>
                    <RdxSelect.Trigger
                        className={cn(
                            "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] pt-4 text-gray-800  focus:border-gray-800 transition-all outline-none text-left relative",
                            error && "!border-red-900",
                            className
                        )}
                        aria-label="Food"
                    >
                        <RdxSelect.Value />
                        <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
                            <ChevronDownIcon className="w-6 h-6 text-gray-800" />
                        </RdxSelect.Icon>
                    </RdxSelect.Trigger>
                    <RdxSelect.Portal>
                        <RdxSelect.Content className="z-[99] overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0,10)]">
                            <RdxSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                                <ChevronUpIcon className="w-6 h-6 text-gray-900" />
                            </RdxSelect.ScrollUpButton>
                            <RdxSelect.Viewport className="p-[2px]">
                                {options.map((options) => (
                                    <RdxSelect.Item
                                        key={options.value}
                                        className={cn(
                                            "p-2 text-gray-800 text-sm data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-50 rounded-lg transition-colors",
                                            className
                                        )}
                                        value={options.value}
                                    >
                                        <RdxSelect.ItemText>
                                            {options.label}
                                        </RdxSelect.ItemText>
                                    </RdxSelect.Item>
                                ))}
                            </RdxSelect.Viewport>
                            <RdxSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white ext-gray-800 cursor-default">
                                <ChevronDownIcon />
                            </RdxSelect.ScrollDownButton>
                        </RdxSelect.Content>
                    </RdxSelect.Portal>
                </RdxSelect.Root>
            </div>
            {error && (
                <div className="flex gap-2 items-center mt-2 text-red-900">
                    <CrossCircledIcon />
                    <span className="text-xs">{error}</span>
                </div>
            )}
        </div>
    );
}
// const SelectItem = React.forwardRef(
//     ({ children, className, ...props }, forwardedRef) => {
//         return (
//             <RdxSelect.Item
//                 className={cn(
//                     "text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
//                     className
//                 )}
//                 {...props}
//                 ref={forwardedRef}
//             >
//                 <RdxSelect.ItemText>{children}</RdxSelect.ItemText>
//                 <RdxSelect.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
//                     <CheckIcon />
//                 </RdxSelect.ItemIndicator>
//             </RdxSelect.Item>
//         );
//     }
// );
