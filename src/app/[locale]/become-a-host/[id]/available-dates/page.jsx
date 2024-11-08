'use client'
import NextBackFooter from "@/app/_components/AddListingLayout/NextBackFooter";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
import { updateListing } from "@/app/_actions/Listing/updateListing";
import { useLocale, useTranslations } from "next-intl";
import { DateRangePicker } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';



function Page({ params: { id } }) {
  const t = useTranslations("become-a-host")
  const locale = useLocale()
  const router = useRouter()
  const [selected, setSeleted] = useState(false)
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const updateDates = async () => {
    if (selected) {
      const listing = await updateListing(id, { startDate: state[0].startDate, endDate: state[0].endDate, book:false })
      if (listing._id)
        router.push(`/hosting/listings`)
      else
        toast(t("fail"))
    } else {
      toast(t("dates-toast"))
    }
  }
  return (
    <>
      <div className="grow flex justify-center font-airbnb ">
        <Toaster />
        <div className="w-[630px] my-auto px-3">
          <h1 className="text-3xl font-semibold font-airbnb text-start mb-2">
            {t("dates")}
          </h1>
          <div className="text-[#777] text-base mb-8">
            {t("dates-desc")}
          </div>

          <DateRangePicker
            className="w-full border rounded-lg -ms-6"
            minDate={new Date()}
            rangeColors={['#f33e5b', '#3ecf8e', '#fed14c']}
            onChange={item => {
              setState([item.selection])
              setSeleted(true)
            }}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={state}
            direction="horizontal" />

        </div>
      </div>
      <NextBackFooter progress={95} next={updateDates} />
    </>
  );
}
export default Page;
