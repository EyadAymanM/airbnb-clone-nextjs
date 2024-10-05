import { fetchData } from "@/app/_actions/getListings";
import ListingCard from "../ListingCard";

export default async function LisitingsFetch({ category }) {

  
  let listings = await fetchData()

  if (category && !(category == "ALL")) {
      listings = listings.filter((listing) => listing.category == category)
  }

  return (
    <>
      {listings.map((listing, index) =>
        <ListingCard className="mb-4" key={index} listing={listing} />
      )}
    </>
  )
}