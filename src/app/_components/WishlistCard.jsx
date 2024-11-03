import Image from "next/image";
import { Link } from "@/i18n/routing";
import Heading from "./Heading";
import RemoveWishlistModal from "./Modal/removeWishlistModal";
import { useTranslations } from 'next-intl';

const WishlistCard = ({ imageSrc, imageAlt, title, savedCount, id }) => {
  const t = useTranslations('Wishlist');
  return (
    <div className="relative group"> 
      <RemoveWishlistModal id={id} title={title} />
      <Link href={`wishlists/${id}`} className="block"> 
        <div className="rounded-3xl shadow-lg p-2 bg-white border-solid border-white border-spacing-1 hover:shadow-xl transition-shadow duration-200 ease-in-out max-w-sm">
          <div className="relative w-full h-0 pb-[100%] rounded-xl overflow-hidden">
            <Image
              className="rounded-xl object-cover"
              src={imageSrc}
              fill
              alt={imageAlt}
            />
          </div>
        </div>
        <div className="p-1"> 
            <Heading title={title} subtitle={`${t('saved')} ${savedCount} ${t('item')}`} />
          </div>
      </Link>
    </div>
  );
};

export default WishlistCard;