"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { updateListing } from "@/app/_actions/Listing/updateListing";
import { fetchData } from "@/app/_actions/Listing/fetchData";
import { CldUploadButton } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { FaPlus, FaTrash } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslations } from "next-intl";

function Page({ params: { id } }) {
  const t = useTranslations('Listings');
  const [photos, setPhotos] = useState([]);
  const [displayedPhotos, setDisplayedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchData(`listing/${id}`);
        setPhotos(data.photos || []);
        setDisplayedPhotos(data.photos || []);
      } catch (error) {
        toast.error(t("fetch_error"));
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [id, t]);

  const handleUpload = (result) => {
    if (result.event === "success") {
      setPhotos((prev) => [...prev, result.info.secure_url]);
      setDisplayedPhotos((prev) => [...prev, result.info.secure_url]);
    }
  };

  const updatePhotos = async () => {
    if (photos.length) {
      const listing = await updateListing(id, { photos });
      if (listing._id) {
        toast.success(t("photos-updated-successfully"));
      } else {
        toast.error(t("something-went-wrong"));
      }
    } else {
      toast.error(t("please-add-at-least-1-photo"));
    }
  };

  const handleRemovePhoto = async (photo) => {
    try {
      await updateListing(id, { photos: photos.filter((p) => p !== photo) });
      setPhotos((prev) => prev.filter((p) => p !== photo));
      setDisplayedPhotos((prev) => prev.filter((p) => p !== photo));
      toast.success(t("photo-deleted-successfully"));
    } catch (error) {
      toast.error(t("failed-to-delete-photo"));
    }
  };

  return (
    <>
      <div className="flex justify-center font-airbnb px-4">
        <Toaster />
        <div className="max-w-lg w-full">
          <h1 className="text-3xl font-semibold text-start mb-2">{t("photo-tour")}</h1>
          <div className="text-[#777] text-base mb-8">
            {t("manage-photos-description")}.
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="relative w-full h-40">
                    <Skeleton height="100%" width="100%" />
                  </div>
                ))
              : displayedPhotos.map((photo, index) => (
                  <div key={index} className="relative w-full h-40">
                    <div
                      className="h-full w-full bg-[#f7f7f7] rounded-xl border-4 border-solid border-gray-300 bg-cover bg-center"
                      style={{ backgroundImage: `url(${photo})` }}
                    />
                    <button
                      onClick={() => handleRemovePhoto(photo)}
                      className="absolute top-2 right-2 bg-gray-100 rounded-full p-2 hover:bg-gray-300"
                      aria-label="Remove photo"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </div>
                ))}
            <div className="relative w-full h-40 bg-[#f7f7f7] flex flex-col justify-center items-center rounded-xl border-2 border-solid">
              <CldUploadButton
                uploadPreset="airbnb-clone"
                onSuccess={handleUpload}
                options={{ sources: ["local"] }}
                className="mb-4"
                id="add-photo"
              >
                <FaPlus className="text-4xl bg-gray-100 rounded-full p-2 hover:bg-gray-300" />
              </CldUploadButton>
            </div>
          </div>
          <div className="flex justify-end items-center mt-4">
            <Button
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors w-full sm:w-auto"
              type="submit"
              onClick={updatePhotos}
            >
              {t("save")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
