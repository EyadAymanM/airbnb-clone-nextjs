import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { BsBricks } from "react-icons/bs";
import ListingEditorList from "@/app/_components/ListingEditorList";
import { fetchData } from "@/app/[locale]/_actions/Listing/fetchData";
import {Link} from "@/i18n/routing";
import { getTranslations } from "next-intl/server";



async function Page() {
  const t = await getTranslations('Listings');
  const listings = await fetchData('listing');
  return (
    <div className="container mx-auto px-10 ">
      <div className="flex justify-between items-center my-5">
        <h1 className="text-4xl font-bold mb-10">{t('your-listings')}</h1>
        <div className="flex items-center">
          <CiSearch className="text-4xl mr-4 bg-gray-100 rounded-full p-2 hover:bg-gray-300" />
          <BsBricks className="text-4xl mr-4 bg-gray-100 rounded-full p-2 hover:bg-gray-300" />
          <Link href="/become-a-host">
          <FaPlus className="text-4xl bg-gray-100 rounded-full p-2 hover:bg-gray-300" />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 text-gray-600 font-semibold py-3 rounded-md mb-4">
  <div className="col-span-2">{t("listing")}</div>
  <div className="col-span-1">{t("location")}</div>
  <div className="col-span-1">{t("status")}</div>
</div>
      <div className="mb-20">
        <ListingEditorList listings={listings} />
      </div>
    </div>
  );
}

export default Page;

export const revalidate=60