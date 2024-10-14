import Gallery from "./_components/Gallery"
import PageNav from "./_components/PageNav"
import StickyNav from "./_components/stickyNav"
import Title from "./_components/Title"
function Page() {
  return (
    <>
      <PageNav />
      <div className="max-w-[2520px] mx-auto xl:px-20 xl:mx-[120px] md:px-10 sm:px-5 px-4 font-airbnb">

        <Title />

        <Gallery id="photos"/>

        <StickyNav />

        <div className="flex">

          {/* main content */}
          <div className="md:w-[60%]"></div>`

          {/* sticky reserve */}
          <div className="hidden md:block"></div>

        </div>

       

      </div>
    </>
  )
}
export default Page