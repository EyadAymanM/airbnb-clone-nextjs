// import * as React from "react"

// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// import { addDays, format } from "date-fns"
// import { Calendar as CalendarIcon } from "lucide-react"
// import { DateRange } from "react-day-picker"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// export default function BookingCard({ className }: React.HTMLAttributes<HTMLDivElement>) {
//   const [date, setDate] = React.useState<DateRange | undefined>({
//     from: new Date(2022, 0, 20),
//     to: addDays(new Date(2022, 0, 20), 20),
//   })

//   return (
//     <Card className="w-[350px]">
//       <CardHeader>
//         <CardTitle>Create project</CardTitle>
//         <CardDescription>Deploy your new project in one-click.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="grid w-full items-center gap-4">
//             <div className="flex flex-col space-y-1.5">
//             <div className={cn("grid gap-2", className)}>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             id="date"
//             variant={"outline"}
//             className={cn(
//               "w-[300px] justify-start text-left font-normal",
//               !date && "text-muted-foreground"
//             )}
//           >
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {date?.from ? (
//               date.to ? (
//                 <>
//                   {format(date.from, "LLL dd, y")} -{" "}
//                   {format(date.to, "LLL dd, y")}
//                 </>
//               ) : (
//                 format(date.from, "LLL dd, y")
//               )
//             ) : (
//               <span>Pick a date</span>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           <Calendar
//             initialFocus
//             mode="range"
//             defaultMonth={date?.from}
//             selected={date}
//             onSelect={setDate}
//             numberOfMonths={2}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               {/* <Label htmlFor="framework">Framework</Label> */}
//               <Select>
//                 <SelectTrigger id="framework">
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent position="popper">
//                   <SelectItem value="next">Next.js</SelectItem>
//                   <SelectItem value="sveltekit">SvelteKit</SelectItem>
//                   <SelectItem value="astro">Astro</SelectItem>
//                   <SelectItem value="nuxt">Nuxt.js</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </form>
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button variant="outline">Cancel</Button>
//         <Button>Deploy</Button>
//       </CardFooter>
//     </Card>
//   )
// }


'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function BookingCard({ className }) {
  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  return (
    <Card className="items-center sm:w-[600px] md:w-[300px] lg:w-[500px]">
      <CardHeader>
        <CardTitle>Add dates for prices</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <div className={`grid gap-2 ${className}`}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={`w-[300px] justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
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
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button  className="bg-rose-700">check availability</Button>
      </CardFooter>
    </Card>
  )
}



