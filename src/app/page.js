import CategoryList from "./_components/Category";
import ListingCard from "./_components/ListingCard";

export default function Home() {
  return (
    <>
      <div className="flex flex-wrap justify-around pt-4">
        {Array.from({ length: 20 }).map((_, index) =>
          <ListingCard className="mb-4" key={index} />
        )}
      </div>
    </>
  );
}
