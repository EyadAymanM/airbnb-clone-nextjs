import { useEffect, useCallback, useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./CalendarComponent.css";
import { Button } from "../../../components/ui/button";
import { useTranslations, useLocale } from 'next-intl';
const CalendarComponent = ({ dateRange, setDateRange }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const t = useTranslations('Wishlist');
  const locale = useLocale();
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const handleSelect = (item) => {
    setDateRange({
      from: item.selection.startDate,
      to: item.selection.endDate,
    });
  };

  const flexibleOptions = [
    { label: t('exact-dates'), days: 0 },
    { label: t('plus-minus-1-day'), days: 1 },
    { label: t('plus-minus-2-days'), days: 2 },
    { label: t('plus-minus-3-days'), days: 3 },
    { label: t('plus-minus-7-days'), days: 7 },
  ];


  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <DateRange
          ranges={[
            {
              startDate: dateRange.from,
              endDate: dateRange.to,
              key: "selection",
            },
          ]}
          onChange={handleSelect}
          months={isMobile ? 1 : 2}
          direction="horizontal"
          showDateDisplay={false}
          rangeColors={["#000"]}
          minDate={new Date()}
          className="rounded-lg border-none shadow-sm w-full overflow-x-auto text-black bg-white"
          daySize={isMobile ? 30 : 40}
          // locale={locale}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 px-2">
        {flexibleOptions.map(({ label }) => (
          <Button
            key={label}
            variant="outline"
            className="rounded-full text-xs sm:text-sm font-normal py-1 px-3 sm:px-4 border-gray-300 hover:border-gray-900 transition duration-200"
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;