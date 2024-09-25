import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import Heading from "./Heading";

const WishlistCard = ({ imageSrc, imageAlt, title, savedCount, onRemove,id }) => {
  return (
    <div className="relative group"> 
      <button
        onClick={onRemove} 
        className="absolute top-5 left-5 bg-gray-100 rounded-full p-1 shadow-md z-10 group-hover:block hidden"
      >
        <IoClose className="w-6 h-6 text-gray-600" />
      </button>

      <Link href={`wishlists/${id}`} className="block"> 
        <div className="rounded-3xl shadow-lg p-2 bg-white border-solid border-white border-spacing-1 hover:shadow-xl transition-shadow duration-200 ease-in-out max-w-sm">
          <div className="relative w-full h-[250px] rounded-xl overflow-hidden">
            <Image
              className="rounded-xl"
              src={imageSrc}
              layout="fill"
              objectFit="cover"
              alt={imageAlt}
            />
          </div>
        </div>
        <div className="p-1"> 
            <Heading title={title} subtitle={`${savedCount} saved`} />
          </div>
      </Link>
    </div>
  );
};

export default WishlistCard;