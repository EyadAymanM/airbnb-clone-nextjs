'use server'
import axios from "axios";
const updateUser = async (data, token) => {
  const res = (await axios.patch(`http://localhost:3000/user/info`, data, { headers: { 'authorization': token } }))
  return res.data
}
export default updateUser