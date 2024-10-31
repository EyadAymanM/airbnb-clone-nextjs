'use client'
import NextBackFooter from "@/app/_components/AddListingLayout/NextBackFooter";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
import { updateListing } from "@/app/_actions/Listing/updateListing";
import { useTranslations } from "next-intl";

function Page({ params: { id } }) {
  const t = useTranslations("become-a-host");
  const router = useRouter()
  const [description, setDescription] = useState('')
  const handleChange = (e) => {
    setDescription(e.target.value)
  }
  const updateDescription = async () => {
    if (description.length > 0) {
      const listing = await updateListing(id, { description })
      if (listing._id)
        router.push(`/become-a-host/${id}/price`)
      else
        toast(t("fail"))
    } else {
      toast(t("no-desc"))
    }
  }
  return (
    <>
      <div className="grow flex justify-center font-airbnb ">
        <Toaster />
        <div className="w-[630px] my-auto px-3">
          <h1 className="text-3xl font-semibold font-airbnb text-start mb-2">
            {(t("create-desc"))}
          </h1>
          <div className="text-[#777] text-base mb-8">
            {t("desc")}
          </div>

          <textarea
            name="description"
            id="description"
            rows="7"
            defaultValue={t("default-desc")}
            minLength={1}
            maxLength={500}
            className="w-full rounded-[8px] text-xl p-6 border-2"
            onChange={(e) => handleChange(e)}
          ></textarea>

          <span className="text-sm font-semibold text-gray-600">{description.length}/500</span>
        </div>
      </div>
      <NextBackFooter progress={84} next={updateDescription} />
    </>
  );
}
export default Page;
