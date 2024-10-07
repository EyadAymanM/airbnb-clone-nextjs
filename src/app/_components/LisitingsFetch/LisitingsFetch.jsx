import { fetchData } from "@/app/_actions/Listing/getListings";
import FilterListing from "../FilterListing/FilterListing";
import { Suspense } from "react";
import Skeleton from "../Skeleton";

export default async function LisitingsFetch({ category }) {


  let listings = await fetchData()

  // if (category && !(category == "ALL")) {
  //     listings = listings.filter((listing) => listing.category == category)
  // }

  return (
    <>
      <Suspense fallback={<>{Array.from({ length: 12 }).map((_, index) => (<Skeleton key={index} />))}</>}>
        <FilterListing listings={listings} />
      </Suspense>
    </>
  )
}