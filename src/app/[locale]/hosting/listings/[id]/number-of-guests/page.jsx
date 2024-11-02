"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatar1 from "/src/app/_assets/avatar/1.png";
import avatar2 from "/src/app/_assets/avatar/2.png";
import avatar3 from "/src/app/_assets/avatar/3.png";
import avatar4 from "/src/app/_assets/avatar/4.png";
import avatar5 from "/src/app/_assets/avatar/5.png";
import avatar6 from "/src/app/_assets/avatar/6.png";
import avatar7 from "/src/app/_assets/avatar/7.png";
import avatar8 from "/src/app/_assets/avatar/8.png";
import avatar9 from "/src/app/_assets/avatar/9.png";
import avatar10 from "/src/app/_assets/avatar/10.png";
import avatar11 from "/src/app/_assets/avatar/11.png";
import avatar12 from "/src/app/_assets/avatar/12.png";
import avatar13 from "/src/app/_assets/avatar/13.png";
import avatar14 from "/src/app/_assets/avatar/14.png";
import avatar15 from "/src/app/_assets/avatar/15.png";
import avatar16 from "/src/app/_assets/avatar/16.png";
import { fetchData } from "@/app/_actions/Listing/fetchData";
import { updateListing } from "@/app/_actions/Listing/updateListing"; 
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
const GuestSelector = ({ params: { id } }) => {
  const [guestCount, setGuestCount] = useState(1);
  const t = useTranslations('Listings');
  const maxGuests = 16;
  const images = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
    avatar11,
    avatar12,
    avatar13,
    avatar14,
    avatar15,
    avatar16,
  ];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchData(`listing/${id}`);
        setGuestCount(data.guests || 1); 
      } catch (error) {
        toast.error(t("fetch_error"));
      }
    };

    fetchInitialData();
  }, [id]);

  const increment = () => {
    if (guestCount < maxGuests) {
      setGuestCount((prevCount) => prevCount + 1);
    }
  };

  const decrement = () => {
    if (guestCount > 1) {
      setGuestCount((prevCount) => prevCount - 1);
    }
  };

  const onSubmit = async () => {
    try {
      const listing = await updateListing(id, { guests: guestCount });
      if (listing._id) {
        toast.success(t("guest-count-updated-successfully"));
      } else {
        toast.error(t("something-went-wrong"));
      }
    } catch (error) {
      toast.error(t("failed-to-update-the-guest-count"));
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            {images.slice(0, guestCount).map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Guest ${index + 1}`}
                width="50"
                height="80"
                className="rounded-full"
              />
            ))}
          </div>
          <p className="my-10 text-gray-700">
            {t("how-many-guests")}
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={decrement}
              className="text-2xl font-bold px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
              -
            </button>
            <span className="text-8xl font-bold">
              {guestCount === maxGuests ? "16+" : guestCount}
            </span>
            <button
              onClick={increment}
              className="text-2xl font-bold px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none disabled:opacity-10"
              disabled={guestCount === maxGuests}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <hr className="my-2 border-gray-400" />
      <div className="flex justify-end items-center">
        <Button
          className="bg-black text-white px-8 py-6 rounded-2xl hover:bg-gray-800 transition-colors"
          onClick={onSubmit}
        >
          {t("save")}
        </Button>
      </div>
    </>
  );
};

export default GuestSelector;