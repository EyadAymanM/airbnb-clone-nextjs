import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"


export default function HostInfo({img , name}) {

  return (
    <>
     <div className="flex items-center gap-3 ">
            <Avatar>
      <AvatarImage src={img}alt="@shadcn" />
      <AvatarFallback>cn</AvatarFallback>
    </Avatar>
     <h3 className='font-bold'>Hosted By {name}</h3>
     <br></br></div>
    
    </>
  )
}