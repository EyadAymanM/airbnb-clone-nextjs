"use client";

import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { fetchData } from "@/app/[locale]/_actions/Listing/fetchData";
import AmenitiesModal from "@/app/[locale]/_components/Modal/AmenitiesModal";

const AmenityIcon = ({ svgString }) => {
  return (
    <>
      {parse(svgString.replace(/className="([^"]*)"/, `className="w-6 h-6"`))}
    </>
  );
};

function Page({ params: { id } }) {
  const [amenities, setAmenities] = useState([]);

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
    <>
      <div className="w-[630px] flex flex-col mx-auto grow">
        <div className="flex justify-between items-center">
        <h1 className="max-w-2xl my-2 text-3xl font-semibold font-airbnb">
          Amenities
        </h1>
        <AmenitiesModal listingId={id} selectedAmenities={amenities.map(({_id}) => _id)}/>
        </div>
        {amenities.length > 0 ? (<p className="text-xl text-gray-600 mb-4">
          You’ve added these to your listing so far.
        </p>):(
          <p className="text-xl text-gray-600 mb-4">
            You haven't added any amenities yet.
        </p>)
        }
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
            <ul className="">
              {amenities.map(({ name, icon, _id }) => (
                <li
                  key={_id}
                  className={`flex items-center p-4  transition-all gap-4`}
                >
                  <AmenityIcon svgString={icon} className="mr-2" />
                  <span className="text-base font-semibold font-airbnb text-[#6A6A6A]">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </>
  );
}

export default Page;
