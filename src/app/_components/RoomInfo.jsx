import React from 'react'



export default function RoomInfo({ title , address, guestCount, bedroomCount, bedCount, bathroomCount }) {
  return (
    <>
    <div>
     <h1 className="sm:text-xl md:text-2xl lg:text-4xl  font-bold ">{title} in {address}</h1>
    <p className="text-l font-semibold" >{guestCount} guest. {bedroomCount} bedroom. {bedCount} bed. {bathroomCount} bathroom</p>
    </div>
    </>
  )
}