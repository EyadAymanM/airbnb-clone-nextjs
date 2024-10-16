"use client";
import Image from "next/image";
import Gallery from "./_components/Gallery";
import PageNav from "./_components/PageNav";
import StickyNav from "./_components/stickyNav";
import Title from "./_components/Title";
import t from "@/app/_assets/camera.jpg";
import { useRouter } from "next/navigation";
import Review from "./_components/Review";
import StaticMap from "./_components/StaticMap";

function Page() {
  const router = useRouter();
  return (
    <>
      <PageNav />
      <div className="max-w-[2520px] mx-auto xl:px-20 xl:mx-[120px] md:px-10 sm:px-5 px-4 font-airbnb">
        <Title />

        <Gallery />

        <StickyNav />
        {/* place, owner, description & amenities */}
        <div className="flex pb-6 border-b">
          {/* main content */}
          <div className="md:w-[60%]">
            {/* address */}
            <div className="my-4 py-2">
              <h1 className="text-2xl font-semibold">
                {<>Room</> || type} in{" "}
                {<>Greater London</> || address.governorate},{" "}
                {<>United Kingdom</> || address.country}
              </h1>
              <span className="text-gray-700">
                {<>1</> || beds} bed{" . "}
                {/* {beds > 1 ? <>s</> : <></>} */}
                {<>1</>} bathroom
                {/* {bathroom > 1 ? <>s</> : <></>} */}
              </span>
            </div>

            {/* owner */}
            <div className="flex items-center my-6 pb-8 border-b">
              <Image
                src={t}
                alt=""
                width="40"
                height="40"
                className="me-4 rounded-full  cursor-pointer"
                onClick={() => router.push(`user/${owner.id}`)}
              />
              <div className="text-base font-medium">
                Stay with {<>Sara</> || firstName}
              </div>
            </div>
            {/* description */}
            <div className="flex flex-col gap-4 my-6 pb-8 border-b">
              <h1 className="text-2xl font-semibold">About this place</h1>
              <p className="text-base font-medium">
                {(
                  <>
                    An ensuite double bedroom in a spacious, comfortable flat,
                    conveniently located on a quiet square by Dalston Junction
                    station. Just behind a high street with restaurants, bars,
                    cafes and transport links. I live here with my standard
                    poodle, Rei. We love guests who make themselves at home and
                    are more than happy to share the living room and kitchen.
                    You&#39;ll have your own private bedroom and bathroom with
                    shower. Fresh sheets and towels provided. An additional
                    shared toilet is downstairs.
                  </>
                ) || description}
              </p>
            </div>
            {/* amenities */}
            <div className="flex flex-col gap-4 my-6" id="amenities">
              <h1 className="text-2xl font-semibold mb-2">What this place offers</h1>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:ps-0 ps-4">
                <div className="flex gap-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{ display: "block", fill: "currentcolor" }}
                  >
                    <path d="M16 20.33a3.67 3.67 0 1 1 0 7.34 3.67 3.67 0 0 1 0-7.34zm0 2a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34zM16 15a9 9 0 0 1 8.04 4.96l-1.51 1.51a7 7 0 0 0-13.06 0l-1.51-1.51A9 9 0 0 1 16 15zm0-5.33c4.98 0 9.37 2.54 11.94 6.4l-1.45 1.44a12.33 12.33 0 0 0-20.98 0l-1.45-1.45A14.32 14.32 0 0 1 16 9.66zm0-5.34c6.45 0 12.18 3.1 15.76 7.9l-1.43 1.44a17.64 17.64 0 0 0-28.66 0L.24 12.24c3.58-4.8 9.3-7.9 15.76-7.9z"></path>
                  </svg>
                  <span>Wifi</span>
                </div>
                <div className="flex gap-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{ display: "block", fill: "currentcolor" }}
                  >
                    <path d="M16 20.33a3.67 3.67 0 1 1 0 7.34 3.67 3.67 0 0 1 0-7.34zm0 2a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34zM16 15a9 9 0 0 1 8.04 4.96l-1.51 1.51a7 7 0 0 0-13.06 0l-1.51-1.51A9 9 0 0 1 16 15zm0-5.33c4.98 0 9.37 2.54 11.94 6.4l-1.45 1.44a12.33 12.33 0 0 0-20.98 0l-1.45-1.45A14.32 14.32 0 0 1 16 9.66zm0-5.34c6.45 0 12.18 3.1 15.76 7.9l-1.43 1.44a17.64 17.64 0 0 0-28.66 0L.24 12.24c3.58-4.8 9.3-7.9 15.76-7.9z"></path>
                  </svg>
                  <span>Wifi</span>
                </div>
                <div className="flex gap-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{ display: "block", fill: "currentcolor" }}
                  >
                    <path d="M16 20.33a3.67 3.67 0 1 1 0 7.34 3.67 3.67 0 0 1 0-7.34zm0 2a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34zM16 15a9 9 0 0 1 8.04 4.96l-1.51 1.51a7 7 0 0 0-13.06 0l-1.51-1.51A9 9 0 0 1 16 15zm0-5.33c4.98 0 9.37 2.54 11.94 6.4l-1.45 1.44a12.33 12.33 0 0 0-20.98 0l-1.45-1.45A14.32 14.32 0 0 1 16 9.66zm0-5.34c6.45 0 12.18 3.1 15.76 7.9l-1.43 1.44a17.64 17.64 0 0 0-28.66 0L.24 12.24c3.58-4.8 9.3-7.9 15.76-7.9z"></path>
                  </svg>
                  <span>Wifi</span>
                </div>
                <div className="flex gap-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{ display: "block", fill: "currentcolor" }}
                  >
                    <path d="M16 20.33a3.67 3.67 0 1 1 0 7.34 3.67 3.67 0 0 1 0-7.34zm0 2a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34zM16 15a9 9 0 0 1 8.04 4.96l-1.51 1.51a7 7 0 0 0-13.06 0l-1.51-1.51A9 9 0 0 1 16 15zm0-5.33c4.98 0 9.37 2.54 11.94 6.4l-1.45 1.44a12.33 12.33 0 0 0-20.98 0l-1.45-1.45A14.32 14.32 0 0 1 16 9.66zm0-5.34c6.45 0 12.18 3.1 15.76 7.9l-1.43 1.44a17.64 17.64 0 0 0-28.66 0L.24 12.24c3.58-4.8 9.3-7.9 15.76-7.9z"></path>
                  </svg>
                  <span>Wifi</span>
                </div>
              </div>
            </div>
          </div>

          {/* sticky reserve */}
          <div className="grow hidden md:block ps-24">
            <div className="mt-8 p-6 rounded-xl border shadow-lg sticky top-24">
              <div className="font-airbnb text-2xl">
                {Intl.NumberFormat("us-US", {
                  style: "currency",
                  currency: "EGP",
                  minimumFractionDigits: 0,
                }).format(4889)}
                <span className="text-base"> night</span>
              </div>
              <button className="bg-[#FF385C] text-white w-full text-lg rounded-[6px] py-2 my-2 ">
                Reserve
              </button>
            </div>
          </div>
        </div>

        {/* reviews & location */}
        <div className="flex flex-col">

          {/* reviews */}
          <div className="border-b">

            <h1 className="text-2xl font-semibold mt-5" id="reviews">Reviews</h1>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-24 gap-y-8 py-6">
              {Array.from({ length: 5 }).map((_, i) => <Review key={i} />)}
            </div>

          </div>

          <div className="flex flex-col gap-4 pb-8" id="location">

            <h1 className="text-2xl font-semibold mt-5" id="reviews">Where you&#39;ll be</h1>

            <span className="text-gray-700">{<>Greater London, England, United Kingdom</> || <>{address.street} {address.city} {address.country}</>}</span>

            <StaticMap />

          </div>

        </div>
      </div>
    </>
  );
}
export default Page;
