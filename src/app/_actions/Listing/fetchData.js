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