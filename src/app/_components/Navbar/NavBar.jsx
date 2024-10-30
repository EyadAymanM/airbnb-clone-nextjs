import Container from "../Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"

function NavBar() {
  return (
    <>
      <div className="w-full border-b sticky top-0 start-0 bg-white z-10 ">

        <div className="py-4 border-b">

          <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-5 px-4">

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