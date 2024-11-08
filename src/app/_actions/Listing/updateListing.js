'use server'
import axios from "axios";
const api = process.env.NEXT_PUBLIC_API_URL
export const updateListing = async (id, data) => {
  try {
    const newlisting = await axios.put(`${api}/listing/${id}`, data)
    return newlisting.data
  } catch (err){
    console.log(err);
    return err.message
  }
}