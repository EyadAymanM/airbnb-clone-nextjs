'use client'
import NextBackFooter from "@/app/_components/AddListingLayout/NextBackFooter";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateListing } from "@/app/_actions/Listing/updateListing";

function Page({ params: { id } }) {
  const router = useRouter()
  const [price, setPrice] = useState(0)
  const handleChange = (e) => {
    if (!isNaN(e.target.value)){
      setPrice(+e.target.value) 
      
    }
    if(price.length == 0)
      setPrice('0')
    if (price > Number.MAX_SAFE_INTEGER )
      setPrice(Number.MAX_SAFE_INTEGER - 1)
    
  }
  const updatePrice = async () => {
    if (+price > 9 && +price <9139 ) {
      const listing = await updateListing(id, { price })
      if (listing._id)
        router.push(`/hosting/listings`)
      else
        toast('Somthing went wrong..')
    } else {
      toast('Please enter a base price between €10 and €9,139.')
    }
  }
  return (
    <>
      <div className="grow flex justify-center font-airbnb ">
        <Toaster />
        <div className="w-[630px] my-auto mt-24 px-3">
          <h1 className="text-3xl font-semibold font-airbnb text-start mb-2">
            Now, set your price
          </h1>
          <div className="text-[#777] text-base mb-8">
            You can change it anytime.
          </div>

          <div className="flex justify-end">
            <span className={`text-[120px] font-bold`}>€</span>
            <input
              name="price"
              id="price"
              type="text"
              value={price}
              min={0}
              className={`w-96 text-[120px] font-bold border-transparent focus:border-transparent focus:ring-0 px-auto`}
              onChange={(e) => handleChange(e)}
            />
          </div>

        </div>
      </div>
      <NextBackFooter progress={88} next={updatePrice} />
    </>
  );
}
export default Page;
