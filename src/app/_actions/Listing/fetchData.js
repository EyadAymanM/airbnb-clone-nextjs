'use server'
import axios from "axios";
export const fetchData = async (path) => {
  const res = await axios.get(`http://localhost:3000/${path}`)
  return res.data
}