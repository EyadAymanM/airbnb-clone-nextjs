import { Link } from "@/i18n/routing";
import Image from "next/image";
import Airbnb from "../../_assets/svgs/Airbnb-Logo-full.svg";
import { useTranslations } from "next-intl";
export default function UnauthenticatedComponent() {
  const t = useTranslations("unauthenticated");
  return (
    <div className="h-96 flex flex-col justify-center items-center font-airbnb text-center">
      <Image src={Airbnb} width="400" height="" alt="" />
      <span className="text-2xl">
        {t("message")}<br /><br />{" "}
        <Link href={"/"} className="underline text-blue-700">
          {t("home")}
        </Link>{" "}
        {t("or")}{" "}
        <Link href={"/auth/login"} className="underline text-blue-700">
          {t("login")}
        </Link>
      </span>
    </div>
  );
}
