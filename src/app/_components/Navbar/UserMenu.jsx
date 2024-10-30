"use client";

import avatar from "../../_assets/124599.jpg";
import hamburger from "../../_assets/svgs/hamburger-menu.svg";
import globe from "../../_assets/svgs/globe.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

function UserMenu() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleNavigation = (path) => router.push(path);
  const handleLogOut = async () => {
    signOut({ callbackUrl: "/" });
    router.push("/");
  };

  return (
    <div className="flex">
      <div className="flex items-center me-1">
        <button
          onClick={() => handleNavigation('/become-a-host')}
          className="text-[#222] font-medium hover:bg-[#f7f7f7] p-3 rounded-full"
        >
          Switch to hosting
        </button>
        <button className="text-[#222] font-medium hover:bg-[#f7f7f7] p-3 rounded-full">
          <Image className="w-5 h-5" src={globe} alt="Language Selector" />
        </button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <div className="flex items-center w-auto rounded-full px-2 py-1 border gap-2 hover:shadow">
            <Image className="w-6 h-6" src={hamburger} alt="Menu" />
            <Image className="w-9 h-9 rounded-full" src={avatar} alt="User Avatar" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[15rem] mr-16 bg-white px-0 py-3">
          {session ? (
            <>
              {[
                { label: "Messages", path: "/guest/messages/6556" },
                { label: "Notifications", path: "/notifications" },
                { label: "Trips", path: "/trips" },
                { label: "Wishlists", path: "/wishlists" },
              ].map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  className="hover:bg-[#e7e7e7] cursor-pointer pl-4 font-medium"
                >
                  {item.label}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              {[
                { label: "Manage Listings", path: "/hosting/listings" },
                { label: "Host an Experience", path: "/" },
                { label: "Account", path: "/account-settings" },
              ].map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  className="hover:bg-[#e7e7e7] cursor-pointer pl-4"
                >
                  {item.label}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              {[
                { label: "Gift Cards", path: "/giftsCards" },
                { label: "Help Center", path: "/" },
              ].map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  className="hover:bg-[#e7e7e7] cursor-pointer pl-4"
                >
                  {item.label}
                </DropdownMenuItem>
              ))}

              <DropdownMenuItem
                onClick={handleLogOut}
                className="hover:bg-[#e7e7e7] cursor-pointer pl-4"
              >
                Log Out
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                onClick={() => handleNavigation('/auth/login')}
                className="hover:bg-[#e7e7e7] cursor-pointer pl-4"
              >
                Log In
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleNavigation('/auth/register')}
                className="hover:bg-[#e7e7e7] cursor-pointer pl-4"
              >
                Sign Up
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserMenu;