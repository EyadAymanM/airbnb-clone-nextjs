'use client'
import { updateListing } from "@/app/_actions/Listing/updateListing";
import NextBackFooter from "@/app/_components/AddListingLayout/NextBackFooter";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Page({ params: { id } }) {
  const router = useRouter()
  const [floorPlan, setFloorPlan] = useState({ guests: 1, bedrooms: 0, beds: 1, bathrooms: 1 });

  const updateFloorPlan = async () => {
    const listing = await updateListing(id, { ...floorPlan })
    
    if (listing._id) {
      router.push(`/become-a-host/${id}/amenities`)
    }
    else {
      toast('Something went wrong..')
    }
  };

  const updatePlan = (type, operation) => {
    setFloorPlan(prevPlan => {
      const newValue = prevPlan[type] + (operation === 'increment' ? 1 : -1);
      return {
        ...prevPlan,
        [type]: Math.max(type === "guests" | type === "beds" | type === "bathrooms" ? 1 : 0, newValue),
      };
    });
  };

  const GuestTypeSelector = ({ title, type }) => (
    <div className="flex justify-between font-airbnb items-center py-5 border-b border-gray-200 last:border-b-0">
      <div className="flex flex-col">
        <span className="font-normal text-xl">{title}</span>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => updatePlan(type, "decrement")}
          className="bg-white text-gray-700 border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:border-gray-900 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:border-gray-100"
          disabled={floorPlan[type] === (type === "guests" | type === "beds" | type === "bathrooms" ? 1 : 0)}
        >
          -
        </button>
        <span className="w-8 text-center">{floorPlan[type]}</span>
        <button
          onClick={() => updatePlan(type, "increment")}
          className="bg-white text-gray-700 border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:border-gray-900 transition duration-300"
        >
          +
        </button>
      </div>
    </div>
  );
  return (
    <>
      <Toaster />

      <div className="w-full grow flex justify-center font-airbnb my-6">

        <div className="w-[630px] my-auto px-3">

          <h1 className="text-3xl font-semibold font-airbnb text-start">
            Share some basics about your place
          </h1>
          <div className="text-[#777] text-base mb-2">
            Show is what your listing offers.
          </div>

          <GuestTypeSelector title={'Guests'} type={'guests'}/>
          <GuestTypeSelector title={'Bedrooms'} type={'bedrooms'}/>
          <GuestTypeSelector title={'Beds'} type={'beds'}/>
          <GuestTypeSelector title={'Bathrooms'} type={'bathrooms'}/>

        </div>

      </div>
      <NextBackFooter progress={45} next={updateFloorPlan} />
    </>
  )
}
export default Page