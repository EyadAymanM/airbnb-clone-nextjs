import React, { useState } from "react";
import { addDays, format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../../../components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../components/ui/tabs";
import { Button } from "../../../components/ui/button";
import FlexibleOptions from "./FlexibleOptions";
import CalendarComponent from "../CalendarComponent/CalendarComponent";
import { useLocale, useTranslations } from 'next-intl';
const DateDropdown = () => {
  const t = useTranslations('Wishlist');
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const locale = useLocale();
  const handleReset = () => {
    setDateRange({
      from: new Date(),
      to: addDays(new Date(), 7),
    });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          aria-haspopup="true"
          className={`bg-white text-gray-700 border border-gray-200 rounded-full px-5 py-2 hover:border-gray-900 transition duration-300 flex items-center outline-0 ${locale === 'ar' ? 'mr-2' : 'ml-2'}`}
        >
          {dateRange.from && dateRange.to
            ? `${format(dateRange.from, 'dd/MM')} - ${format(dateRange.to, 'dd/MM')}`
            : t('add-dates')}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="p-6 bg-white rounded-2xl shadow-lg w-full sm:max-w-[90vw] md:max-w-[50vw] max-w-[90vw] "
        align="start"
      >
        <div className="border-b pb-4 mb-4">
          <Tabs defaultValue="choose-dates">
            <TabsList className="flex bg-gray-100 p-1 rounded-full mb-4 w-fit mx-auto">
              <TabsTrigger
                value="choose-dates"
                className="rounded-full py-2 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                {t('choose-dates')}
              </TabsTrigger>
              <TabsTrigger
                value="flexible"
                className="rounded-full py-2 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                {t("i'm-flexible")}
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="choose-dates"
              className="space-y-4 scroll-m-2 overflow-y-auto max-h-64"
            >
              <CalendarComponent dateRange={dateRange} setDateRange={setDateRange} />
            </TabsContent>

            <TabsContent
              value="flexible"
              className="space-y-4 scroll-m-2 overflow-y-auto max-h-64"
            >
              <FlexibleOptions />
            </TabsContent>
          </Tabs>
        </div>

        <div className={`flex justify-between items-center ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
          <Button
            variant="link"
            className="px-4 py-2 rounded-2xl underline font-semibold text-gray-700 hover:bg-gray-100 transition-colors duration-300 disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed"
            onClick={handleReset}
            disabled={!dateRange.from && !dateRange.to}
          >
            {t('reset')}
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            className="bg-black text-white px-4 py-2 rounded-2xl hover:bg-gray-800 transition-colors"
          >
            {t('save')}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateDropdown;