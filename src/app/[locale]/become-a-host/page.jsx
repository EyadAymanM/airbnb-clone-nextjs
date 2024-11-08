'use client'
import { ChevronLeftIcon, ChevronRightIcon, Home } from "lucide-react";
import Container from "../../_components/Container";
import { createNewListing } from "../../_actions/Listing/createNewListing";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/routing";
import UnauthenticatedComponent from "../../_components/UnauthenticatedComponent.jsx/UnauthenticatedComponent";
import Loading from "../../_components/UnauthenticatedComponent.jsx/Loading";
import { useLocale, useTranslations } from "next-intl";
import NavBar from "@/app/_components/Navbar/NavBar";
import Footer from "@/app/_components/Footer/Footer";
import toast from "react-hot-toast";


function Page() {
  const t = useTranslations("become-a-host")
  const locale = useLocale()
  const router = useRouter()
  const { data: session, status } = useSession()

  const createlisting = async ()=>{
    const res = await createNewListing(session.user.token.access_token)
    if (res) {
      router.push(`/become-a-host/${res._id}/category`)
    }else{
      toast(t("fail"))
    }
  }
  
  if (status == 'loading')
    return (
      <Loading />
    )

  if (status == 'unauthenticated')
    return (
      <UnauthenticatedComponent />
    )
  if (status == 'authenticated')
    return (
      <div>
      <NavBar />
        <Container>
          <div className="flex flex-col w-[620px] mx-auto px-4 font-airbnb gap-10 md:mt-16">
            <h1 className="text-4xl font-semibold">{t("welcome")} {session.user.token?.firstName} </h1>

            <div className="font-bold text-2xl">{t("manage")}</div>
            <div onClick={() => router.push('/hosting/listings')} className="flex flex-col gap-4">
              <div className="bg-white hover:bg-[#f7f7f7] cursor-pointer shadow rounded-xl p-4 flex items-center space-x-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Home className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-base">{t("view")}</p>
              </div>
            </div>

            <div className="font-semibold text-2xl">{t("start")}</div>
            <div className="flex items-center border-b pb-3">
              <div className="me-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{ display: 'block', height: '32px', width: '32px', fill: 'currentcolor' }}
                >
                  <path d="M31.7 15.3 29 12.58 18.12 1.7a3.07 3.07 0 0 0-4.24 0L3 12.59l-2.7 2.7 1.4 1.42L3 15.4V28a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V15.41l1.3 1.3ZM27 28H5V13.41L15.3 3.12a1 1 0 0 1 1.4 0L27 13.42ZM17 12v5h5v2h-5v5h-2v-5h-5v-2h5v-5Z"></path>
                </svg>
              </div>
              <div onClick={createlisting} className="flex justify-between grow cursor-pointer">
                <span>
                  {t("create")}
                </span>
                <span>
                  {locale == "en" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </span>
              </div>
            </div>
          </div>
        </Container>
        <Footer position={'fixed'}/>
      </div>
    );
}
export default Page;
