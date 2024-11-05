'use server'
import { redirect } from "@/i18n/routing";
const api = process.env.NEXT_PUBLIC_API_URL
export const createNewListing = async (token) => {
  const res = await fetch(`${api}/listing/user`,{
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
