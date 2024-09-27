import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const DateDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ from: null, to: null });

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
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="bg-white text-gray-700 border border-gray-200 rounded-full px-5 py-2 hover:border-gray-900 transition duration-300 flex items-center outline-0">
          {dateRange.from && dateRange.to
            ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
            : "Add Dates"}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-6 bg-white rounded-xl shadow-lg w-auto" align="start">
        <div className="border-b pb-4 mb-4">
          <Tabs defaultValue="choose-dates">
            <TabsList className="flex  bg-gray-200">
              <TabsTrigger value="choose-dates" className="selection:bg-white">Choose dates</TabsTrigger>
              <TabsTrigger value="flexible">I'm flexible</TabsTrigger>
            </TabsList>

            <TabsContent value="choose-dates" className="space-y-4 max-h-64 overflow-y-auto">
              <div className="flex justify-center mt-4">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleSelect}
                  numberOfMonths={2}
                  className="rounded-md border"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {["Exact dates", "± 1 day", "± 2 days", "± 3 days", "± 7 days"].map((option) => (
                  <Button key={option} variant="outline" className="rounded-full">
                    {option}
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="flexible" >
              <div className="py-4 space-y-4 max-h-64 overflow-y-auto">
                <p className="text-muted-foreground">Flexible date</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => {
            setDateRange({ from: null, to: null });
            setIsOpen(false);
          }}>Reset</Button>
          <Button onClick={() => setIsOpen(false)}>Save</Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateDropdown;