'use server'
const api = process.env.NEXT_PUBLIC_API_URL
export const createNewListing = async (token) => {
  try{
    const res = await fetch(`${api}/listing/user`,{
      method:'POST',
      headers:{
        'authorization': token
      }
    });
    const newListing = await res.json()
    return newListing
  }catch(err){
    console.log(err.message);
    return null
  }
};
