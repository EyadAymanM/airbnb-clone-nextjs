'use client'
import NextBackFooter from "@/app/_components/AddListingLayout/NextBackFooter";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateListing } from "@/app/_actions/Listing/updateListing";

function Page({ params: { id } }) {
  const router = useRouter()
  const [description, setDescription] = useState('')
  const handleChange = (e) => {
    setDescription(e.target.value)
  }
  const updateDescription = async () => {
    if (description.length > 0) {
      const listing = await updateListing(id, { description })
      if (listing._id)
        router.push(`/become-a-host/${id}/price`)
      else
        toast('Somthing went wrong..')
    } else {
      toast('Please give us a description about your listing')
    }
  }
  return (
    <>
      <div className="grow flex justify-center font-airbnb ">
        <Toaster />
        <div className="w-[630px] my-auto px-3">
          <h1 className="text-3xl font-semibold font-airbnb text-start mb-2">
            Create your description
          </h1>
          <div className="text-[#777] text-base mb-8">
            Share what makes your place special.
          </div>

          <textarea
            name="description"
            id="description"
            rows="7"
            defaultValue={"You'll have a great time at this comfortable place to stay."}
            minLength={1}
            maxLength={500}
            className="w-full rounded-[8px] text-xl p-6 border-2"
            onChange={(e) => handleChange(e)}
          ></textarea>

          <span className="text-sm font-semibold text-gray-600">{description.length}/500</span>
        </div>
      </div>
      <NextBackFooter progress={84} next={updateDescription} />
    </>
  );
}
export default Page;
