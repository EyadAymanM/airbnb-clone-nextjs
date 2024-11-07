"use client";
import hamburger from "../../_assets/svgs/hamburger-menu.svg";
import globe from "../../_assets/svgs/globe.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { usePathname, useRouter } from "@/i18n/routing";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useAuthToken } from "@/lib/context/authContext";
import { setAuthToken } from "@/lib/axiosInstance";

function UserMenu() {
  const t = useTranslations("UserMenu");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [avatar, setAvatar] = useState(
    "https://res.cloudinary.com/dqrid1fi3/image/upload/v1729230344/kwrifwuycusuohxopa8j.jpg"
  );
  const { data: session, status } = useSession();
  console.log("session:", session);
  console.log("status:", status);

  const token = useAuthToken();
  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  const handleLogOut = async () => {
    const res = await signOut();
    router.push("/");
  };
  useEffect(() => {
    if (status == "authenticated") {
      setAvatar(session.user.token.image)
    }
    if (status == "unauthenticated") {
      setAvatar(
        "https://res.cloudinary.com/dqrid1fi3/image/upload/v1729230344/kwrifwuycusuohxopa8j.jpg"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  return (
    <>
      <div className="flex">
        <div className="flex items-center me-1">
          {session && <button onClick={()=> router.push('/become-a-host')} className="text-[#222] font-medium  hover:bg-[#f7f7f7] p-3 rounded-full">
            {t('switch')}
          </button>}
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-[#222] font-medium  hover:bg-[#f7f7f7] p-3 rounded-full">
                <Image
                  className="w-5 h-5"
                  src={globe}
                  width=""
                  height=""
                  alt=""
                />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle className="text-center border-b pb-4">
                  {locale == "en" ? "Change Language" : "تغيير اللغة"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex justify-around">
                  <button
                    onClick={() => router.replace(pathname, { locale: "en" })}
                    disabled={locale == "en"}
                    className={`p-4 border rounded-lg hover:text-white ${
                      locale == "en"
                        ? "bg-[#FF385C] text-white"
                        : "hover:bg-[#FF385C] border-gray-200"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => router.replace(pathname, { locale: "ar" })}
                    disabled={locale == "ar"}
                    className={`p-4 border rounded-lg hover:text-white ${
                      locale == "ar"
                        ? "bg-[#FF385C] text-white"
                        : "hover:bg-[#FF385C] border-gray-200"
                    }`}
                  >
                    العربية
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <div className="flex w-auto rounded-full px-2 py-1 border gap-2 items-center hover:shadow">
              <Image
                className="w-6 h-6"
                src={hamburger}
                height=""
                width=""
                alt=""
              />
              <Image
                className="w-9 h-9 rounded-full object-cover"
                src={avatar}
                width="36"
                height="36"
                alt=""
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[15rem] me-16 bg-white px-0 py-3"
            side="bottom-start"
          >
            {session ? (
              <>
                <DropdownMenuItem
                  onClick={() => router.push("/guest/messages/6556")}
                  className="hover:bg-[#e7e7e7] cursor-pointer pl-4 font-medium"
                >
                  {t("messages")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/notifications")}
                  className="hover:bg-[#e7e7e7] cursor-pointer pl-4 font-medium"
                >
                  {t("notifications")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/trips")}
                  className="hover:bg-[#e7e7e7] cursor-pointer pl-4 font-medium"
                >
                  {t("trips")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/wishlists")}
                  className="hover:bg-[#e7e7e7] cursor-pointer pl-4 font-medium"
                >
                  {t("wishlists")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => router.push("/hosting/listings")}
                  className="hover:bg-[#e7e7e7] cursor-pointer pl-4"
                >
                  {t("manage-listings")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/account-settings")}
                  className="hover:bg-[#e7e7e7] cursor-pointer pl-4"
                >
                  {t("account")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => router.push("/giftCards")}
                  className="hover:bg-[#e7e7e7] cursor-pointer pl-4"
                >
                  {t("gift-cards")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/")}
                  className="hover:bg-[#e7e7e7] cursor-pointer pl-4"
                >
                  {t("help-center")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogOut}
                  className="hover:bg-[#e7e7e7] cursor-pointer pl-4"
                >
                  {t("log-out")}
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem
                  onClick={() => router.push("/auth/login")}
                  className="hover:bg-[#e7e7e7] cursor-pointer pl-4"
                >
                  {t("log-in")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/auth/register")}
                  className="hover:bg-[#e7e7e7] cursor-pointer pl-4"
                >
                  {t("sign-up")}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
export default UserMenu;
