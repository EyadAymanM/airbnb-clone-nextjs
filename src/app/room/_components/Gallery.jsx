import Image from "next/image"
import t from "@/app/_assets/camera.jpg"
function Gallery({photos}) {
  return (
    <div className="flex gap-2 rounded-xl">
      <div className="w-1/2">
        <Image src={t||photos[0]} width="" height="" alt="" className="object-contain rounded-s-2xl" />
      </div>
      <div className="w-1/4 flex flex-col gap-2">
        <Image src={t||photos[1]} width="" height="" alt="" className="object-contain" />
        <Image src={t||photos[2]} width="" height="" alt="" className="object-contain" />
      </div>
      <div className="w-1/4 flex flex-col gap-2">
        <Image src={t||photos[3]} width="" height="" alt="" className="object-contain rounded-tr-2xl" />
        <Image src={t||photos[4]} width="" height="" alt="" className="object-contain rounded-br-2xl" />
      </div>
    </div>
  )
}
export default Gallery