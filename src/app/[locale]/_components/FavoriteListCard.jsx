"use client";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import Image from "next/image";
import {Link} from "@/i18n/routing";
import AddWishlistModal from "./Modal/AddWishlistModal";
import { useState } from "react";

const FavoriteListCard = ({ listing }) => {
  const [hover, setHover] = useState(false);
  const handleOver = () => {
    setHover(true);
  };
  const handleOut = () => {
    setHover(false);
  };
  return (
    <>
      <div className="max-w-xs mb-4 relative">
        <Carousel
          className="w-full max-w-xs"
          onMouseOver={handleOver}
          onMouseOut={handleOut}
        >
          <Link href={`/rooms/${listing._id}`}>
            <CarouselContent>
              {listing.photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-0 ">
                        <Image
                          className="rounded-xl h-full"
                          src={photo}
                          width={303}
                          height={200}
                          alt={listing.title}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Link>
          <CarouselPrevious
            className={`bg-white hover:bg-white top-1/2 left-3 ${hover ? "" : "hidden"}`}
          />
          <CarouselNext
            className={`bg-white hover:bg-white top-1/2 right-3 ${hover ? "" : "hidden"}`}
          />
        </Carousel>
        {/* <AddWishlistModal listingId={listing._id} /> */}
        <Link href={`/rooms/${listing._id}`}>
          <div className="px-2">
            <div className="flex pt-1">
              <span className="font-semibold text-lg grow">
                {listing.title}
              </span>
            </div>
            <div className="text-[#777] leading-4">
              {listing.address?.city ? `${listing.address.city}, ` : ""}
              {listing.address?.country || "Location Not Available"}
            </div>
            <div className="text-[#777] leading-4 mt-1">
              {listing.beds} Beds
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default FavoriteListCard;