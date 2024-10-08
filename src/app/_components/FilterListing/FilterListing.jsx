'use client'
import ListingCard from "../ListingCard"
import { useSearchParams } from "next/navigation"
export default function FilterListing({listings}) {
  const search = useSearchParams()
  const category = search.get('category')
  if (category && !(category == "ALL")) {
    listings = listings.filter((listing) => listing.category == category)
  }
  return (
    <>
      {/* {listings.map((listing, index) =>
        <ListingCard className="mb-4" key={index} listing={listing} />
      )} */}
    </>
  )
}