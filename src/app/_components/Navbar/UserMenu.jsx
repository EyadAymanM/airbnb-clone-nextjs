'use client'
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
import { useEffect, useState } from "react";

function UserMenu() {

  const router = useRouter()
  const [avatar, setAvatar] = useState('https://res.cloudinary.com/dqrid1fi3/image/upload/v1729230344/kwrifwuycusuohxopa8j.jpg')
  const { data: session, status } = useSession()
  console.log('session:',session);
  console.log('status:',status);
  const handleLogOut = async()=>{
    const res = await signOut()
    router.push("/")
  }
  useEffect(()=>{
    if (status == "authenticated") {
      setAvatar(session.user.token.image)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])
  return (
    <>
      <div className="flex">
        <div className="flex items-center me-1">
          <button onClick={()=> router.push('/hosting')} className="text-[#222] font-medium  hover:bg-[#f7f7f7] p-3 rounded-full">
            Switch to hosting
          </button>
          <button className="text-[#222] font-medium  hover:bg-[#f7f7f7] p-3 rounded-full">
            <Image
              className="w-5 h-5"
              src={globe}
              width=""
              height=""
              alt=""
            />
          </button>
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
          <DropdownMenuContent className="w-[15rem] mr-16 bg-white px-0 py-3">
            {session ?
              (
                <>
                  <DropdownMenuItem onClick={() => router.push('/guest/messages/6556')} className="hover:bg-[#e7e7e7] cursor-pointer pl-4 font-medium">
                    Messages
                  </DropdownMenuItem><DropdownMenuItem onClick={() => router.push('/notifications')} className="hover:bg-[#e7e7e7] cursor-pointer pl-4 font-medium">
                    Notifications
                  </DropdownMenuItem><DropdownMenuItem onClick={() => router.push('/trips')} className="hover:bg-[#e7e7e7] cursor-pointer pl-4 font-medium">
                    Trips
                  </DropdownMenuItem><DropdownMenuItem onClick={() => router.push('/wishlists')} className="hover:bg-[#e7e7e7] cursor-pointer pl-4 font-medium">
                    Wishlists
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={()=> router.push('/hosting/listings')} className="hover:bg-[#e7e7e7] cursor-pointer pl-4">
                    Manage linsting
                  </DropdownMenuItem><DropdownMenuItem onClick={()=> router.push('/')} className="hover:bg-[#e7e7e7] cursor-pointer pl-4">
                    Host an experience
                  </DropdownMenuItem><DropdownMenuItem onClick={()=> router.push('/account-settings')} className="hover:bg-[#e7e7e7] cursor-pointer pl-4">
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => router.push('/giftCards')} className="hover:bg-[#e7e7e7] cursor-pointer pl-4">
                    Gift cards
                  </DropdownMenuItem><DropdownMenuItem onClick={()=> router.push('/')} className="hover:bg-[#e7e7e7] cursor-pointer pl-4">
                    Help Center
                  </DropdownMenuItem><DropdownMenuItem onClick={handleLogOut} className="hover:bg-[#e7e7e7] cursor-pointer pl-4">
                    Log Out
                  </DropdownMenuItem>
                </>
              )
              :
              (
                <>
                  <DropdownMenuItem onClick={()=>router.push('/auth/login')} className="hover:bg-[#e7e7e7] cursor-pointer pl-4">
                    Log in
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>router.push('/auth/register')}  className="hover:bg-[#e7e7e7] cursor-pointer pl-4">
                    Sign up
                  </DropdownMenuItem>
                </>
              )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
export default UserMenu