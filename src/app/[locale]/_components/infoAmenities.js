import React from 'react'
import { FaWifi , FaSwimmer,FaTv  , FaDumbbell , FaCity } from 'react-icons/fa';
import { MdKitchen, MdOutlineIron ,MdMeetingRoom  } from 'react-icons/md';
import { PiHairDryer } from 'react-icons/pi';
import { IoWaterOutline } from 'react-icons/io5';
import { GiHanger } from 'react-icons/gi';
import { TbParkingCircle,TbAirConditioningDisabled  } from "react-icons/tb";
import { LuMicrowave } from "react-icons/lu";
import { BiSolidWasher } from "react-icons/bi";
import { FaKitchenSet } from "react-icons/fa6";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button"

export default function infoAmenities() {
    const iconMap = {
        FaWifi: <FaWifi/>,
        FaSwimmer: <FaSwimmer/>,
        TbParkingCircle: <TbParkingCircle />,
        TbAirConditioningDisabled: <TbAirConditioningDisabled/>,
        FaDumbbell: <FaDumbbell/>,
        FaKitchenSet :<FaKitchenSet />,
        MdKitchen :<MdKitchen />,
        FaCity :<FaCity />,
        PiHairDryer :<PiHairDryer />,
        IoWaterOutline :<IoWaterOutline />,
        GiHanger :<GiHanger/>,
        MdOutlineIron :<MdOutlineIron />,
        MdMeetingRoom :<MdMeetingRoom />,
        FaTv :<FaTv />,
        LuMicrowave:<LuMicrowave/>,
        BiSolidWasher:<BiSolidWasher/>
      };

    const amenities=[
        { name: "wifi", icon: "FaWifi", available: true },
        { name: "pool", icon: "FaSwimmer ", available: false },
        {  name: "parking", icon: "TbParkingCircle", available: true },
        {  name: "airConditioning", icon: "TbAirConditioningDisabled", available: false },
        {  name: "gym", icon: "FaDumbbell", available: true },
        {  name: "kitchen", icon: "FaKitchenSet", available: true },
        {  name: "City skyline view", icon: "FaCity", available: true },
        {  name: "Hair dryer", icon: "PiHairDryer", available: true },
        {  name: "Hot water", icon: "IoWaterOutline", available: true },
        {  name: "Hangers", icon: "GiHanger", available: true },
        {  name: "Iron", icon: "MdOutlineIron", available: true },
        {  name: "Clothing storage", icon: "MdMeetingRoom", available: true },
        {  name: "TV", icon: "FaTv", available: true },
        {  name: "Refrigerator", icon: "MdKitchen", available: true },
        {  name: "Microwave", icon: "LuMicrowave", available: true },
        {  name: "Dishwasher", icon: "BiSolidWasher", available: true },

    ]

  return (
    <>
     <div>
      <h3 className='font-bold text-2xl'>What this place offers</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {amenities
          .filter(amenity => amenity.available)
          .slice(0,4)
          .map(amenity => (
            <li key={amenity.id} className='flex items-center text-xl'>
                {iconMap[amenity.icon]} 
                <span className='ms-3'>{amenity.name}</span>
            </li>
        ))}
      </ul>
    </div>
      <Dialog>
        <DialogTrigger>
        <Button variant='outline'>show all {amenities.length} amenities</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] max-h-[500px] overflow-y-auto ">
          <DialogHeader className="flex justify-center items-center ">
            <DialogTitle>
              <div>All Amenities</div>
            </DialogTitle>
            <DialogDescription className="text-center">
            
            </DialogDescription>
          </DialogHeader>

          <ul style={{ listStyleType: "none", padding: 0 }}>
        {amenities
          .filter(amenity => amenity.available)
          .map(amenity => (
            <li key={amenity.id} className='flex items-center text-xl'>
              {iconMap[amenity.icon]} 
              <span className='ms-3'>{amenity.name}</span> 
            </li>
          ))}
      </ul>
                
        </DialogContent>
      </Dialog>
    </>
  )
}