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

const Wishlist = () => {
  const { data: session, status } = useSession()
  const [wishlistItems, setWishlistItems] = useState([]);
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
    }
  }, [status]);

  return (
    <>
      <NavBar className="hidden md:block" />
      <Container>
        <div className="mb-6">
          <Heading title={t('wishlists')} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <RecentlyViewed />
          {wishlistItems &&
            wishlistItems.reverse().map((item) => {
              return (
                <WishlistCard
                  key={item.id}
                  imageSrc={item.listing[0]?.photos[0] || grayHeartIcon}
                  imageAlt={item.title}
                  title={item.title}
                  savedCount={item.listing.length || 0}
                  id={item._id}
                />
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
