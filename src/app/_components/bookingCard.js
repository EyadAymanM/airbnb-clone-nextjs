// 'use client'

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { addDays, format , isBefore , startOfToday } from "date-fns"
// import { Calendar as CalendarIcon } from "lucide-react"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Input } from "@/components/ui/input"

// const GuestSelector = ({ guests, updateGuests }) => {
//   const options = [
//     { label: 'Adults', type: 'adults', description: 'Ages 13 or above' },
//     { label: 'Children', type: 'children', description: 'Ages 2-12' },
//     { label: 'Infants', type: 'infants', description: 'Under 2' },
//     { label: 'Pets', type: 'pets', description: 'Service animals welcome' },
//   ]

//   return (
//     <div className="space-y-4">
//       {options.map((option) => (
//         <div key={option.type} className="flex items-center justify-between">
//           <div>
//             <p className="font-medium">{option.label}</p>
//             <p className="text-sm text-gray-500">{option.description}</p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => updateGuests(option.type, false)}
//               disabled={guests[option.type] === 0}
//             >
//               -
//             </Button>
//             <span className="w-8 text-center">{guests[option.type]}</span>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => updateGuests(option.type, true)}
//             >
//               +
//             </Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default function BookingCard({ price, className }) {
//   const today = startOfToday()
//   const [date, setDate] = useState({
//     from: addDays(today,1),
//     to: addDays(today, 5),
//   })

//   const [guests, setGuests] = useState({
//     adults: 1,
//     children: 0,
//     infants: 0,
//     pets: 0,
//   })

//   const updateGuests = (type, increment) => {
//     setGuests(prev => ({
//       ...prev,
//       [type]: Math.max(0, prev[type] + (increment ? 1 : -1))
//     }))
//   }

//   const totalGuests = guests.adults + guests.children
//   const nightsCount = Math.ceil((date.to - date.from) / (1000 * 60 * 60 * 24))
//   const subtotal = price * nightsCount
//   const cleaningFee = 50
//   const serviceFee = Math.round(subtotal * 0.15)
//   const total = subtotal + cleaningFee + serviceFee

//   return (
//     <Card className={`w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl sticky top-24 ${className}`}>
//       <CardHeader>
//         <CardTitle className="text-lg sm:text-xl md:text-2xl">
//           <span className="font-bold">${price}</span> <span className="text-gray-500 font-normal">night</span>
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form className="space-y-4">
//           <div className="grid grid-cols-2  border rounded-xl overflow-hidden">
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   className="justify-start font-normal h-[74px] border-r"
//                 >
//                   <div className="text-left">
//                     <div className="text-sm font-medium">CHECK-IN</div>
//                     <div className="text-sm">{format(date.from, "MMM d, yyyy")}</div>
//                   </div>
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                   initialFocus
//                   mode="range"
//                   defaultMonth={date.to}
//                   selected={date.to}
//                   onSelect={(newDate)=>setDate(prev=>({...prev,from:newDate}))}
//                   disabled={(date) => isBefore(date,today)}
//                   numberOfMonths={2}
//                 />
//               </PopoverContent>
//             </Popover>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   className="justify-start font-normal h-[74px]"
//                 >
//                   <div className="text-left">
//                     <div className="text-sm font-medium">CHECKOUT</div>
//                     <div className="text-sm">{format(date.to, "MMM d, yyyy")}</div>
//                   </div>
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                   initialFocus
//                   mode="range"
//                   defaultMonth={date.from}
//                   selected={date}
//                   onSelect={(newDate)=>setDate(prev=>({...prev,to:newDate}))}
//                   disabled={(date) => isBefore(date,from,1)}
//                   numberOfMonths={2}
//                 />
//               </PopoverContent>
//             </Popover>

//             <Popover>
//             <PopoverTrigger >
//               <Button
//                 variant="outline"
//                 role="combobox"
//                 className="w-full justify-between h-[74px]"
//               >
//                 <div className="text-left">
//                   <div className="text-sm font-medium">GUESTS</div>
//                   <div className="text-sm">
//                     {totalGuests} guest{totalGuests !== 1 ? 's' : ''}
//                     {guests.infants > 0 && `, ${guests.infants} infant${guests.infants !== 1 ? 's' : ''}`}
//                     {guests.pets > 0 && `, ${guests.pets} pet${guests.pets !== 1 ? 's' : ''}`}
//                   </div>
//                 </div>
//                 <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-full p-0">
//               <GuestSelector guests={guests} updateGuests={updateGuests} />
//             </PopoverContent>
//           </Popover>
//           </div>
          
//         </form>
//       </CardContent>
//       <CardFooter className="flex flex-col">
//         <Button className="w-full bg-[#FF385C] hover:bg-[#FF385C]/90 text-white">
//           Reserve
//         </Button>
//         <p className="text-center text-sm text-gray-500 mt-2 mb-4">You won't be charged yet</p>
//         <div className="w-full space-y-2">
//           <div className="flex justify-between">
//             <span className="underline">${price} x {nightsCount} nights</span>
//             <span>${subtotal}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="underline">Cleaning fee</span>
//             <span>${cleaningFee}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="underline">Service fee</span>
//             <span>${serviceFee}</span>
//           </div>
//         </div>
//         <div className="border-t mt-4 pt-4 flex justify-between font-semibold w-full">
//           <span>Total before taxes</span>
//           <span>${total}</span>
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }



