'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import GuestSelector from "@/app/_components/GuestSelector";

export default function BookingCard({ className }) {
  const [date, setDate] = useState({
    from: new Date(2024, 9, 20),
    to: addDays(new Date(2024, 9, 20), 20),
  })

  const [isGustOpen ,setIsGuestOpen] = useState(false)
  const [guests , setGuests] = useState({
  adults:1,
  children: 0,
  infants:0,
  pets:0,})

  const totalGuests = guests.adults + guests.children

  const updateGuests = (type , increment)=>{
    setGuests(prev=>({
      ...prev,
      [type]:Math.max(0, prev[type] = (increment ? 1:-1))
    }))
  }

  return (
    <Card className={`w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl">Add dates for prices</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={`w-auto justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={1}
                      className='sm:hidden'
                    />
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                      className='hidden sm:block'
                    />
                  </PopoverContent>
                </Popover>
              </div>
            <div className=" space-y-2 w-auto justify-start text-left font-normal">
              <GuestSelector className="w-auto justify-start text-left font-normal" />

            </div>
        </form>
      </CardContent>
      <CardFooter >
        <Button  className="x-full bg-rose-700 hover:bg-rose-800 text-white">check availability</Button>
      </CardFooter>
    </Card>
  )
}



