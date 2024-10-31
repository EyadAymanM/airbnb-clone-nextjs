"use client"
import Image from "next/image";
import airbnb from "@/app/[locale]/_assets/svgs/Airbnb-Logo-full.svg";
import { ChevronLeftIcon, ChevronRightIcon, Clock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { fetchData } from "../../_actions/Listing/fetchData";
import Loading from "../../../_components/UnauthenticatedComponent.jsx/Loading";
import { Link } from "@/i18n/routing";
function Page({ params: { id } }) {
  const t = useTranslations("book")
  const locale = useLocale();
  const [loading,setLoading] = useState(true)
  const [listing,setListing] = useState({photos:[]})
  
  
  useEffect(()=>{
    const getListing = async()=>{
      const res = await fetchData(`listing/${id}`)
      setListing(res)
      setLoading(false)
    }
    getListing()
  },[id])

  if (loading)
    return (<Loading />)
  return (
    <div className="font-airbnb">
      <div className="border-b">
        <Image
          className="hidden md:block mx-2"
          src={airbnb}
          alt="airbnb"
          width={124}
          height={""}
        />
        <div className="md:hidden relative text-center py-4">
          <div className="absolute top-2 start-2 cursor-pointer hover:bg-[#f7f7f7] rounded-full p-2">
            {locale == "en" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </div>
          {t("request")}
        </div>
      </div>
      <div className="container">
        <div className="hidden md:flex  items-center gap-4 mt-6 relative">
          <div className="absolute -start-14 cursor-pointer hover:bg-[#f7f7f7] rounded-full p-3">
            {locale == "en" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </div>
          <span className="text-3xl font-semibold">{t("request")}</span>
        </div>
        <div className="flex">
          <div className="md:w-1/2 mt-4 flex flex-col gap-4">

            <div className="flex flex-col gap-5 border-b pb-4">
              <h1 className="text-2xl font-bold">{t("request")}</h1>
              <div className="text-base"> 
                <div className="font-medium">{t("dates")}</div>
                <div className="text-[#444]">Jan 3 – 8, 2025</div>
              </div>
              <div className="text-base"> 
                <div className="font-medium">{t("guests")}</div>
                <div className="text-[#444]">{listing.guests} {t("guest")}</div>
              </div>             
            </div>

            <div className="my-4 border-b pb-4">
              <h2 className="text-2xl font-semibold">{t("rule")}</h2>
              <p className="text-base">
                {t("rules")}
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>{t("rule-1")}</li>
                <li>{t("rule-2")}</li>
              </ul>
            </div>

            <p className="text-xs text-muted-foreground">
              {t("p-1")}{" "}
              <Link href="#" className="text-primary underline">
                {t("p-2")}
              </Link>
              ,{" "}
              <Link href="#" className="text-primary underline">
                {t("p-3")}
              </Link>
              ,{" "}
              <Link href="#" className="text-primary underline">
                {t("p-4")}
              </Link>
              {t("p-5")}{" "}
              <Link href="#" className="text-primary underline">
                {t("p-6")}
              </Link>{" "}
              {t("p-7")}
            </p>

            <button className="w-fit px-12 py-3 rounded-lg bg-[#E51D53] hover:bg-[#D11146] text-white">
              Book
            </button>

          </div>
          <div className="md:w-1/2 md:block hidden">
            <div className="border sticky top-8 start-0 mt-4 p-6 rounded-xl ms-20">
              <div className="border-b flex gap-2 pb-4 items-center">
                <Image src={listing.photos[0]} alt="" width="100" height="100" className="w-28 h-28 object-cover rounded-lg" />
                <div className="flex flex-col">
                  <span className="font-medium">{listing.title}</span>
                  <span className="text-sm text-gray-600 font-light">{listing.type}</span>
                </div>
              </div>
              <div className="flex flex-col mt-2 gap-2">
                <div className="text-2xl">{t("price")}</div>
                <div className="text-base flex justify-between">
                  <span>{t("total")}<span className="underline">(EGP)</span></span>
                  <span className="">{listing.price}ج.م</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Page;
