//todo: needs Some Refactoring

'use client'
import NextBackFooter from "@/app/_components/AddListingLayout/NextBackFooter";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateListing } from "@/app/_actions/Listing/updateListing";
import Image from "next/image";
import camera from "@/app/_assets/camera.jpg"
import CldImage from "./CIdImage";
import { CldUploadButton } from 'next-cloudinary';

function Page({ params: { id } }) {
  const router = useRouter()
  const [photos, setPhotos] = useState([])
  const [displayedPhotos, setDisplayedPhotos] = useState([])
  const uploaded = []
  const displayed = []
  const handleUpload = (result) => {
    if (result.event === 'success') {
      uploaded.push(result.info.secure_url)
      displayed.push(result.info.public_id)
    }
    setPhotos(uploaded)
    setDisplayedPhotos(displayed)
  }

  const updatePhotos = async () => {
    if (photos.length >= 5) {
      const listing = await updateListing(id, { photos })
      if (listing._id)
        router.push(`/become-a-host/${id}/title`)
      else
        toast('Somthing went wrong..')
    } else {
      toast('please add at least 5 photos')
    }
  }

  return (
    <>
      <div className="grow flex justify-center font-airbnb ">
        <Toaster />
        <div className="w-[630px] my-auto px-3">
          <h1 className="text-3xl font-semibold font-airbnb text-start mb-2">
            Add some photos of your apartment
          </h1>
          <div className="text-[#777] text-base mb-8">
            You&#39;ll need 5 photos to get started. You can add more or make changes later.
          </div>

          <div className="w-full h-[480px] bg-[#f7f7f7] flex flex-col justify-center items-center rounded-xl border-2 border-dashed mb-10">

            <div className="flex justify-center">

              <Image src={camera} width="182" height="182" alt="" />

            </div>

            <CldUploadButton uploadPreset="airbnb-clone"
              onSuccess={handleUpload}
              options={{ sources: ["local"] }}
              className="w-28 h-11 bg-white hover:bg-[#f7f7f7] border border-black rounded-[8px]">
              Add Photos
            </CldUploadButton>


          </div>
          <div className="grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {displayedPhotos.map((photo, index) =>
            (<CldImage
              key={index}
              width="150"
              height="150"
              src={photo}
              sizes="100vw"
              alt="Description of my image"
            />))}
          </div>
        </div>
      </div>
      <NextBackFooter progress={62} next={updatePhotos}/>
    </>
  );
}
export default Page;
