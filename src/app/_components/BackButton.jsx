"use client";
import IconButton from "@/app/_components/IconButton";
import { useRouter } from "@/i18n/routing";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useLocale } from 'next-intl';

function BackButton() {
  const router = useRouter();
  const locale = useLocale();

  const handleBackClick = () => {
    router.push("/hosting/listings");
  };

  return (
    <IconButton
      ariaLabel={locale === "ar" ? "الرجوع إلى الصفحة السابقة" : "Go Back to the previous page"}
      icon={IoIosArrowRoundBack}
      onClick={handleBackClick}
      classNames={`bg-gray-100 hover:bg-gray-200 ${locale === "ar" ? "rotate-180" : ""}`}
      role="button"
    />
  );
}

export default BackButton;