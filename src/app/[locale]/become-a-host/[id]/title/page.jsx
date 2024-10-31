'use client'
import NextBackFooter from "@/app/_components/AddListingLayout/NextBackFooter";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
import { updateListing } from "@/app/[locale]/_actions/Listing/updateListing";
import { useTranslations } from "next-intl";

function Page({ params: { id } }) {
  const t = useTranslations("become-a-host")
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
        toast(t("fail"))
    } else {
      toast(t("title-toast"))
    }
  }
  return (
    <>
      <div className="grow flex justify-center font-airbnb ">
        <Toaster />
        <div className="w-[630px] my-auto px-3">
          <h1 className="text-3xl font-semibold font-airbnb text-start mb-2">
            {t("title")}
          </h1>
          <div className="text-[#777] text-base mb-8">
            {t("title-desc")}
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
