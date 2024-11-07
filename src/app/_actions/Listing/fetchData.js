'use server'
import axios from "axios";
const api = process.env.NEXT_PUBLIC_API_URL
export const fetchData = async (path) => {
  try{
    const res = await axios.get(`${api}/${path}`)
    return res.data
  }catch(err){
    console.log(err);
  }
}

export const getListingByUser = async (token) => {
  try {
    const response = await axios.get(`${api}/listing/hosting/listings`, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.error("Failed to fetch listings:", error);
  }
}