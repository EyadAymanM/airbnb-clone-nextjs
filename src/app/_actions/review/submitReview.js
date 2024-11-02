'use server'
import axios from "axios";
export const submitReview = async (data,token)=>{
  try{
    const review = await axios.post(`http://localhost:3000/review/add`,data,{
      headers: { 'Authorization': token },
    })
    return review.status
  }catch(err){
    console.log(err.response);
    return err.status
  }
}