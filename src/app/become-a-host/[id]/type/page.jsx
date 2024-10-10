'use client'
import NextBackFooter from "@/app/_components/AddListingLayout/NextBackFooter"
import { useState } from "react";

function Page() {
  const types = [
    {
      title: "An entire place (Apartment)",
      desc: "Guests have the whole place to themselves.",
      value: "apartment",
    },
    {
      title: "A room",
      desc: "Guests have their own room in a home, plus access to shared spaces.",
      value: "room",
    },
    {
      title: "A shared room in a hostel",
      desc: "Guests have the whole place to themselves.",
      value: "hostel",
    },
    
  ]
  const [selectedType, setSelectedType] = useState(null);
  return (
    <>
      <h1 className="max-w-2xl mx-auto my-2 text-3xl font-semibold font-airbnb text-center">What type of place will guests have?</h1>
      <div className="grid grid-cols-1 gap-4 p-4 max-w-2xl mx-auto h-[calc(100vh-230px)]">
        {types.map(({ title, desc, value }) => (
          <div
            key={value}
            onClick={() => setSelectedType(value)}
            className={`flex flex-col  justify-center px-4 border rounded-xl cursor-pointer transition-all overflow-hidden ${selectedType === value
              ? "border-primary text-primary bg-[#f7f7f7]"
              : "border-gray-200 hover:border-gray-300"
              }`}
            role="button"
            tabIndex={0}
          >
            <div className="h-fit">
              
            <p className="text-lg font-semibold font-airbnb ms-2 text-[#333]">{title}</p>
            <span className="text-base font-medium font-airbnb ms-2 text-[#555]">{desc}</span>
            </div>
          </div>
        ))}
      </div>
      <NextBackFooter progress={15} className="" />
    </>
  )
}
export default Page