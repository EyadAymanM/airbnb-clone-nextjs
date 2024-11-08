'use server'
import axios from "axios";
const api = process.env.NEXT_PUBLIC_API_URL
const updateUser = async (data, token) => {
  const res = (await axios.patch(`${api}/user/info`, data, { headers: { 'authorization': token } }))
  return res.data
}
export default updateUser