import { addToWishlist, fetchWishlists, getAllFavoriteListingIds, removeFromWishlist } from "@/app/[locale]/_actions/wishlist/wishlist";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import grayHeartIcon from '../../_assets/gray-heart-icon.jpg';
import IconButton from "../IconButton";
import CreateWishlistModal from "./CreateWishlistModal";


const AddWishlistModal = ({ listingId }) => {
  const [showModal, setShowModal] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await fetchWishlists();
        const favorite = await getAllFavoriteListingIds();
        setWishlistItems(res);
        setFavoriteIds(favorite);
      } catch (error) {
        toast.error('Unable to fetch your wishlists. Please try again later.');
      }
    };
    fetchItems();
  }, []);

  const handleAddToWishlist = async (wishlistId) => {
    setLoading(true);
    try {
      await addToWishlist(wishlistId, listingId);
      toggleModal()
      setFavoriteIds((prev) => [...prev, listingId]);
      toast.success('The listing has been added to your wishlist!');
    } catch (error) {
      toast.error('Failed to add to wishlist. Please try again.');
    }
  };

  const handleRemoveFromWishlist = async () => {
    setLoading(true);
    try {
      await removeFromWishlist(listingId);
      setFavoriteIds((prev) => prev.filter((id) => id !== listingId));
      toast.success('The listing has been removed from your wishlist.');
    } catch (error) {
      toast.error('Failed to remove from wishlist. Please try again.');
    }
  };

  const isFavorite = favoriteIds.includes(listingId);

  const handleIconClick = () => {
    if (isFavorite) {
      handleRemoveFromWishlist();
    } else {
      toggleModal();
    }
  };

  return (
    <div>
      <Dialog open={isFavorite? null :showModal} onOpenChange={isFavorite?null :toggleModal}>
        <DialogTrigger asChild>
          <IconButton
            ariaLabel="Add to Wishlist"
            icon={isFavorite? AiFillHeart :AiOutlineHeart}
            onClick={handleIconClick}
            classNames={`absolute top-4 right-4 flex items-center justify-center ${isFavorite ? 'text-red-500' :'text-white'}`}
          />
        </DialogTrigger>
        <DialogContent className="bg-white border rounded-3xl max-w-xl p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl text-center font-airbnb">
              Add to Wishlist
            </DialogTitle>
          </DialogHeader>
          <hr className="my-4 border-gray-300" />
          <div className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
            {wishlistItems.length > 0 ? (
              wishlistItems.map((item) => (
                <WishlistItem
                  key={item._id}
                  image={item.listing[0]?.photos[0]}
                  title={item.title}
                  savedCount={item.listing.length || 0}
                  id={item._id}
                  click={handleAddToWishlist}
                  loading={loading}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No wishlists available.</p>
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
        className='object-cover rounded-3xl shadow-lg p-2 bg-white border-solid border-white border-spacing-1 hover:shadow-xl transition-shadow duration-200 ease-in-out mb-3'
      />
    </div>
    <div className="text-center">
      <h3 className="font-semibold text-lg font-airbnb">{title}</h3>
      <p className="text-gray-500">{savedCount} saved</p>
    </div>
  </button>
);