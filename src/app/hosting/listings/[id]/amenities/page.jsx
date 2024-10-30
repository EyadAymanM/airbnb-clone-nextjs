"use client";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { fetchData } from "@/app/_actions/Listing/fetchData";
import AmenitiesModal from "@/app/_components/Modal/AmenitiesModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AmenityIcon = ({ svgString }) => {
  return (
    <>
      {parse(svgString.replace(/className="([^"]*)"/, `className="w-6 h-6"`))}
    </>
  );
};

function Page({ params: { id } }) {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchData(`listing/${id}`);
        setAmenities(data.amenities);
      } catch (error) {
        toast.error("Error fetching initial data: " + error.message);
      } finally {
        setLoading(false);
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
          <AmenitiesModal listingId={id} selectedAmenities={amenities.map(({ _id }) => _id)} />
        </div>
        {loading ? (
          <Skeleton count={1} height={20} className="mb-4" /> 
        ) : amenities.length > 0 ? (
          <p className="text-xl text-gray-600 mb-4">
            You&apos;ve added these to your listing so far.
          </p>
        ) : (
          <p className="text-xl text-gray-600 mb-4">
            You haven&apos;t added any amenities yet.
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
          <ul>
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => ( 
                <li key={index} className="flex items-center p-4 gap-4">
                  <Skeleton circle height={40} width={40} className="mr-2" />
                  <Skeleton height={20} width="60%" />
                </li>
              ))
            ) : (
              amenities.map(({ name, icon, _id }) => (
                <li key={_id} className={`flex items-center p-4 transition-all gap-4`}>
                  <AmenityIcon svgString={icon} className="mr-2" />
                  <span className="text-base font-semibold font-airbnb text-[#6A6A6A]">
                    {name}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Page;