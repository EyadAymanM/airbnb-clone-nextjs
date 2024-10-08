import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { BsBricks } from "react-icons/bs";

import itiImage from '@/app/_assets/iti.jpeg'
import Image from "next/image";

export default function page() {
  return (
    <>

      <div>
          <div className=" mx-auto px-10 flex justify-between items-center	 mb-20 ">
              <h1 className="mb-20 ml-10 mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white" >Your Listing</h1>
              <p className="w-60 flex justify-evenly text-2xl font-bold">
                <CiSearch className="bg-gray-100  hover:bg-gray-200  font-bold text-4xl rounded-full p-2" />
                <BsBricks className="bg-gray-100  hover:bg-gray-200  font-bold text-4xl rounded-full p-2" />
                <FaPlus  className="bg-gray-100  hover:bg-gray-200  font-bold text-4xl rounded-full p-2" />
              </p>
          </div>

          <div className="overflow-x-auto  pl-20 pr-20">
              <table className="w-full bg-white border border-gray-300">
                  <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">Listing</th>
                          <th className="py-3 px-6 text-left">Location</th>
                          <th className="py-3 px-6 text-left">Status</th>
                      </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                      <tr className="border-b border-gray-300 hover:bg-gray-100">
                          <td className="py-3 px-6"><Image width='150' height='150' alt='' src={itiImage} style={{display: 'inline' }} className="pr-3" /> ITI</td>
                          <td className="py-3 px-6">Cairo</td>
                          <td className="py-3 px-6"> <span className="rounded-full mr-2" style={{width: '10px',height: '10px', background: 'orange', display: 'inline-block' }}></span>Virification required</td>
                      </tr>
                      <tr className="border-b border-gray-300 hover:bg-gray-100">
                      <td className="py-3 px-6"><Image width='150' height='150' alt='' src={itiImage} style={{display: 'inline' }} className="pr-3" /> ITI</td>
                      <td className="py-3 px-6">Giza</td>
                          <td className="py-3 px-6"> <span className="rounded-full mr-2" style={{width: '10px',height: '10px', background: 'orange', display: 'inline-block' }}></span>In-Progress</td>
                      </tr>
                      <tr className="border-b border-gray-300 hover:bg-gray-100">
                      <td className="py-3 px-6"><Image width='150' height='150' alt='' src={itiImage} style={{display: 'inline' }} className="pr-3" /> ITI</td>
                      <td className="py-3 px-6">Alex</td>
                          <td className="py-3 px-6"> <span className="rounded-full mr-2" style={{width: '10px',height: '10px', background: 'orange', display: 'inline-block' }}></span>In-Progress</td>
                      </tr>
                  </tbody>
              </table>
            </div>
      </div>


    </>
  )
}
