'use client'
import { ChevronRightIcon, Home } from "lucide-react";
import Container from "../_components/Container";
import { createNewListing } from "../_actions/Listing/createNewListing";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";


function Page() {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status == 'loading')
    return (
      <div role="status" className="h-96 flex justify-center items-center">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#ff385c]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    )

  if (status == 'unauthenticated')
    return (
      <div className="h-96 flex justify-center items-center">
        
        <span>You aren&#39;t authenticated to use this page... <Link href={'/'} className="underline text-blue-700">go to homepage</Link></span>
      </div>
    )
  if (status == 'authenticated')
    return (
      <>
        <Container>
          <div className="flex flex-col w-[620px] mx-auto px-4 font-airbnb gap-5">
            <h1 className="text-4xl font-semibold">Welcome back, {session.user.token.firstName} </h1>

            <div className="font-bold text-2xl">Manage your listings</div>
            <div onClick={() => router.push('/hosting/listings')} className="flex flex-col gap-4">
              <div className="bg-white hover:bg-[#f7f7f7] cursor-pointer shadow rounded-xl p-4 flex items-center space-x-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Home className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-base">View your Listings</p>
              </div>
            </div>

            <div className="font-semibold text-2xl">Start a new listing</div>
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
              <div onClick={() => createNewListing(session.user.token.access_token)} className="flex justify-between grow cursor-pointer">
                <span>
                  Create a new listing
                </span>
                <span>
                  <ChevronRightIcon />
                </span>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
}
export default Page;
