'use server'
import { redirect } from "next/navigation";

export const createNewListing = async (token) => {
  const res = await fetch("http://localhost:3000/listing/user",{
    method:'POST',
    headers:{
      'authorization': token
    }
  });
  const newListing = await res.json()
  if (newListing){
    redirect(`/become-a-host/${newListing._id}/category`)
  }
};
