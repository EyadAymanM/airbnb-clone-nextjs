"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { updateListing } from "@/app/_actions/Listing/updateListing";
import { fetchData } from "@/app/_actions/Listing/fetchData";
import { CldUploadButton } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { FaPlus, FaTrash } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Page({ params: { id } }) {
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
        toast.error("Error fetching initial data.");
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [id]);

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
        toast.success("Photos updated successfully!");
      } else {
        toast.error("Something went wrong..");
      }
    } else {
      toast.error("Please add at least 1 photo");
    }
  };

  const handleRemovePhoto = async (photo) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this photo?");
    
    if (confirmDelete) {
      try {
        await updateListing(id, { photos: photos.filter((p) => p !== photo) });
        setPhotos((prev) => prev.filter((p) => p !== photo));
        setDisplayedPhotos((prev) => prev.filter((p) => p !== photo));
        toast.success("Photo deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete photo.");
      }
    } else {
      toast.error("Photo deletion canceled.");
    }
  };

  return (
    <>
      <div className="flex justify-center font-airbnb">
        <Toaster />
        <div className="px-3">
          <h1 className="text-3xl font-semibold font-airbnb text-start mb-2">
            Photo tour
          </h1>
          <div className="text-[#777] text-base mb-8">
            Manage photos and add details. Guests will only see your tour if
            every room has a photo.
          </div>
          <div className="flex flex-wrap">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="relative w-52 h-52 mr-2 mb-2">
                  <Skeleton height="100%" width="100%" />
                </div>
              ))
            ) : (
              displayedPhotos.map((photo, index) => (
                <div key={index} className="relative w-52 h-52 mr-2 mb-2">
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
              ))
            )}
            <div className="w-52 h-52 bg-[#f7f7f7] flex flex-col justify-center items-center rounded-xl border-2 border-solid ">
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
              className="bg-black text-white px-8 py-6 rounded-2xl hover:bg-gray-800 transition-colors"
              type="submit"
              onClick={updatePhotos}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;