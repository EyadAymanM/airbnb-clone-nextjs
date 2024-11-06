import Footer from "@/app/_components/Footer/Footer"
import NavBar from "@/app/_components/Navbar/NavBar"
import { Link } from "@/i18n/routing"
import { CheckCircle } from "lucide-react"

function page() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="grow flex flex-col justify-center items-center gap-5">
        <div className="mx-auto">
          <CheckCircle className="w-24 h-24 text-[#FF385C]" />
        </div>
        <div>
          <h1 className="text-4xl font-airbnb font-bold tracking-tight">Your trip is booked!</h1>
        </div>
        <div className="rounded-lg bg-muted p-4">
          <h3 className="font-medium mb-2">What&apos;s next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Check your email for detailed booking information</li>
            <li>• Contact your host through the Airbnb messaging system</li>
            <li>• Review check-in instructions and house rules</li>
            <li>• Pack your bags and get ready for your adventure!</li>
          </ul>
        </div>
        <div className="flex gap-4">
          <Link href={"/trips"} className="w-fit px-12 py-3 rounded-lg bg-[#E51D53] hover:bg-[#D11146] text-white mb-8">
            My trips
          </Link>
          <Link href={"/"} className="w-fit px-12 py-3 rounded-lg bg-[#E51D53] hover:bg-[#D11146] text-white mb-8">
            Return Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default page