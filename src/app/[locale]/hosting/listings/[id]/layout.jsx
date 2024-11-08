'use client';
import { fetchData } from "@/app/_actions/Listing/fetchData";
import BackButton from "@/app/_components/BackButton";
import CardEditorList from "@/app/_components/CardEditorList";
import IconButton from "@/app/_components/IconButton";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useTranslations } from "next-intl";
import { useLocale } from 'next-intl';
import { useSession } from "next-auth/react";
import UnauthenticatedComponent from "@/app/_components/UnauthenticatedComponent.jsx/UnauthenticatedComponent";
import NavBar from "@/app/_components/Navbar/NavBar";
function Layout({ children, params }) {
  const t = useTranslations('Listings');
  const { id } = params;
  const locale = useLocale();
  const [listing, setListing] = useState({});
  const [showChildren, setShowChildren] = useState(false);
  const [error, setError] = useState(null); 
  const { data: session, status } = useSession();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await fetchData(`listing/${id}`);
        setListing(data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setError(t("listings.fetch_error")); 
      }
    };

    fetchListing();
  }, [id]);

  const handleCardClick = () => setShowChildren(true);
  const handleBackToSidebar = () => setShowChildren(false);

  if (status == "unauthenticated")
    return <UnauthenticatedComponent />

  return (
  <>
    <NavBar />
    <div className="flex flex-col md:flex-row">
      {/* LEFT - Sidebar */}
      <div className={classNames("w-full md:w-1/3 bg-white p-4 md:p-6 border-r border-gray-200", { hidden: showChildren && 'md:hidden' })}>
        <div className="flex items-center gap-2 p-2 md:p-4 sticky top-0 bg-white">
          <BackButton/>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {t("editor_title")}
          </h1>
        </div>
        {/* Sidebar list for desktop view */}
        <div className="max-h-[calc(100vh-8rem)] fixed overflow-y-auto hidden md:block">
          <CardEditorList listing={listing} />
        </div>

        {/* Sidebar list for mobile view */}
        <div className="max-h-[calc(100vh-8rem)]  overflow-y-auto md:hidden block ">
          <CardEditorList listing={listing} onCardClick={handleCardClick} mobile={true} />
        </div>
      
      </div>
      <div className="w-full md:w-2/3 p-4 md:p-8 overflow-y-auto hidden md:block">
        {children}
      </div>
      {/* MAIN CONTENT AREA */}
      <div className={classNames("w-full md:w-2/3 flex-col p-4 md:p-8 overflow-y-auto", { hidden: !showChildren && 'md:hidden' })}>
        {showChildren && (
          <IconButton
            ariaLabel={t("navigation.back")}
            icon={IoIosArrowRoundBack}
            onClick={handleBackToSidebar}
            classNames={`bg-gray-100 hover:bg-gray-200 md:hidden text-sm font-semibold mb-4 bg-gray-100 px-3 py-2 rounded ${locale === "ar" ? "rotate-180" : ""}`}
          />
        )}
        {children}
      </div>
    </div>
  </>
  );
}

export default Layout;