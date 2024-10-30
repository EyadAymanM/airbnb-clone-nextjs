import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { BsBricks } from "react-icons/bs";
import ListingEditorList from "@/app/_components/ListingEditorList";
import { fetchData } from "@/app/_actions/Listing/fetchData";
import Link from "next/link";

async function Page() {
  const listings = await fetchData('listing');
  return (
    <div className="container mx-auto px-4 sm:px-10">
      <div className="flex flex-col sm:flex-row justify-between items-center my-5">
        <h1 className="text-3xl sm:text-4xl font-bold mb-5 sm:mb-0">Your Listings</h1>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <CiSearch className="text-3xl sm:text-4xl mr-2 bg-gray-100 rounded-full p-2 hover:bg-gray-300 cursor-pointer" />
          </div>
          <div className="flex items-center">
            <BsBricks className="text-3xl sm:text-4xl mr-2 bg-gray-100 rounded-full p-2 hover:bg-gray-300 cursor-pointer" />
          </div>
          <Link href="/become-a-host" className="flex items-center">
            <FaPlus className="text-3xl sm:text-4xl bg-gray-100 rounded-full p-2 hover:bg-gray-300 cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-600 font-semibold py-3 rounded-md mb-4">
        <div className="col-span-2 sm:col-span-2">Listing</div>
        <div className="hidden sm:table-cell">Location</div>
        <div className="hidden sm:table-cell">Status</div>
      </div>
      <div className="mb-20">
        <ListingEditorList listings={listings} />
      </div>
    </div>
  );
}

export default Page;

export const revalidate = 60;