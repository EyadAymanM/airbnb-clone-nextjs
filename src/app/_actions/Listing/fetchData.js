'use server'
import axios from "axios";
export const fetchData = async (path) => {
  try{
    const res = await axios.get(`http://localhost:3000/${path}`)
    return res.data
  }catch(err){
    console.log(err);
  }
}