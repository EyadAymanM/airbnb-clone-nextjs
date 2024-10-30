"use client"
import AddLisitngNav from "../../_components/AddListingLayout/AddLisitngNav"
import { useRouter } from "@/i18n/routing"
import { signIn, useSession } from "next-auth/react"
import UnauthenticatedComponent from "../../_components/UnauthenticatedComponent.jsx/UnauthenticatedComponent"
import Loading from "../../_components/UnauthenticatedComponent.jsx/Loading"

function Layout({ children }) {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <Loading />
    )
  }

  if (status === "unauthenticated") {
    return(
      <UnauthenticatedComponent />
    )
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