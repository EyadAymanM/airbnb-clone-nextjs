"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

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
    }
  };

  const disablePastDates = (date) => {
    const today = new Date();
    return date < today;  
  };

  return (
    <div className="booking-calendar">
      <h2 className="text-xl font-bold">
      {daysCount === null ? "select check-in date" : `You have selected ${daysCount} day(s)`}
      </h2>
      <div className="flex mt-4">
        <p>
           {startDate ? startDate.toDateString() : "Minimum stay: 2 nights"}
        </p> 
        <p>
           {endDate ? endDate.toDateString() :""}
        </p>
      </div>
     
     
      <div className="flex space-x-4">
        <Calendar
          mode="range"
          selected={{ from: startDate, to: endDate }}  
          onSelect={handleDateSelect}
          disabled={disablePastDates}  
          className="rounded-md border"
        />
      </div>

      
    </div>
  );
}