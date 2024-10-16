import Image from "next/image"
import t1 from "@/app/_assets/camera.jpg"
import t from "@/app/_assets/iti.jpeg"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
function Gallery({ photos }) {
  return (
    <>
      {/* desktop */}
      <div className="md:flex h-96 rounded-2xl hidden gap-2  shadow-md" id="photos">
        <div className="w-1/2 h-full">
          <Image src={t || photos[0]} width="" height="" alt="" className="object-cover w-full h-full border-1 rounded-s-2xl hover:brightness-90" />
        </div>
        <div className="w-1/4 h-full flex flex-col gap-2">
          <Image src={t || photos[1]} width="" height="" alt="" className="object-cover w-full h-full border-1 hover:brightness-90" />
          <Image src={t || photos[2]} width="" height="" alt="" className="object-cover w-full h-full border-1 hover:brightness-90" />
        </div>
        <div className="w-1/4 h-full flex flex-col gap-2">
          <Image src={t || photos[3]} width="" height="" alt="" className="object-cover w-full h-full border-1 rounded-tr-2xl hover:brightness-90" />
          <Image src={t || photos[4]} width="" height="" alt="" className="object-cover w-full h-full border-1 rounded-br-2xl hover:brightness-90" />
        </div>
      </div>

      {/* mobile */}
      <Carousel className="md:hidden w-full">
        <CarouselContent>
          {/* {photos.map((photo, index) => ( */}
          {Array.from({length:5}).map((photo, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex  items-center justify-center p-1">
                    <Image src={t || photo} width="" height="" alt="" className="object-cover w-full h-full rounded-xl" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

    </>

  )
}
export default Gallery