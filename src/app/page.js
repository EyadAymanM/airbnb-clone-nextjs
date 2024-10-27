import { fetchData } from "./_actions/Listing/fetchData";
import Container from "./_components/Container";
import ListingCard from "./_components/ListingCard";
import NavBar from "./_components/Navbar/NavBar";
import CategoryList from "./_components/category";
export default async function Home({ searchParams }) {

  const listings = searchParams['category'] ? await fetchData(`listing/verified?category=${searchParams['category']}`) : await fetchData(`listing/verified`)
  try {
    if (listings['message'])
      console.log('');
  } catch {
    return (
      <>
      <NavBar />
      <Container>
        <CategoryList />
        <h1 className="font-airbnb text-2xl text-center">No listing in available in this category</h1>
      </Container>
      </>
    )
  }
  return (
    <>
      <NavBar />
      <Container>
        <CategoryList />
        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {listings.map((listing, index) =>
            <ListingCard className="mb-4" key={index} listing={listing} />
          )}
        </div>
      </Container>
    </>
  );
}
