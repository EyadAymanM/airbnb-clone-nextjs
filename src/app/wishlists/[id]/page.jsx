"use client";
import { getWishlistById } from "@/app/_actions/wishlist/wishlist";
import FavoriteListCard from "@/app/_components/FavoriteListCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";
import DateDropdown from "../../_components/DateDropdown/DateDropdown";
import GuestSelector from "../../_components/GuestSelector";
import Heading from "../../_components/Heading";
import IconButton from "../../_components/IconButton";
import Map from "../../_components/Map/Map";
import SettingsModal from "../../_components/Modal/SettingsModal";
import ShareModal from "../../_components/Modal/ShareModal";

const heartIconHtml = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="16px" height="16px">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
</svg>
`;

const Page = ({ params: { id } }) => {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const data = await getWishlistById(id);
        setWishlistItems(data);
      } catch (error) {
        toast.error("Unable to fetch your wishlist. Please try again later.");
      }
    };
    fetchWishlistItems();
  }, [id]);

  const locations = wishlistItems.map((item) => ({
    coordinates: [item.location.latitude, item.location.longitude],
    content: `$${item.price} ${heartIconHtml}`,
  }));

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
      <div className="lg:w-2/3 w-full mx-3">
        <div className="flex flex-col">
          <div className="flex justify-between items-center p-4">
            <IconButton
              ariaLabel="Go Back"
              icon={IoIosArrowBack}
              onClick={handleBackClick}
            />
            <SettingsModal />
          </div>

          <div className="ml-7 mb-4">
            <Heading title="Your Wishlist" />
          </div>

          {/* Button Group */}
          <div className="mx-7 mb-4 flex space-x-2">
            <DateDropdown />
            <GuestSelector />
            <ShareModal />
          </div>

          {/* Wishlist Items */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-7">
            {wishlistItems?.length > 0 ? (
              wishlistItems.map((item) => (
                <FavoriteListCard key={item.id} listing={item} />
              ))
            ) : (
              <p>No items in the wishlist.</p>
            )}
          </div>
        </div>
      </div>

      {/* Right Section: Map */}
      <div className="lg:w-1/3 w-full fixed right-0">
        <Map locations={locations}/>
      </div>
    </div>
  );
};

export default Page;