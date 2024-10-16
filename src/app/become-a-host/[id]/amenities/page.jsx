"use client";
import NextBackFooter from "@/app/_components/AddListingLayout/NextBackFooter";
import { Suspense, useEffect, useState } from "react";
import parse from "html-react-parser";
import { fetchData } from "@/app/_actions/Listing/fetchData";
import { updateListing } from "@/app/_actions/Listing/updateListing";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Page({ params: { id } }) {
  const router = useRouter();
  const [amenities, setAmenities] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleAmenity = (amenity) => {
    const index = selected.findIndex((item) => item == amenity);
    if (index == -1) setSelected([...selected, amenity]);
    else setSelected(selected.filter((item) => item != amenity));
    console.log(amenities);
    console.log(selected);
  };

  const updateAmenties = async () => {
    const listing = await updateListing(id, { amenities: selected });
    if (listing._id) {
      router.push(`/become-a-host/${id}/photos`);
    } else {
      toast("Something went wrong..");
    }
  };

  useEffect(() => {
    const getAmenities = async () => {
      const res = await fetchData("amenity");
      setAmenities(res);
    };
    getAmenities();
  }, []);

  function AmenityIcon({ svgString, className }) {
    const SVG = svgString.replace(
      /className="([^"]*)"/,
      `className="${className}"`
    );
    return <>{parse(SVG)}</>;
  }

  return (
    <>
      <Toaster />
      <div className="w-[630px] flex flex-col mx-auto grow">
        <h1 className="max-w-2xl my-2 text-3xl font-semibold font-airbnb">
          Tell guests what your place has to offer
        </h1>
        <div className="text-[#777] text-base mb-2">
          You can add more amenities after you publish your listing.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  max-w-2xl min-h-80">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 max-w-2xl mx-auto">
                {Array.from({ length: 9 }).map((x, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center p-4 border rounded-xl cursor-pointer w-44 h-28"
                  ></div>
                ))}
              </div>
            }
          >
            {amenities.map(({ name, description, icon, _id }) => {
              return (
                <div
                  key={name}
                  onClick={() => toggleAmenity(_id)}
                  className={`flex flex-col  justify-center p-4 border rounded-xl cursor-pointer transition-all overflow-hidden ${
                    selected.includes(_id)
                      ? "border-primary text-primary bg-[#f7f7f7]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="ms-4 h-10 mt-2">
                    <AmenityIcon svgString={icon} className={`w-6 h-6`} />
                  </div>
                  <span className="text-base font-semibold font-airbnb ms-2 text-[#333]">
                    {name}
                  </span>
                </div>
              );
            })}
          </Suspense>
        </div>
      </div>
      <NextBackFooter progress={53} next={updateAmenties} />
    </>
  );
}
export default Page;
