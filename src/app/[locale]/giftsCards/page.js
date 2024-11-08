import React from 'react'
import logo from "../../_assets/svgs/airbnb-logo-only.svg"
import imageCard from "../../_assets/rotate.jpg"
import Image from "next/image"




export default function page() {
  return (
    <>

            <div className='flex items-center flex-col p-10 ' >
                <Image className="w-7 h-full block mb-5 " src={logo} height={100} width={100} alt="airbnb" />
                <h1 className='text-7xl font-bold'>Airbnb</h1>
                <h1 className='text-7xl font-bold'>gift cards</h1>
                <p className='text-3xl mt-10'>Looks like gift cards are not available in your region yet, but we are working on it!</p>

                <div class="flex w-96 mt-20 ">
                        <Image  className='-rotate-45 absolute mt-24'  src={imageCard} alt="" />
                        <Image  className='rotate-12 absolute -ml-72 '  src={imageCard} alt="" />
                </div>
            </div>


    
    </>
  )
}
