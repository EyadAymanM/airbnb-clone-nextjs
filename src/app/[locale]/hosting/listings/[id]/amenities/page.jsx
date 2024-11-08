"use client";

import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { fetchData } from "@/app/_actions/Listing/fetchData";
import AmenitiesModal from "@/app/_components/Modal/AmenitiesModal";
import { useTranslations, useLocale } from "next-intl";
import toast from "react-hot-toast";

const AmenityIcon = ({ svgString, size = "w-6 h-6" }) => {
  return <>{parse(svgString.replace(/className="([^"]*)"/, `className="${size}"`))}</>;
};

function Page({ params: { id } }) {
  const [amenities, setAmenities] = useState([]);
  const t = useTranslations('Listings');
  const locale = useLocale();
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchData(`listing/${id}`);
        setAmenities(data.amenities);
      } catch (error) {
        toast.error("Error fetching initial data: " + error.message);
      }
    };
    fetchInitialData();
  }, [id]);

  return (
    <div className="max-w-lg w-full flex flex-col mx-auto grow p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold font-airbnb">{t("amenities")}</h1>
        <AmenitiesModal listingId={id} selectedAmenities={amenities.map(({ _id }) => _id)} />
      </div>
      <p className="text-xl text-gray-600 mb-4">
        {amenities.length > 0 ? t("you-ve-added-these-to-your-listing-so-far") : t("you-haven-t-added-any-amenities-yet")}
      </p>
      <div className="grid grid-cols-1  gap-4 max-w-2xl">
        {amenities.map(({ name, icon, _id }) => (
          <li key={_id} className="flex items-center p-4 transition-all gap-4">
            <AmenityIcon svgString={icon} size="w-8 h-8" />
            <span className="text-base font-semibold font-airbnb text-gray-700">{locale === "en"? name.en: name.ar}</span>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Page;
