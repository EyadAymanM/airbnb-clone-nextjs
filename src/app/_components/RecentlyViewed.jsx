import Image from "next/image";
import Link from "next/link";
import img from "../_assets/image.png";
import Heading from "./Heading";

const RecentlyViewed = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-1 rounded-3xl shadow-lg p-2 bg-white border-solid border-white border-spacing-1 hover:shadow-xl transition-shadow duration-200 ease-in-out max-w-sm">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-0 pb-[100%]"
          >
            <Link href={image.link || "#"} aria-label={`Link to ${image.alt}`}>
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className={image.rounded}
              />
            </Link>
          </div>
        ))}
        <div className="flex items-center justify-center bg-gray-200 rounded-br-3xl">
        </div>
      </div>
      <Heading title="Recently viewed" subtitle="Yesterday" />
    </div>
  );
};

export default RecentlyViewed;

let images = [
  {
    src: img,
    alt: "Image 1",
    rounded: 'rounded-tl-3xl',
    link: '/image1'
  },
  {
    src: img,
    alt: "Image 2",
    rounded: 'rounded-tr-3xl',
    link: '/image2'
  },
  {
    src: img,
    alt: "Image 3",
    rounded: 'rounded-bl-3xl',
    link: '/image3'
  },
];