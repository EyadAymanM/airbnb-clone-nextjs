import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const CalendarComponent = ({ dateRange, setDateRange }) => {
            
  const handleSelect = (date) => {
    if (!dateRange.from) {
      setDateRange({ from: date, to: null });
    } else if (dateRange.from && !dateRange.to) {
      setDateRange({ ...dateRange, to: date });
    } else {
      setDateRange({ from: date, to: null });
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
          className="rounded-lg border-none shadow-sm"
          classNames={{
            nav_button:
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            head_cell:
              "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-gray-500",
            row: "flex w-full mt-2",
            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:border-black hover:border  rounded-full",
            day_selected:
              "bg-black text-white  focus:bg-[#222222] focus:text-white",
            day_today: "bg-[#F7F7F7] text-[#222222] font-semibold",
            day_range_middle:
              "aria-selected:bg-[#D1E7FD] aria-selected:text-[#1D4ED8]",
            day_disabled: "text-gray-400 opacity-50",
            day_range_end:
              "aria-selected:bg-[#1D4ED8] aria-selected:text-white",
            day_range_start:
              "aria-selected:bg-[#1D4ED8] aria-selected:text-white",
          }}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {["Exact dates", "± 1 day", "± 2 days", "± 3 days", "± 7 days"].map(
          (option) => (
            <Button
              key={option}
              variant="outline"
              className="rounded-full text-sm font-normal py-1 px-4 border-gray-300 hover:border-gray-900"
            >
              {option}
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
