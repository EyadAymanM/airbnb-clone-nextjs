"use client";
import NextBackFooter from "@/app/_components/AddListingLayout/NextBackFooter";
import { Suspense, useEffect, useState } from "react";
import parse from "html-react-parser";
import { fetchData } from "@/app/_actions/Listing/fetchData";
import { updateListing } from "@/app/_actions/Listing/updateListing";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

function Page({ params: { id } }) {
  const t = useTranslations("become-a-host");
  const locale = useLocale()
  const router = useRouter();
  const [amenities, setAmenities] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleAmenity = (amenity) => {
    const index = selected.findIndex((item) => item == amenity);
    if (index == -1) setSelected([...selected, amenity]);
    else setSelected(selected.filter((item) => item != amenity));
    // console.log(amenities);
    // console.log(selected);
  };

  const updateAmenties = async () => {
    const listing = await updateListing(id, { amenities: selected });
    if (listing._id) {
      router.push(`/become-a-host/${id}/photos`);
    } else {
      toast(t("fail"));
    }
  };

  useEffect(() => {
    const getAmenities = async () => {
      const res = await fetchData("amenity");
      setAmenities(res);
      setLoading(false);
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

  if (loading) return (
    <div role="status" className="h-96 flex justify-center items-center">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#ff385c]"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading Amenities...</span>
    </div>
  )

  return (
    <>
      <Toaster />
      <div className="w-[630px] flex flex-col mx-auto grow">
        <h1 className="max-w-2xl my-2 text-3xl font-semibold font-airbnb">
          {t("amenities")}
        </h1>
        <div className="text-[#777] text-base mb-2">
          {t("amenities-desc")}
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
                  key={_id}
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
                    {locale == "ar"? name.ar : name.en}
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
