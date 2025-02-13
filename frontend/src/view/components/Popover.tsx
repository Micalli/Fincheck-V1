import * as RdxPopover from "@radix-ui/react-popover";
import React from "react";
import { cn } from "../../app/utils/cn";

export function PopoverRoot({ children }: { children: React.ReactNode }) {
    return <RdxPopover.Root>{children}</RdxPopover.Root>;
}

export function PopoverTrigger({ children }: { children: React.ReactNode }) {
    return (
        <RdxPopover.Trigger className="outline-none" asChild>
            {children}
        </RdxPopover.Trigger>
    );
}

interface DropDownMenuContentProps {
    children: React.ReactNode;
    className?: string;
}

export function PopoverContent({
    children,
    className,
}: DropDownMenuContentProps) {
    return (
        <RdxPopover.Portal>
            <RdxPopover.Content
                className={cn(
                    "rounded-2xl bg-white space-y-2  shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[99] p-4",
                    "data-[side=bottom]:animate-slide-up-and-fade",
                    "data-[side=top]:animate-slide-down-and-fade",
                    className
                )}
            >
                {children}
            </RdxPopover.Content>
        </RdxPopover.Portal>
    );
}

export const Popover = {
    Root: PopoverRoot,
    Trigger: PopoverTrigger,
    Content: PopoverContent,
};
