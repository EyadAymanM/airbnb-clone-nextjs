"use client"
import * as React from "react"
import star from '../_assets/svgs/star.svg'
import img from '../_assets/124599.jpg'
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

const ListingCard = ({ listing }) => {
  const [hover, setHover] = React.useState(false)
  const handleOver = () => {
    setHover(true)

  }
  const handleOut = () => {
    setHover(false)
  }
  
  return (
    <>
      <div className="max-w-xs mb-4">
        {/* <Link onClick={(e) => { router.push(`/rooms/${listing._id}`); stopPropagation(e); }} > */}
        <Link href={`/rooms/${listing._id}`} >
          <Carousel className="w-full max-w-xs" onMouseOver={handleOver} onMouseOut={handleOut}>
            <CarouselContent>
            {listing.photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-0 ">
                        <Image className="rounded-xl h-full" src={photo} width={303} height={200} alt="" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          <CarouselPrevious className={`bg-white top-1/2 left-3 ${hover ? '' : 'hidden'}` } />
          <CarouselNext className={`bg-white top-1/2 right-3 ${hover ? '' : 'hidden'}`} />
          </Carousel>
          <div className="px-2">
            <div className="flex pt-1">
            <span className="font-semibold text-lg  grow">{listing.title}</span>
              <span className="font-semibold flex items-baseline gap-1"><Image src={star} alt="" height={15} width={15} />4.9</span>
            </div>
            <div className="text-[#777] leading-4">
              Stay in {listing.city}
            </div>
            <div className="text-[#777] leading-6">
              Oct 10 - 15
            </div>
          </div>
        </Link>
        <div className="font-semibold ml-2">{listing.price * 10}ج.م <span className="font-light">night</span></div>
      </div>
    </>
  )
}
export default ListingCard