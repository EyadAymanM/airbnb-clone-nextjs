import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"


export default function infoHost() {

  return (
    <>
     <div className="flex items-center gap-3 ">
            <Avatar>
      <AvatarImage src=""alt="@shadcn" />
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
     <h3 className='font-bold'>Hosted By Abeer</h3>
     <br></br></div>
    
    </>
  )
}