import { useTranslations } from "next-intl";

function NextBackFooter({ progress, back, next } ) {
  const t = useTranslations("become-a-host");
  return (
    <div className="w-full sticky bottom-0 start-0 bg-white font-airbnb z-20">

      <div className="h-[5px] bg-[#ddd]"><div className={`bg-black h-[5px]`} style={{width:`${progress}%`}}></div></div>

      <div className="max-w-[2520px] mx-auto xl:px-14 md:px-10 sm:px-5 px-4">

        <div className="flex flex-row items-center justify-between gap-3 md:gap-0 py-5">

          <button className="underline hover:bg-[#f7f7f7] px-4 py-2 rounded-[5px]" onClick={back}>{t("back")}</button>
          
          <button className={`bg-[#222] hover:bg-black px-8 py-3 text-white rounded-[6px]`} onClick={next}>{t("next")}</button>

        </div>

      </div>

    </div>

  )
}
export default NextBackFooter