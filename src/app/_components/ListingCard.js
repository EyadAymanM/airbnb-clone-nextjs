"use client"
import * as React from "react"
import star from '../assets/svgs/star.svg'
import img from '../assets/124599.jpg'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"

const ListingCard = () => {
  const [hover, setHover] = React.useState(false)
  const handleOver = () => {
    setHover(true)

  }
  const handleOut = () => {
    setHover(false)
  }
  return (
    <>
      <div>
        {/* <div onClick={(e) => { router.push("/"); stopPropagation(e); }} > */}
          <Carousel className="w-full max-w-xs" onMouseOver={handleOver} onMouseOut={handleOut}>
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-0 ">
                        <Image className="rounded-xl" src={img} width={"100%"} height={"100%"} alt="" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={`top-1/2 left-3 ${hover ? 'fill-white' : 'hidden'}`} />
            <CarouselNext className={`top-1/2 right-3 ${hover ? 'fill-white' : 'hidden'}`} />
          </Carousel>
          <div className="px-2">
            <div className="flex pt-1">
              <span className="font-semibold text-lg  grow">Listing Name</span>
              <span className="font-semibold flex items-baseline gap-1"><Image src={star} alt="" height={15} width={15} />4.9</span>
            </div>
            <div className="text-[#777] leading-4">
              Stay with Eyad
            </div>
            <div className="text-[#777] leading-6">
              Oct 10 - 15
            </div>
          </div>
        {/* </div> */}
        <div className="font-semibold ml-2">4,254ج.م <span className="font-light">night</span></div>
      </div>
    </>
  )
}
export default ListingCard