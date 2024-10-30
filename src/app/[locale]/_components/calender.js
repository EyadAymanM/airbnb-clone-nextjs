"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function CalendarDemo() {
  const [startDate, setStartDate] = React.useState(undefined);
  const [endDate, setEndDate] = React.useState(undefined);
  const [daysCount, setDaysCount] = React.useState(null);

  const handleDateSelect = (range) => {
    if (range && range.from) {
      setStartDate(range.from);  
      setEndDate(range.to || undefined);

      if (range.to) {
        const time = new Date(range.to) - new Date(range.from);
        const Days = Math.ceil(time / (1000 * 60 * 60 * 24));
        setDaysCount(Days); 
      } else {
        setDaysCount(null); 
      }
    } else {
      setStartDate(undefined);
      setEndDate(undefined);
      setDaysCount(null); 

    }
  };

  const disablePastDates = (date) => {
    return date < new Date();  
  };

  const handleClearDates = ()=>{
    setStartDate(undefined);
    setEndDate(undefined);
    setDaysCount(null);
  }

  return (
    <div className="booking-calendar p-4">
      <h2 className="text-xl font-bold mb-4">
        {daysCount === null
          ? "Select check-in date"
          : `You have selected ${daysCount} day(s)`}
      </h2>
      <div className="flex flex-col sm:flex-row mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
        <p className="text-sm">
          {startDate
            ? `Check-in: ${startDate.toDateString()}`
            : "Minimum stay: 2 nights"}
        </p>
        {endDate && (
          <p className="text-sm">Check-out: {endDate.toDateString()}</p>
        )}
      </div>

      <div className="flex justify-center">
        <Calendar
          mode="range"
          selected={{ from: startDate, to: endDate }}
          onSelect={handleDateSelect}
          disabled={disablePastDates}
          numberOfMonths={1}
          className={cn(
            "rounded-md border",
            "md:hidden",
            "max-w-full overflow-x-auto"
  )}
        />

        <div className="hidden md:block">
        <Calendar
          mode="range"
          selected={{ from: startDate, to: endDate }}
          onSelect={handleDateSelect}
          disabled={disablePastDates}
          numberOfMonths={2}
          className="rounded-md border max-w-full overflow-x-auto"
          
        />
        </div>

        
      </div>
    </div>
  )
}






    // <div className="booking-calendar">
    //   <h2 className="text-xl font-bold">
    //   {daysCount === null ? "select check-in date" : `You have selected ${daysCount} day(s)`}
    //   </h2>
    //   <div className="flex mt-4">
    //     <p>
    //        {startDate ? startDate.toDateString() : "Minimum stay: 2 nights"}
    //     </p> 
    //     <p>
    //        {endDate ? endDate.toDateString() :""}
    //     </p>
    //   </div>
     
     
    //   <div className="flex space-x-4">
    //     <Calendar
    //       mode="range"
    //       selected={{ from: startDate, to: endDate }}  
    //       onSelect={handleDateSelect}
    //       disabled={disablePastDates}  
    //       className="rounded-md border"
    //     />
    //   </div>

      
    // </div>
