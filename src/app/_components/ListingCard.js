"use client";
import star from "../_assets/svgs/star.svg";
import { Card, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import Image from "next/image";
import {Link} from "@/i18n/routing";
import AddWishlistModal from "./Modal/AddWishlistModal";
import { useEffect, useState } from "react";
import { fetchWishlists } from "../_actions/wishlist/wishlist";
import CreateWishlistModal from "./Modal/CreateWishlistModal";
import { useLocale, useTranslations } from "next-intl";

const ListingCard = ({ listing }) => {
  const t = useTranslations('ListingCard');
  const locale = useLocale();
  const [hover, setHover] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const handleOver = () => {
    setHover(true);
  };
  const handleOut = () => {
    setHover(false);
  };
  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetchWishlists();
      setWishlistItems(res);
    };
    fetchItems();
  }, []);

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
                      <CardContent dir={locale == "ar" ? "ltr" : ""} className="flex aspect-square items-center justify-center p-0 ">
                        <Image className="rounded-xl h-full" src={photo} width={303} height={200} alt="" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Link>
          <CarouselPrevious
            className={`bg-white top-1/2 left-3 ${hover ? "" : "hidden"}`}
          />
          <CarouselNext
            className={`bg-white top-1/2 right-3 ${hover ? "" : "hidden"}`}
          />
        </Carousel>

        {
          wishlistItems && wishlistItems.length > 0 ? (
            <AddWishlistModal listingId={listing._id} />
          ) : (
            <CreateWishlistModal listingId={listing._id} />
          )
        }
        <Link href={`/rooms/${listing._id}`}>
          <div className="px-2">
            <div className="flex pt-1">
              <span className="font-semibold text-lg  grow">
                {listing.title}
              </span>
              <span className="font-semibold flex items-baseline gap-1">
                <Image src={star} alt="" height={15} width={15} />
                4.9
              </span>
            </div>
            <div className="text-[#777] leading-4">{t("stay")} {listing.address.city}</div>
            <div className="text-[#777] leading-6">Oct 10 - 15</div>
          </div>
        </Link>
        <div className="font-semibold ms-2">
          {listing.price * 10}ج.م <span className="font-light">{t("night")}</span>
        </div>
      </div>
    </>
  );
};
export default ListingCard;
