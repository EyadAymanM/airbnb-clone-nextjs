'use client'
import NextBackFooter from "@/app/_components/AddListingLayout/NextBackFooter";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateListing } from "@/app/_actions/Listing/updateListing";

function Page({ params: { id } }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const handleChange = (e) => {
    setTitle(e.target.value)
  }
  const updateTitle = async () => {
    if (title.length > 0) {
      const listing = await updateListing(id, { title })
      if (listing._id)
        router.push(`/become-a-host/${id}/description`)
      else
        toast('Somthing went wrong..')
    } else {
      toast('Please fill you lisiting title')
    }
  }
  return (
    <>
      <div className="grow flex justify-center font-airbnb ">
        <Toaster />
        <div className="w-[630px] my-auto px-3">
          <h1 className="text-3xl font-semibold font-airbnb text-start mb-2">
            Now, let&#39;s give your apartment a title
          </h1>
          <div className="text-[#777] text-base mb-8">
            Short titles work best. Have fun with it—you can always change it
            later.
          </div>

          <textarea
            name="title"
            id="title"
            rows="5"
            minLength={1}
            maxLength={32}
            className="w-full rounded-[8px] text-xl p-4 border-2"
            onChange={(e) => handleChange(e)}
          ></textarea>

          <span className="text-sm font-semibold text-gray-600">{title.length}/32</span>
        </div>
      </div>
      <NextBackFooter progress={73} next={updateTitle} />
    </>
  );
}
export default Page;
