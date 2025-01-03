import { submitReview } from "@/app/_actions/review/submitReview";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiStar } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";

export function ReviewComponent({ title, city, trip }) {
  const t = useTranslations("Review")
  const locale = useLocale()
  const { data: session, status } = useSession()
  const [stars, setStarts] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const ratingData = [
    { label: "Poor",labelar:"سيء جدا", color: "#E74C3C" },
    { label: "Bad",labelar:"سيء", color: "#E59866" },
    { label: "Okay",labelar:"جيد", color: "#F7DC6F" },
    { label: "Good",labelar:"جيد جدا", color: "#76D7C4" },
    { label: "Great",labelar:"ممتاز", color: "#229954" },
  ];

  const handleSubmit = async () => {
    if (stars > 0 && comment.length > 0) {
      const res = await submitReview({
        listingId: trip.listingId._id,
        reservationsId: trip._id,
        rating: stars,
        comment: comment,
      }, session.user.token.access_token)
      if(res == 201)
        setSubmitted(true)   
    }else{
      toast(t("toast"))
    }
  }
  if (submitted)
    return (
      <div className="h-40 flex flex-col justify-center items-center">
        <IoCheckmarkCircle fill="green" className="w-full h-full" />
        <span className="font-airbnb text-2xl font-semibold">{t("success")}</span>
      </div>
    )
  return (
    <div className="w-full flex flex-col gap-2 font-airbnb">
      <div className="flex bg-white items-center justify-around w-full border rounded-md  p-2">
        <div className="p-2 text-base font-semibold">
          {title} <br /><span className="text-gray-400 text-sm">({city})</span>
        </div>
        <div className="flex gap-2 p-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex justify-center">
              <FiStar
                size={25}
                strokeWidth={0}
                fill={index + 1 <= stars ? "gold" : "#D6DBDF"}
                cursor="pointer"
                className="star"
                onClick={() => setStarts(index + 1)}
              />
            </div>
          ))}
        </div>
        {stars > 0 ? (
          <div
            className="font-semibold min-w-[60px] p-2"
            style={{ color: ratingData[stars - 1]?.color }}>
            {locale == "ar" ? ratingData[stars - 1]?.labelar : ratingData[stars - 1]?.label}
          </div>
        ) : (
          <p className="font-semibold text-gray-400">{locale == "ar"? "لم يتم الاختيار":"None"}</p>
        )}
      </div>
      <label htmlFor="comment" className="font-semibold">{locale == "ar" ? "أضف تعليقاً" : "Add a comment"}</label>
      <textarea
        placeholder={t("placeholder")}
        name="comment"
        id="comment"
        rows="4"
        minLength={1}
        maxLength={500}
        className="w-full rounded-[8px] text-base p-2 border-2"
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button
        onClick={handleSubmit}
        className="w-fit px-6 py-2 rounded-lg bg-[#E51D53] hover:bg-[#D11146] text-white self-end mt-4"
      >
        {t("submit")}
      </button>
    </div>

  );
}