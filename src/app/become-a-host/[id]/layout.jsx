"use client"
import AddLisitngNav from "../../_components/AddListingLayout/AddLisitngNav"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"

function Layout({ children }) {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (session === null && status === "unauthenticated") {
    signIn(); // Automatically redirect to the login page
    return null;
  }
  return (
    <>
    <div className="h-screen flex flex-col">
        <AddLisitngNav onClick={() => router.push('/hosting/listings')}/>
      {children}
    </div>
      
    </>
  )
}
export default Layout