import { useSwiper } from "swiper/react";
import { cn } from "../../../../../app/utils/cn";

interface SliderOptionProps {
    isActive: boolean;
    month: string;
    index: number;
}

export function SliderOption({ isActive, month, index }: SliderOptionProps) {
    const swiper = useSwiper();

    return (
        <button
            onClick={() => swiper.slideTo(index)}
            className={cn(
                "rounded-full w-full h-12 text-sm text-gray-800 tracking-[-0.5px] font-medium",
                isActive && "bg-white"
            )}
        >
            {month}
        </button>
    );
}
