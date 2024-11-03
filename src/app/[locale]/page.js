import { getTranslations } from "next-intl/server";
import { fetchData } from "../_actions/Listing/fetchData";
import Container from "../_components/Container";
import ListingCard from "../_components/ListingCard";
import NavBar from "../_components/Navbar/NavBar";
import CategoryList from "../_components/category";
import Footer from "../_components/Footer/Footer";
export default async function Home({ searchParams }) {
  const t = await getTranslations('HomePage');
  const listings = searchParams['category'] ? await fetchData(`listing/verified?category=${searchParams['category']}`) : await fetchData(`listing/verified`)
  // console.log('listings', listings);
  try {
    if (listings['message'])
      console.log('');
  } catch {
    return (
      <div>
      <NavBar position={"sticky"}/>
      <Container>
        <CategoryList />
          <h1 className="h-96 pt-40 font-airbnb text-2xl text-center">{t('not-found')}</h1>
      </Container>
      <Footer position={"fixed"}/> 
      </div>
    )
  }
  return (
    <div>
      <NavBar position={"sticky"}/>
      <Container>
        <CategoryList />
        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {listings.map((listing, index) =>
            <ListingCard className="mb-4" key={index} listing={listing} />
          )}
        </div>
      </Container>
      <Footer position={"sticky"}/>
    </div>
  );
}
