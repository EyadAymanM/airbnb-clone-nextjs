import {
  addToWishlist,
  fetchWishlists,
  getAllFavoriteListingIds,
  removeFromWishlist,
} from "@/app/_actions/wishlist/wishlist";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import grayHeartIcon from "../../_assets/gray-heart-icon.jpg";
import IconButton from "../IconButton";
import CreateWishlistModal from "./CreateWishlistModal";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

const AddWishlistModal = ({ listingId }) => {
  const [showModal, setShowModal] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("model");
  const toggleModal = () => setShowModal(!showModal);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const fetchItems = async () => {
        try {
          const favorite = await getAllFavoriteListingIds(session.user.token.access_token);
          setFavoriteIds(favorite);
          const res = await fetchWishlists(session.user.token.access_token);
          setWishlistItems(res);
        } catch (error) {
          toast.error(t('fetch-error'));
        }
        setIsLoading(false);
      };
      fetchItems();
    }
  }, [t, status, session.user.token.access_token]);

  const handleAddToWishlist = async (wishlistId) => {
    try {
      toggleModal();
      setFavoriteIds((prev) => [...prev, listingId]);
      await addToWishlist(
        wishlistId,
        listingId,
        session?.user.token.access_token
      );
      toast.success(t("listing-added"));
    } catch (error) {
      toast.error(t("add-failure"));
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      setFavoriteIds((prev) => prev.filter((id) => id !== listingId));
      await removeFromWishlist(listingId, session.user.token.access_token);
      toast.success(t("listing-removed"));
    } catch (error) {
      toast.error(t("remove-failure"));
    }
  };

  const isFavorite = favoriteIds?.includes(listingId);

  const handleIconClick = () => {
    if (isFavorite) {
      handleRemoveFromWishlist();
    } else {
      toggleModal();
    }
  };

  return (
    <div>
      <Dialog
        open={isFavorite ? null : showModal}
        onOpenChange={isFavorite ? null : toggleModal}
      >
        <DialogTrigger asChild>
          <IconButton
            ariaLabel={t("add-to-wishlist")}
            icon={AiFillHeart}
            onClick={handleIconClick}
            classNames={`absolute top-2 text-gray-300 right-3 flex items-center justify-center hover:scale-125 ${
              isFavorite ? "text-red-500" : ""
            }`}
          />
        </DialogTrigger>
        <DialogContent className="bg-white border rounded-3xl max-w-xl p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl text-center font-airbnb">
              {t("add-to-wishlist")}
            </DialogTitle>
          </DialogHeader>
          <hr className="my-4 border-gray-300" />
          <div className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <SkeletonLoader key={index} />
              ))
            ) : wishlistItems?.length > 0 ? (
              wishlistItems.map((item) => (
                <WishlistItem
                  key={item._id}
                  image={item.listing[0]?.photos[0]}
                  title={item.title}
                  savedCount={item.listing.length || 0}
                  id={item._id}
                  click={handleAddToWishlist}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                {t("no-wishlists-available")}
              </p>
            )}
          </div>
          <hr className="my-4 border-gray-300" />
          <CreateWishlistModal listingId={listingId} toggleIcon={true} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddWishlistModal;

const WishlistItem = ({ image, title, savedCount, id, click }) => (
  <button
    className="flex flex-col items-center space-y-2 cursor-pointer overflow-hidden"
    onClick={() => click(id)}
  >
    <div className="relative w-64 h-64 rounded-3xl">
      <Image
        src={image || grayHeartIcon}
        alt={title}
        fill
        className="object-cover rounded-3xl shadow-lg p-2 bg-white border-solid border-white hover:shadow-xl transition-shadow duration-200 ease-in-out mb-3"
      />
    </div>
    <div className="text-center">
      <h3 className="font-semibold text-lg font-airbnb">{title}</h3>
      <p className="text-gray-500">{savedCount} saved</p>
    </div>
  </button>
);

const SkeletonLoader = () => (
  <div className="flex flex-col items-center space-y-2 animate-pulse">
    <div className="relative w-64 h-64 rounded-3xl bg-gray-200"></div>
    <div className="text-center">
      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </div>
  </div>
);
