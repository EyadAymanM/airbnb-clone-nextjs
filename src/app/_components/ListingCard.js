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
import { Link } from "@/i18n/routing";
import AddWishlistModal from "./Modal/AddWishlistModal";
import { useEffect, useState } from "react";
import { fetchWishlists } from "../_actions/wishlist/wishlist";
import CreateWishlistModal from "./Modal/CreateWishlistModal";
import { useLocale, useTranslations } from "next-intl";
import { format, differenceInDays } from "date-fns";

import LoginModal from "./Modal/User/LoginModal";
import { useSession } from "next-auth/react";

const ListingCard = ({ listing }) => {
  const t = useTranslations("ListingCard");
  const locale = useLocale();
  const [hover, setHover] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const { data: session, status } = useSession();
  const isAuth = !!session;

  const handleOver = () => {
    setHover(true);
  };
  const handleOut = () => {
    setHover(false);
  };
  useEffect(() => {
    if (status === "authenticated") {
      const getWishlist = async () => {
        try {
          const items = await fetchWishlists(session?.user.token.access_token);
          setWishlistItems(items);
        } catch (err) {
          console.error("Error fetching wishlists:", err);
        }
      };
      getWishlist();
    }
  }, [status]);

  return (
    <>
      <div className="max-w-xs mb-4 relative">
        <Carousel
          className="w-full max-w-xs"
          onMouseOver={handleOver}
          onMouseOut={handleOut}
        >
          <Link href={`/rooms/${listing._id}`}>
            <CarouselContent dir={locale == "ar" ? "ltr" : ""}>
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
                          alt=""
                        />
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

        {!isAuth ? (
          <LoginModal listingId={listing._id} />
        ) :wishlistItems && wishlistItems?.length > 0 ? (
          <AddWishlistModal listingId={listing._id} />
        ) : (
          <CreateWishlistModal listingId={listing._id} />
        )}
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
            <div className="text-[#777] leading-4">
              {t("stay")} {listing.address.city}
            </div>
            <div className="text-[#777] leading-6">
              {new Date(listing.startDate).toLocaleDateString(locale, {
                day: "2-digit",
                month: "short",
              })}{" "}
              -{" "}
              {new Date(listing.endDate).toLocaleDateString(locale, {
                day: "2-digit",
                month: "short",
              })}
            </div>
          </div>
        </Link>
        <div className="font-semibold ms-2">
          {listing.price}$ <span className="font-light"> {t("night")}</span>
        </div>
      </div>
    </>
  );
};
export default ListingCard;
