'use server'
import axios from "axios";
const api = process.env.NEXT_PUBLIC_API_URL
export const submitReview = async (data,token)=>{
  try{
    const review = await axios.post(`${api}/review/add`,data,{
      headers: { 'Authorization': token },
    })
    return review.status
  }catch(err){
    console.log(err.response);
    return err.status
  }
}