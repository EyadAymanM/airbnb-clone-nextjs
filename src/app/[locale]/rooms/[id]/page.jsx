"use client";
import Image from "next/image";
import Gallery from "../_components/Gallery";
// import PageNav from "../_components/PageNav";
import PageNav from "@/app/[locale]/_components/Navbar/NavBar";
import StickyNav from "../_components/stickyNav";
import Title from "../_components/Title";
import owner from "../../_assets/camera.jpg";
import { useRouter } from "@/i18n/routing";
import Review from "../_components/Review";
import StaticMap from "../_components/StaticMap";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { fetchData } from "@/app/[locale]/_actions/Listing/fetchData";
import { useLocale, useTranslations } from "next-intl";
import { Footer } from "react-day-picker";

function Page({ params: { id } }) {
  const t = useTranslations("Room")
  const t2 = useTranslations("ListingCard")
  const locale = useLocale()
  const router = useRouter();

  function AmenityIcon({ svgString, className }) {
    const SVG = svgString.replace(
      /className="([^"]*)"/,
      `className="${className}"`
    );
    return <>{parse(SVG)}</>;
  }

  const [room, setRoom] = useState({
    photos: [],
    owner: {},
    address: {},
    amenities: [],
    location: {},
  });

  useEffect(() => {
    const getRoom = async () => {
      const data = await fetchData(`listing/${id}`);
      setRoom(data);
    };
    getRoom();
  }, [id]);

  return (
    <div>
      <PageNav position={""}/>
      <div className="max-w-[2520px] mx-auto xl:px-20 xl:mx-[120px] md:px-10 sm:px-5 px-4 font-airbnb">
        <Title title={room.title} />

        <Gallery photos={room.photos} />

        <StickyNav />
        {/* place, owner, description & amenities */}
        <div className="flex pb-6 border-b">
          {/* main content */}
          <div className="md:w-[60%]">
            {/* address */}
            <div className="my-4 py-2">
              <h1 className="text-2xl font-semibold">
                {room.type} in {room.address.governorate},{" "}
                {room.address.country}
              </h1>
              <span className="text-gray-700">
                {room.beds} {t("bed")}
                {(room.beds > 1 && locale == 'en') ? <>s</> : <></>}
                {" . "}
                {room.bathrooms} {t("bathroom")}
                {(room.bathrooms > 1 && locale == 'en')? <>s</> : <></>}
              </span>
            </div>

            {/* owner */}
            <div className="flex items-center my-6 pb-8 border-b">
              <Image
                src={owner}
                alt=""
                width="40"
                height="40"
                className="me-4 rounded-full  cursor-pointer"
                onClick={() => router.push(`user/${owner.id}`)}
              />
              <div className="text-base font-medium">
                {t("stay-with")} {room.owner.firstName}
              </div>
            </div>
            {/* description */}
            <div className="flex flex-col gap-4 my-6 pb-8 border-b">
              <h1 className="text-2xl font-semibold">{t("about")}</h1>
              <p className="text-base font-medium">{room.description}</p>
            </div>
            {/* amenities */}
            <div className="flex flex-col gap-4 my-6" id="amenities">
              <h1 className="text-2xl font-semibold mb-2">
                {t("offers")}
              </h1>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:ps-0 ps-4">
                {room.amenities.map((amenity) => (
                  <div className="flex gap-4 items-center" key={amenity._id}>
                    <AmenityIcon
                      svgString={amenity.icon}
                      className={"w-6 h-6"}
                    />
                    <span>{amenity.name}</span>
                  </div>
                ))}
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
                }).format(room.price)}
                <span className="text-base"> {t2("night")}</span>
              </div>
              <button className="bg-[#FF385C] text-white w-full text-lg rounded-[6px] py-2 my-2 ">
                {t("reserve")}
              </button>
            </div>
          </div>
        </div>
        {/* mobile reserve */}
        <div className="flex justify-between items-center md:hidden w-full border-t fixed bottom-0 start-0 end-0 px-8 py-2 bg-white z-20">
          <div className="flex items-center gap-1">
            <span>Rating:</span>
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: "0.5625rem",
                  width: "0.5625rem",
                  fill: "var(--linaria-theme_palette-hof)",
                }}
              >
                <path
                  fillRule="evenodd"
                  d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                />
              </svg>{" "}
              {<>4.87</> || review.rating}
            </span>
          </div>
          <button className="bg-[#FF385C] text-white w-fit text-base rounded-[6px] py-2 my-2 px-8">
            Reserve
          </button>
        </div>

        {/* reviews & location */}
        <div className="flex flex-col">
          {/* reviews */}
          <div className="border-b">
            <h1 className="text-2xl font-semibold mt-5" id="reviews">
              {t("reviews")}
            </h1>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-24 gap-y-8 py-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Review key={i} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pb-8" id="location">
            <h1 className="text-2xl font-semibold mt-5" id="reviews">
              {t("location")}
            </h1>

            <span className="text-gray-700">
              {room.address.street}, {room.address.city}, {room.address.country}
            </span>

            <StaticMap
              latitude={room.location.latitude}
              longitude={room.location.longitude}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Page;
