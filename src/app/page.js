import CategoryList from "./_components/Category";
import ListingCard from "./_components/ListingCard";

export default function Home() {
  return (
    <>
    <CategoryList/>
    <div className="flex flex-wrap justify-around">
        {Array.from({ length: 20 }).map((_, index) =>
          <ListingCard className="mb-4" key={index} />
        )}
    </div>
    </>
  );
}
