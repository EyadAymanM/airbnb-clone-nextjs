"use client";
import img from "@/app/_assets/image.png";
import { useState } from "react";
import Container from "../_components/Container";
import Heading from "../_components/Heading";
import RecentlyViewed from "../_components/RecentlyViewed";
import WishlistCard from "../_components/WishlistCard";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
            { id: 1, imageSrc: img, title: "OMG! 2024", savedCount: 2 }, 
            { id: 2, imageSrc: img, title: "Another Item", savedCount: 5 },
            { id: 3, imageSrc: img, title: "Another Item", savedCount: 5 },
  ]);

  const handleRemoveItem = (itemId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <Container>
      <div className="mb-6">
        <Heading title="Wishlists" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <RecentlyViewed />

        {wishlistItems.map((item) => (
          <WishlistCard
            key={item.id}
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
            title={item.title}
            savedCount={item.savedCount}
            onRemove={() => handleRemoveItem(item.id)}
            id={item.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default Wishlist;
