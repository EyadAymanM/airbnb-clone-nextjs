import Image from "next/image"
import { Link } from "@/i18n/routing"
import logoWord from "../../_assets/svgs/Airbnb-word-Logo.png";
import logo from "../../_assets/svgs/airbnb-logo-only.svg";
function Logo() {
  return (
    <Link className="flex gap-1 items-center" href="/">
      <Image
        className="w-7 h-[30px] block"
        src={logo}
        height=""
        width=""
        alt="airbnb"
      />
      <Image
        className="w-16 h-[80] lg:block hidden "
        src={logoWord}
        height=""
        width=""
        alt="airbnb"
      />
    </Link>
  )
}
export default Logo