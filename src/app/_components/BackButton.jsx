"use client";
import IconButton from "@/app/_components/IconButton";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/hosting/listings");
  };

  return (
    <IconButton
      ariaLabel="Go Back to the previous page"
      icon={IoIosArrowRoundBack}
      onClick={handleBackClick}
      classNames="bg-gray-100 hover:bg-gray-200"
      role="button"
    />
  );
}

export default BackButton;