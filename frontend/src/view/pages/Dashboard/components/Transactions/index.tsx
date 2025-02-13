import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    BR_MONTHS,
    EN_MONTHS,
    DE_MONTHS,
    ES_MONTHS,
    FR_MONTHS,
} from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useTransactionsController } from "./useTransactionsController";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import emptyState from "../../../../../assets/emptyState.svg";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FiltersModal } from "./FiltersModal";
import { formatDate } from "../../../../../app/utils/formatDate";
import { EditTransactionModal } from "../../modals/EditTransactionModal";

export function Transactions() {
    const {
        areValuesVisible,
        transactions,
        isInitialLoading,
        isLoading,
        handleChangeFilters,
        handleCloseFiltersModal,
        handleOpenFiltersModal,
        isFiltersModalOpen,
        filters,
        handleApplyFilters,
        isEditModalOpen,
        handleCloseEditModal,
        handleOpenEditModal,
        transactionBeingEdited,
        t,
        currentLanguage,
    } = useTransactionsController();

    const hasTransactions = transactions.length > 0;

    return (
        <div className="bg-gray-100 rounded-2xl h-full w-full p-10 px-4 py-8 flex flex-col">
            {isInitialLoading && (
                <div className=" w-full h-full flex items-center justify-center">
                    <Spinner classname="h-10 w-10" />
                </div>
            )}
            {!isInitialLoading && (
                <>
                    <FiltersModal
                        open={isFiltersModalOpen}
                        onClose={handleCloseFiltersModal}
                        onApplyFilters={handleApplyFilters}
                    />

                    <header>
                        <div className="flex items-center justify-between">
                            <TransactionTypeDropdown
                                onSelect={handleChangeFilters("type")}
                                selectedType={filters.type}
                                t={t}
                            />
                            <button onClick={handleOpenFiltersModal}>
                                <FilterIcon />
                            </button>
                        </div>
                        <div className="mt-6 relative">
                            <Swiper
                                slidesPerView={3}
                                initialSlide={filters.month}
                                centeredSlides
                                onSlideChange={(swiper) => {
                                    handleChangeFilters("month")(
                                        swiper.realIndex
                                    );
                                }}
                            >
                                <SliderNavigation />
                                {currentLanguage === "pt"
                                    ? BR_MONTHS.map((month, index) => (
                                          <SwiperSlide key={month}>
                                              {({ isActive }) => (
                                                  <SliderOption
                                                      isActive={isActive}
                                                      month={month}
                                                      index={index}
                                                  />
                                              )}
                                          </SwiperSlide>
                                      ))
                                    : currentLanguage === "en"
                                    ? EN_MONTHS.map((month, index) => (
                                          <SwiperSlide key={month}>
                                              {({ isActive }) => (
                                                  <SliderOption
                                                      isActive={isActive}
                                                      month={month}
                                                      index={index}
                                                  />
                                              )}
                                          </SwiperSlide>
                                      ))
                                    : currentLanguage === "de"
                                    ? DE_MONTHS.map((month, index) => (
                                          <SwiperSlide key={month}>
                                              {({ isActive }) => (
                                                  <SliderOption
                                                      isActive={isActive}
                                                      month={month}
                                                      index={index}
                                                  />
                                              )}
                                          </SwiperSlide>
                                      ))
                                    : currentLanguage === "es"
                                    ? ES_MONTHS.map((month, index) => (
                                          <SwiperSlide key={month}>
                                              {({ isActive }) => (
                                                  <SliderOption
                                                      isActive={isActive}
                                                      month={month}
                                                      index={index}
                                                  />
                                              )}
                                          </SwiperSlide>
                                      ))
                                    : FR_MONTHS.map((month, index) => (
                                          <SwiperSlide key={month}>
                                              {({ isActive }) => (
                                                  <SliderOption
                                                      isActive={isActive}
                                                      month={month}
                                                      index={index}
                                                  />
                                              )}
                                          </SwiperSlide>
                                      ))}
                            </Swiper>
                        </div>
                    </header>
                    <div className="overflow-y-auto mt-4 space-y-2 flex-1">
                        {isLoading && (
                            <div className="flex items-center justify-center flex-col h-full">
                                <Spinner classname="h-10 w-10" />
                            </div>
                        )}
                        {!hasTransactions && !isLoading && (
                            <div className="flex items-center justify-center flex-col h-full">
                                <img src={emptyState} alt="Empty State" />
                                <p className="text-gray-700">
                                    {t("transactions.empty")}
                                </p>
                            </div>
                        )}

                        {hasTransactions && !isLoading && (
                            <>
                                {transactionBeingEdited && (
                                    <EditTransactionModal
                                        open={isEditModalOpen}
                                        onClose={handleCloseEditModal}
                                        transaction={transactionBeingEdited}
                                    />
                                )}

                                {transactions.map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                                        role="button"
                                        onClick={() =>
                                            handleOpenEditModal(transaction)
                                        }
                                    >
                                        <div className="flex-1 flex items-center gap-3">
                                            <CategoryIcon
                                                category={
                                                    transaction.category?.icon
                                                }
                                                type={
                                                    transaction.type ===
                                                    "EXPENSE"
                                                        ? "expense"
                                                        : "income"
                                                }
                                            />
                                            <div>
                                                <strong className="font-bold tracking-[-0.5px}">
                                                    {transaction.name}
                                                </strong>
                                                <span className=" text-gray-600 text-sm block">
                                                    {formatDate(
                                                        new Date(
                                                            transaction.date
                                                        ),
                                                        t
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <span
                                            className={cn(
                                                "text-green-800 tracking-[0.5px] font-medium",
                                                !areValuesVisible && "blur-sm",
                                                transaction.type === "EXPENSE"
                                                    ? "text-red-800"
                                                    : "text-green-800"
                                            )}
                                        >
                                            {transaction.type === "EXPENSE"
                                                ? "-"
                                                : "+"}
                                            {formatCurrency(
                                                transaction.value,
                                                t
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
