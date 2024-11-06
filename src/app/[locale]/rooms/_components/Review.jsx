import Image from "next/image";
import t from "../../../_assets/camera.jpg";
import { useEffect, useState } from "react";
import { getListingReviews } from "@/app/_actions/review/submitReview";
import { useLocale } from "next-intl";

function Review({id}) {
  const locale = useLocale()
  const [reviews,setReviews] = useState([])
  useEffect(()=>{
    const getReviews = async ()=>{
      const res = await getListingReviews(id)
      if(typeof res == "number")
        return null
      setReviews(res)
    }
    getReviews()
  },[id])
  return (
    <>
      {(reviews.length>0)?
        reviews.map(review=>(
          <div key={review.id} className="flex flex-col gap-1">
            <div className="flex items-center">
              <Image
                src={review.reviewerId?.image}
                alt=""
                width="48"
                height="48"
                className="me-4 rounded-full  cursor-pointer"
              />
              <div className="flex flex-col">
                <div className="text-base font-medium">
                  {review.reviewerId?.firstName}
                </div>
                <div className="text-sm text-[#555]">
                  {<>
                      <>{review.reviewerId?.address.country} </>
                      <> {review.reviewerId?.address.city}</>
                  </>
                  }
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex">
                {Array.from({ length: 5 }).map((_,index) => {
                  if (index < review.rating)
                    return (
                      <svg
                        key={index}
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
                      </svg>
                    );
                  else
                    return (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style={{
                          display: "block",
                          height: "0.5625rem",
                          width: "0.5625rem",
                          fill: "#CCC",
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                        />
                      </svg>
                    );
                })}
              </span>
              <span>.</span>
              <span className="text-sm">
                {(new Date(review.reviewDate)).toLocaleDateString(locale, { day: "2-digit", month: "short" })}
              </span>
            </div>
            <p className="md:text-[16px] text-[14px] my-1">
              {review.comment ||
              <>
              When we arrived Sarah welcomed us into her beautiful apartment and we
              immediately felt right at home. She was quick to provide local
              recommendations and helpful tips for the neighborhood. The flat is
              conveniently located to public transit, great restaurants and hip
              cafes in Dalston. Our private room was exactly as described and
              provided a peaceful respite from the bustling neighborhood. I would
              recommend this flat to anyone and hope to visit again next time I&#39;m in
              London!
              </>}
            </p>
          </div>
        ))
      :<div className="font-airbnb">No reviews added on this listing...</div>}
    </>
  );
}
export default Review;
