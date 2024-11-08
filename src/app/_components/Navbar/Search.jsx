'use client';
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
const Searchbar = ({mobile}) => {
  const t = useTranslations("search-listing")
  const locale = useLocale()
  const router = useRouter()
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState('')

  const handleSearch = async(e)=>{
    e.preventDefault()
    if(search.length > 0)
      router.push(`?search=${search}`)
  }

  return (
    <>
      <div className={`${mobile ? 'md:hidden pt-3' :'hidden md:block ms-20 max-w-96'} relative w-full  font-airbnb`}>
        <div
          className={`flex items-center rounded-full border-2 ${isFocused ? 'border-rose-500' : 'border-gray-300'
            } transition-colors duration-200`}
        >
          <div onClick={handleSearch} className={`absolute ${locale == 'en'?'right-3':'left-3'} text-gray-400 hidden md:block cursor-pointer p-[5px] rounded-full hover:bg-gray-300`}>
            <BiSearch className={`h-5 w-5 rounded-full ${isFocused ? 'text-rose-500' : ''}`} />
          </div>
          <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={t("placeholder")}
            className="w-full py-2 ps-6 text-sm text-gray-600 rounded-full border-none focus:outline-none focus:ring-0"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e)=>setSearch(e.target.value)}
          />
          </form>
        </div>
      </div>
  
    </>
  );
};

export default Searchbar;