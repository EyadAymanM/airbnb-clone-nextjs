import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import IconButton from "../IconButton";
import { AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import Image from "next/image";
import CreateWishlistModal from "./CreateWishlistModal";
import { addToWishlist, fetchWishlists } from "@/app/_actions/wishlist/wishlist";
import { toast, Toaster } from 'react-hot-toast'; 

const AddWishlistModal = ({ listingId }) => {
  const [showModal, setShowModal] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await fetchWishlists();
        setWishlistItems(res);
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
      toast.success('The listing has been added to your wishlist!');
    } catch (error) {
      toast.error('Failed to add to wishlist. Please try again.');
    }
  };

  return (
    <div>
      <Dialog open={showModal} onOpenChange={toggleModal}>
          <DialogTrigger asChild>
            <IconButton
              ariaLabel="Add to Wishlist"
              icon={AiOutlineHeart}
              onClick={toggleModal} 
              classNames="absolute top-4 right-4 flex items-center justify-center"
            />
          </DialogTrigger>
          <DialogContent className="bg-white border rounded-3xl max-w-2xl p-6 shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-xl text-center font-airbnb">
                Add to Wishlist
              </DialogTitle>
            </DialogHeader>
            <hr className="my-4 border-gray-300" />
            <div className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
              {wishlistItems && wishlistItems.map((item) => {
                
                return (
                  <WishlistItem
                    key={item._id} 
                    image={item.listing[0].photos[0]}
                    title={item.title}
                    savedCount={item.listing.length || 0}
                    id={item._id}
                    click={handleAddToWishlist}
                    loading={loading}
                  />
                );
              })}
            </div>
            <hr className="my-4 border-gray-300" />
            <CreateWishlistModal listingId={listingId} toggleIcon={true}/>
          </DialogContent>
        </Dialog>
        <Toaster position="bottom-left" reverseOrder={false} />
    </div>
  );
};

export default AddWishlistModal;

const WishlistItem = ({ image, title, savedCount, id, click }) => (
  <button
    className="flex flex-col items-center space-y-2 cursor-pointer"
    onClick={() => click(id)} 
  >
    <div className="relative w-72 h-64 rounded-3xl overflow-hidden"> 
      <Image
        src={image}
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