"use client";
import { CiSearch } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { BsBricks } from "react-icons/bs";
import ListingEditorList from "@/app/_components/ListingEditorList";
import { useEffect, useState } from "react";
import NavBar from "@/app/_components/Navbar/NavBar";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import axios from "axios";

function Page() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const t = useTranslations('Listings');
  const { data: session, status } = useSession();

  const api = process.env.NEXT_PUBLIC_API_URL
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`${api}/listing/hosting/listings`, {
          headers: { Authorization:  session?.user.token.access_token },
        });
        setListings(response.data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };
    
    if (session) {
      fetchListings();
    }
  }, [session]); 

  const handleSearchClick = () => {
    setSearchVisible((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
    <NavBar className="hidden md:block" />
    <div className="container mx-auto px-4 sm:px-10">
      <div className="flex flex-col sm:flex-row justify-between items-center my-5 ">
        <h1 className="text-3xl sm:text-4xl font-bold mb-5 sm:mb-0">
          {t("your-listings")}
        </h1>
        <div className="flex space-x-4 items-center">
          <div className="relative flex items-center">
            {searchVisible ? (
              <AiOutlineClose
                onClick={handleSearchClick}
                className="text-3xl  sm:text-4xl p-2 bg-gray-100 rounded-full hover:bg-gray-300 cursor-pointer"
              />
            ) : (
              <CiSearch
                onClick={handleSearchClick}
                className="text-3xl sm:text-4xl p-2 bg-gray-100 rounded-full hover:bg-gray-300 cursor-pointer transition-colors duration-200 ease-in-out mx-2"
              />
            )}

            {searchVisible && (
              <input
                type="text"
                placeholder={t("search-listings-by-name")}
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-12 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 w-full sm:w-80 transition-transform duration-200 ease-in-out transform"
              />
            )}
          </div>

          <BsBricks className="text-3xl sm:text-4xl p-2 bg-gray-100 rounded-full hover:bg-gray-300 cursor-pointer" />
          <Link href="/become-a-host"> 
            <FaPlus className="text-3xl sm:text-4xl p-2 bg-gray-100 rounded-full hover:bg-gray-300 cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-600 font-semibold py-3 rounded-md mb-4">
        <div className="col-span-2 sm:col-span-2">{t("listing")}</div>
        <div className="hidden sm:table-cell">{t("location")}</div>
        <div className="hidden sm:table-cell">{t("status")}</div>
      </div>
      
      <div className="mb-20">
        <ListingEditorList listings={listings} searchTerm={searchTerm} />
      </div>
    </div>
    </>
  );
}

export default Page;
