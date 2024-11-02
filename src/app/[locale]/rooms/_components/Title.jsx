'use client'
import { ChevronLeft } from "lucide-react"
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

function Title({ title, share, save }) {
  const t = useTranslations("Room")
  const router = useRouter()
  return (
    <>
      {/* mobile nav */}
      <div className="w-full border-b bg-white z-10 md:hidden block">
        <div className="flex mx-4 py-4">
          <div className="flex gap-2 grow" onClick={() => router.push('/')}>
            <ChevronLeft /> <span>{t("homes")}</span>
          </div>
          <span onClick={share} className="flex items-center gap-1 underline text-[#000] text-[15px] font-[500] hover:bg-[#f7f7f7] px-2 cursor-pointer rounded-[10px]">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                fill: "none",
                height: "16px",
                width: "16px",
                stroke: "currentColor",
                strokeWidth: "2",
                overflow: "visible",
              }}
            >
              <path
                d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289"
                fill="none"
              ></path>
            </svg>
          </span>
          <span onClick={save} className="flex items-center gap-1 underline text-[#000] text-[15px] font-[500] hover:bg-[#f7f7f7] px-2 cursor-pointer rounded-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                fill: "none",
                height: "16px",
                width: "16px",
                stroke: "currentColor",
                strokeWidth: "2",
                overflow: "visible",
              }}
            >
              <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
            </svg>
          </span>
        </div>
      </div>


      {/* title heading */}
      <div className="flex gap-2 py-2 ">
        <h1 className="text-[27px] font-bold grow">
          {title}
        </h1>
        <span onClick={share} className="hidden md:flex items-center gap-1 underline text-[#000] text-[15px] font-[500] hover:bg-[#f7f7f7] px-2 cursor-pointer rounded-[10px]">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              fill: "none",
              height: "16px",
              width: "16px",
              stroke: "currentColor",
              strokeWidth: "2",
              overflow: "visible",
            }}
          >
            <path
              d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289"
              fill="none"
            ></path>
          </svg>
          {t("share")}
        </span>
        <span onClick={save} className="hidden md:flex items-center gap-1 underline text-[#000] text-[15px] font-[500] hover:bg-[#f7f7f7] px-2 cursor-pointer rounded-[10px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              fill: "none",
              height: "16px",
              width: "16px",
              stroke: "currentColor",
              strokeWidth: "2",
              overflow: "visible",
            }}
          >
            <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
          </svg>
          {t("save")}
        </span>
      </div>

    </>
  );
}
export default Title;
