"use client"
import { useSearchParams } from "next/navigation";
import LisitingsFetch from "./_components/LisitingsFetch/LisitingsFetch";
export default function Home() {
  
  const category = useSearchParams().get('category')

  return (
    <>
      <div className="flex flex-wrap justify-around pt-4">
      <LisitingsFetch category={category}/>
      </div>
    </>
  );
}
