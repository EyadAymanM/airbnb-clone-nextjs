import LisitingsFetch from "./_components/LisitingsFetch/LisitingsFetch";
import CategoryList from "./_components/category";
export default function Home() {
  
  return (
    <>
      <CategoryList />
      <div className="flex flex-wrap justify-around pt-4">
        <LisitingsFetch />
      </div>
    </>
  );
}
