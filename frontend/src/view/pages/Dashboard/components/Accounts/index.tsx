import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";
import { AccountCard } from "./AccountCard";
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { useAccountController } from "./useAccountController";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { Spinner } from "../../../../components/Spinner";
import { PlusIcon } from '@radix-ui/react-icons';

export function Accounts() {
    const {
        sliderState,
        setSliderState,
        windowWidth,
        areValuesVisible,
        toggleVisibility,
        isLoading,
        accounts,
        openNewAccountModal,
        currentBalance,t
    } = useAccountController();

    return (
        <div className="bg-teal-900 rounded-2xl h-full w-full md:p-10 px-4 py-8 flex flex-col">
            {isLoading && (
                <div className=" w-full h-full flex items-center justify-center">
                    <Spinner classname=" text-teal-950/50 fill-white h-10 w-10" />
                </div>
            )}
            {!isLoading && (
                <>
                    <div>
                        <span className="tracking-[-0.5px] text-white block">
                            {t("accounts.totalBalance")}
                        </span>
                        <div className="flex items-center gap-2">
                            <strong
                                className={cn(
                                    "text-2xl tracking-[-1px] text-white",
                                    !areValuesVisible && "blur-md"
                                )}
                            >
                                {formatCurrency(currentBalance, t)}
                            </strong>
                            <button
                                className=" h-8 w-8 flex items-center justify-center"
                                onClick={toggleVisibility}
                            >
                                <EyeIcon open={!areValuesVisible} />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-end flex-col mt-10 md:mt-10">
                        {accounts.length === 0 && (
                            <>
                                <div className=" mb-4">
                                    <strong className="text-white trancking-[-1px] text-lg">
                                        {t("accounts.myAccounts")}
                                    </strong>
                                </div>
                                <button
                                    onClick={openNewAccountModal}
                                    className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white"
                                >
                                    <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex  items-center justify-center">
                                        <PlusIcon className=" w-6 h-6" />
                                    </div>
                                    <span className=" font-medium tracking-[-0.5px] block w-32 text-center">
                                        {t("accounts.newAccount")}
                                    </span>
                                </button>
                            </>
                        )}
                        {accounts.length > 0 && (
                            <div>
                                <Swiper
                                    spaceBetween={16}
                                    slidesPerView={
                                        windowWidth >= 500 ? 2.1 : 1.1
                                    }
                                    onSlideChange={(swiper) => {
                                        setSliderState({
                                            isBeginning: swiper.isBeginning,
                                            isEnd: swiper.isEnd,
                                        });
                                    }}
                                >
                                    <div
                                        className="flex items-center justify-between mb-4"
                                        slot="container-start"
                                    >
                                        <strong className="text-white trancking-[-1px] text-lg">
                                            {t("accounts.myAccounts")}
                                        </strong>
                                        <AccountsSliderNavigation
                                            isBeginning={
                                                sliderState.isBeginning
                                            }
                                            isEnd={sliderState.isEnd}
                                        />
                                    </div>

                                    {accounts?.map((account) => (
                                        <SwiperSlide key={account.id}>
                                            <AccountCard data={account} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
