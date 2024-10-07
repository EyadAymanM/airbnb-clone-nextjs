import { useEffect, useCallback } from "react";
import { DateRange } from "react-date-range";
import { addDays, subDays, isAfter, isBefore } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./CalendarComponent.css";
import { Button } from "../../../components/ui/button";

const CalendarComponent = ({ dateRange, setDateRange }) => {
  const handleSelect = (item) => {
    setDateRange({
      from: item.selection.startDate,
      to: item.selection.endDate,
    });
  };

  const flexibleOptions = [
    { label: "Exact dates", days: 0 },
    { label: "± 1 day", days: 1 },
    { label: "± 2 days", days: 2 },
    { label: "± 3 days", days: 3 },
    { label: "± 7 days", days: 7 },
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
          months={2}
          direction="horizontal"
          showDateDisplay={false}
          rangeColors={['#000']}
          minDate={new Date()}
          // maxDate={addDays(new Date(), 365)}
          className="rounded-lg border-none shadow-sm !w-full  overflow-x-auto text-black bg-white"
          
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {flexibleOptions.map(({ label }) => (
          <Button
            key={label}
            variant="outline"
            className="rounded-full text-sm font-normal py-1 px-4 border-gray-300 hover:border-gray-900"
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
