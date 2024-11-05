"use server"
import axios from "axios";
const api = process.env.NEXT_PUBLIC_API_URL
export const fetchCategories = async () => {
  try {
    const res = await axios.get(`${api}/category`);
    return {data:res.data,status:res.status};
  } catch (err) {
    console.log(err);
    return { status: err.status };
  }
};
