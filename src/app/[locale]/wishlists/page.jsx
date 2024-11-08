"use client";
import { useEffect, useState } from "react";
import grayHeartIcon from "@/app/_assets/gray-heart-icon.jpg";
import { fetchWishlists } from "@/app/_actions/wishlist/wishlist";
import Container from "@/app/_components/Container";
import Heading from "@/app/_components/Heading";
import RecentlyViewed from "@/app/_components/RecentlyViewed";
import WishlistCard from "@/app/_components/WishlistCard";
import NavBar from "@/app/_components/Navbar/NavBar";
import { useTranslations } from 'next-intl';
import { useSession } from "next-auth/react";
import UnauthenticatedComponent from "@/app/_components/UnauthenticatedComponent.jsx/UnauthenticatedComponent";

const Wishlist = () => {
  const { data: session, status } = useSession()
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const t = useTranslations('Wishlist');


  useEffect(() => {
    if (status == "authenticated"){

      const getWishlist = async () => {
        try {
          const items = await fetchWishlists(session.user.token.access_token);
          setWishlistItems(items);
        } catch (err) {
          console.error("Error fetching wishlists:", err);
        }
      }
      getWishlist()
      setIsLoading(false)
    }
  }, [status]);

  if (status == "unauthenticated")
    return <UnauthenticatedComponent />

  return (
    <>
      <NavBar className="hidden md:block" />
      <Container>
        <div className="mb-6">
          <Heading title={t('wishlists')} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 duration-150">
          <RecentlyViewed />
          {isLoading
            ? Array.from({ length: 2 }).map((_, index) => <SkeletonWishlistCard key={index} />)
            : wishlistItems?.reverse().map((item) => (
                <WishlistCard
                  key={item.id}
                  imageSrc={item.listing[0]?.photos[0] || grayHeartIcon}
                  imageAlt={item.title}
                  title={item.title}
                  savedCount={item.listing.length || 0}
                  id={item._id}
                />
              ))}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;


const SkeletonWishlistCard = () => (
  <div className="relative group animate-pulse">
    <div className="block">
      <div className="rounded-3xl shadow-lg p-1 bg-gray-200 border-solid border-gray-300 border-spacing-1 max-w-sm">
        <div className="relative w-full h-0 pb-[100%] rounded-xl overflow-hidden bg-gray-300"></div>
      </div>
      <div className="p-1">
        <Heading
          title={<div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>}
          subtitle={<div className="h-4 bg-gray-300 rounded w-1/2"></div>}
        />
      </div>
    </div>
  </div>
);