'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { addDays, format, isBefore, startOfToday, isValid, isSameDay } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const GuestSelector = ({ guests, updateGuests }) => {
  const options = [
    { label: 'بالغين', type: 'adults', description: 'عمر 13 أو أكبر' },
    { label: 'أطفال', type: 'children', description: 'سن 2-12' },
    { label: 'رضع', type: 'infants', description: 'أقل من 2' },
    { label: 'حيوانات أليفة', type: 'pets', description: 'الحيوانات الخدمية مرحب بها' },
  ]

  return (
    <div className="space-y-4 p-4">
      {options.map((option) => (
        <div key={option.type} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{option.label}</p>
            <p className="text-sm text-gray-500">{option.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateGuests(option.type, false)}
              disabled={guests[option.type] === 0}
            >
              -
            </Button>
            <span className="w-8 text-center">{guests[option.type]}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateGuests(option.type, true)}
            >
              +
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function BookingCard({ price, className }) {
  const today = startOfToday()
  const [date, setDate] = useState({
    from: null,
    to: null,
  })
  const [isSelectingTo, setIsSelectingTo] = useState(false)

  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  })

  const updateGuests = (type, increment) => {
    setGuests(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (increment ? 1 : -1))
    }))
  }

  const totalGuests = guests.adults + guests.children
  const nightsCount = date.from && date.to ? Math.ceil((date.to - date.from) / (1000 * 60 * 60 * 24)) : 0
  const subtotal = price * nightsCount
  const cleaningFee = 50
  const serviceFee = Math.round(subtotal * 0.15)
  const total = subtotal + cleaningFee + serviceFee

  const handleDateSelect = (selectedDate) => {
    setDate(prev => {
      if (!prev.from || isSelectingTo) {
        setIsSelectingTo(!isSelectingTo)
        return { ...prev, [isSelectingTo ? 'to' : 'from']: selectedDate }
      } else {
        setIsSelectingTo(false)
        if (isBefore(selectedDate, prev.from)) {
          return { from: selectedDate, to: null }
        } else {
          return { ...prev, to: selectedDate }
        }
      }
    })
  }

  const isDateSelected = (day) => {
    if (!date.from && !date.to) return false
    if (date.from && isSameDay(day, date.from)) return true
    if (date.to && isSameDay(day, date.to)) return true
    if (date.from && date.to && isBefore(date.from, day) && isBefore(day, date.to)) return true
    return false
  }

  return (
    <Card className={`w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl sticky top-24 ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl">
          <span className="font-bold">${price}</span> <span className="text-gray-500 font-normal">لليلة</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="border rounded-xl overflow-hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="justify-start font-normal h-[74px] w-full border-b"
                >
                  <div className="text-left">
                    <div className="text-sm font-medium">تسجيل الوصول</div>
                    <div className="text-sm">{isValid(date.from) ? format(date.from, "MMM d, yyyy") : "اختر تاريخ"}</div>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  disabled={(day) => isBefore(day, today)}
                  numberOfMonths={2}
                  modifiers={{ selected: isDateSelected }}
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="justify-start font-normal h-[74px] w-full border-b"
                >
                  <div className="text-left">
                    <div className="text-sm font-medium">تسجيل المغادرة</div>
                    <div className="text-sm">{isValid(date.to) ? format(date.to, "MMM d, yyyy") : "اختر تاريخ"}</div>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  disabled={(day) => isBefore(day, date.from || today)}
                  numberOfMonths={2}
                  modifiers={{ selected: isDateSelected }}
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  role="combobox"
                  className="w-full justify-between h-[74px]"
                >
                  <div className="text-left">
                    <div className="text-sm font-medium">الضيوف</div>
                    <div className="text-sm">
                      {totalGuests} ضيف
                      {guests.infants > 0 && `، ${guests.infants} رضيع`}
                      {guests.pets > 0 && `، ${guests.pets} حيوان أليف`}
                    </div>
                  </div>
                  <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <GuestSelector guests={guests} updateGuests={updateGuests} />
              </PopoverContent>
            </Popover>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full bg-[#FF385C] hover:bg-[#FF385C]/90 text-white">
          احجز
        </Button>
        <p className="text-center text-sm text-gray-500 mt-2 mb-4">لن يتم خصم أي مبلغ الآن</p>
        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <span className="underline">${price} × {nightsCount} ليلة</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">رسوم التنظيف</span>
            <span>${cleaningFee}</span>
          </div>
          <div className="flex justify-between">
            <span className="underline">رسوم الخدمة</span>
            <span>${serviceFee}</span>
          </div>
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between font-semibold w-full">
          <span>المجموع قبل الضرائب</span>
          <span>${total}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
