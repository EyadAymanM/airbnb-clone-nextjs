"use client";
// import { getWishlistById } from "@/app/_actions/wishlist/wishlist";
// import FavoriteListCard from "@/app/_components/FavoriteListCard";
// import { useRouter } from "@/i18n/routing";
// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { IoIosArrowBack } from "react-icons/io";
// import DateDropdown from "../../../_components/DateDropdown/DateDropdown";
// import GuestSelector from "../../../_components/GuestSelector";
// import Heading from "../../../_components/Heading";
// import IconButton from "../../../_components/IconButton";
// import Map from "../../../_components/Map/Map";
// import SettingsModal from "../../../_components/Modal/SettingsModal";
// import ShareModal from "../../../_components/Modal/ShareModal";
// import NavBar from "@/app/_components/Navbar/NavBar";
// import { useLocale, useTranslations } from 'next-intl';
// const heartIconHtml = `
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="16px" height="16px">
//   <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
// </svg>
// `;

// const Page = ({ params: { id } }) => {
//   const t = useTranslations('Wishlist');
//   const router = useRouter();
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const locale = useLocale();
//   useEffect(() => {
//     const fetchWishlistItems = async () => {
//       try {
//         const data = await getWishlistById(id);
//         setWishlistItems(data);
//       } catch (error) {
//         setError(t('failed-to-fetch-wishlist'));
//         toast.error(t('failed-to-fetch-wishlist'));
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWishlistItems();
//   }, [id, t]);

//   const locations = wishlistItems.map((item) => ({
//     coordinates: [item.location.latitude, item.location.longitude],
//     content: `$${item.price} ${heartIconHtml}`,
//   }));

//   const handleBackClick = () => {
//     router.push(`/wishlists`);
//   };

//   return (
//     <>
//       <NavBar className="hidden md:block" />
//       <div className={`flex flex-col lg:flex-row ${locale === 'ar' ? 'pr-4' : 'pl-4'}`}>
//         <div className="lg:w-2/3 w-full sm:w-full " >
//           <div className="flex flex-col">
//             <div className="flex justify-between items-center pr-4">
//               <IconButton
//                 ariaLabel="Go Back"
//                 icon={IoIosArrowBack}
//                 onClick={handleBackClick}
//                 classNames={`${locale === 'ar' ? 'rotate-180' : ''} hover:bg-gray-100 rounded-full transition duration-200 ease-in-out`}
//               />
//               <SettingsModal />
//             </div>

//             <div className="mx-7 mb-4 sm:mx-2">
//               <Heading title={t('your-wishlist')} />
//             </div>

//             {/* Button Group */}
//             <div className=" mb-4 flex justify-around md:justify-start gap-2 ">
//               <DateDropdown />
//               <GuestSelector wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} />
//               <ShareModal />
//             </div>

//             {/* Wishlist Items */}
//             <div className="grid grid-cols-1 mx-auto sm:pl-0 md:grid-cols-2 lg:grid-cols-3 gap-5">
//               {loading ? (
//                 <p>{t('loading')}</p>
//               ) : error ? (
//                 <p className="text-red-500">{error}</p>
//               ) : wishlistItems.length > 0 ? (
//                 wishlistItems.map((item) => (
//                   <FavoriteListCard key={item.id} listing={item} />
//                 ))
//               ) : (
//                 <p>{t('no-items-in-the-wishlist')}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Section: Map */}
//         <div className="hidden lg:block lg:w-1/3 w-full">
//           <Map locations={locations} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Page;
import { getWishlistById } from "@/app/_actions/wishlist/wishlist";
import FavoriteListCard from "@/app/_components/FavoriteListCard";
import { useRouter } from "@/i18n/routing";
import { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";
import DateDropdown from "../../../_components/DateDropdown/DateDropdown";
import GuestSelector from "../../../_components/GuestSelector";
import Heading from "../../../_components/Heading";
import IconButton from "../../../_components/IconButton";
import Map from "../../../_components/Map/Map";
import SettingsModal from "../../../_components/Modal/SettingsModal";
import ShareModal from "../../../_components/Modal/ShareModal";
import NavBar from "@/app/_components/Navbar/NavBar";
import { useLocale, useTranslations } from "next-intl";

const heartIconHtml = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="16px" height="16px">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
</svg>
`;

const Page = ({ params: { id } }) => {
  const t = useTranslations("Wishlist");
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [filteredWishlistItems, setFilteredWishlistItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const locale = useLocale();

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const data = await getWishlistById(id);
        setWishlistItems(data);
        setFilteredWishlistItems(data);
      } catch (error) {
        setError(t("failed-to-fetch-wishlist"));
        toast.error(t("failed-to-fetch-wishlist"));
      } finally {
        setLoading(false);
      }
    };
    fetchWishlistItems();
  }, [id, t]);

  const locations = useMemo(
    () =>
      wishlistItems.map((item) => ({
        coordinates: [item.location.latitude, item.location.longitude],
        content: `$${item.price} ${heartIconHtml}`,
      })),
    [wishlistItems]
  );

  const handleBackClick = () => {
    router.push(`/wishlists`);
  };

  return (
    <>
      <NavBar className="hidden md:block" />
      <div
        className={`flex flex-col lg:flex-row ${
          locale === "ar" ? "pr-4" : "pl-4"
        }`}
      >
        <div className="lg:w-2/3 w-full sm:w-full">
          <div className="flex flex-col">
            <div className="flex justify-between items-center pr-4">
              <IconButton
                ariaLabel="Go Back"
                icon={IoIosArrowBack}
                onClick={handleBackClick}
                classNames={`${
                  locale === "ar" ? "rotate-180" : ""
                } hover:bg-gray-100 rounded-full transition duration-200 ease-in-out`}
              />
              <SettingsModal />
            </div>

            <div className="mx-7 mb-4 sm:mx-2">
              <Heading title={t("your-wishlist")} />
            </div>

            {/* Button Group */}
            <div className="mb-4 flex justify-around md:justify-start gap-2 ">
              <DateDropdown />
              <GuestSelector
                wishlistItems={wishlistItems}
                setWishlistItems={setFilteredWishlistItems}
              />
              <ShareModal />
            </div>

            {/* Wishlist Items */}
            <div className="grid grid-cols-1 mx-auto sm:pl-0 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <span className="loader"></span>
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : filteredWishlistItems.length > 0 ? (
                filteredWishlistItems.map((item) => (
                  <FavoriteListCard key={item.id} listing={item} />
                ))
              ) : (
                <p>{t("no-items-in-the-wishlist")}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Map */}
        <div className="hidden lg:block lg:w-1/3 w-full">
          <Map locations={locations} />
        </div>
      </div>
    </>
  );
};

export default Page;
