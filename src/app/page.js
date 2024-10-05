import Container from "./_components/Container";
import LisitingsFetch from "./_components/LisitingsFetch/LisitingsFetch";
import CategoryList from "./_components/category";
export default function Home() {
  
  return (
    <Container>
      <CategoryList />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <LisitingsFetch />
      </div>
    </Container>
  );
}
