import Logo from "@/app/_components/Navbar/Logo"
import UserMenu from "@/app/_components/Navbar/UserMenu"

function NavBar() {
  return (
    <>
      <div className="w-full border-b bg-white z-10 md:block hidden">

        <div className="py-4 border-b">

          <div className="max-w-[2520px] mx-auto xl:px-20 xl:mx-[120px] md:px-10 sm:px-5 px-4">

            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">

              <Logo />

              {/* <Search /> */}

              <UserMenu />

            </div>

          </div>

        </div>

      </div>
      
    </>
  )
}
export default NavBar