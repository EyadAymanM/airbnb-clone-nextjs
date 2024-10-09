'use client'
import NextBackFooter from "@/app/_components/AddListingLayout/NextBackFooter"
import axios from "axios";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import FaWifi from "react-icons/fa";
import { fetchData } from "@/app/_actions/Listing/fetchData";

function Page() {
  const [amenities, setAmenities] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleAmenity = (amenity) => {
    const index = amenities.findIndex(item => item.id == amenity)
    if (index == -1) setAmenities([...amenities, amenity])
    else setAmenities(amenities.filter(item => item._id != amenity))
    console.log(amenities);

  }

  useEffect(() => {
    const getAmenities = async () => {
      const res = await fetchData('amenity')
      setAmenities(res)
    }
    getAmenities()
  }, [])
  return (

    <div >
      <h1 className="max-w-2xl mx-auto my-2 text-3xl font-semibold font-airbnb text-center">Tell guests what your place has to offer</h1>
      <div className="text-[#777] text-base mb-2 text-center">You can add more amenities after you publish your listing.</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 max-w-2xl mx-auto">
        {amenities.map(({ name, from, description, icon, _id }) => {

          // const DynamicIcon = dynamic(() => import(`../../../../../node_modules${from}/`).then((mod => mod[icon])))
          return (<div
            key={name}
            onClick={() => toggleAmenity(_id)}
            className={`flex flex-col  justify-center p-4 border rounded-xl cursor-pointer transition-all overflow-hidden ${amenities.includes(name)
              ? "border-primary text-primary bg-[#f7f7f7]"
              : "border-gray-200 hover:border-gray-300"
              }`}
            role="button"
            tabIndex={0}
          >
            <div className="ms-4 h-10 mt-2">
              {/* <DynamicIcon
                className={`text-2xl mb-1 text-start ${amenities.includes(name) ? "text-black" : "text-gray-500"}`}
              /> */}
            </div>
            <span className="text-base font-semibold font-airbnb ms-2 text-[#333]">{name}</span>
          </div>)
        })}
      </div>
      <NextBackFooter progress={15} />
    </div>

  )
}
export default Page