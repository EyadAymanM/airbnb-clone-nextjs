"use client";
import { fetchData } from "@/app/_actions/Listing/fetchData";
import CardEditorList from "@/app/_components/CardEditorList";
import IconButton from "@/app/_components/IconButton";
import { useRouter } from "@/i18n/routingn";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowRoundBack } from "react-icons/io";

function Layout({ children, params }) {
  const router = useRouter();
  const [listing, setListing] = useState([]);
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchData(`listing/${params.id}`);
        setListing(data); 
      } catch (error) {
        toast.error("Error fetching initial data.");
      }
    };

    fetchInitialData();
  }, []);
  const handleBackClick = () => {
    router.push("/hosting/listings");
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* LEFT - Sidebar */}
      <div className="w-full md:w-1/3 bg-white p-6 border-r border-gray-200 ">
        <div className="flex items-center gap-4 p-4">
          <IconButton
            ariaLabel="Go Back to the previous page"
            icon={IoIosArrowRoundBack}
            onClick={handleBackClick}
            classNames="bg-gray-100 hover:bg-gray-200"
            role="button"
          />
          <h1 className="text-3xl font-bold text-gray-800">Listing Editor</h1>
        </div>
        <div className="h-[72vh] overflow-y-auto ">
          <CardEditorList listing={listing}/>
        </div>
      </div>

      <div className="w-full md:w-2/3 flex flex-col p-8">
        {children}
      </div>
    </div>
  );
}

export default Layout;