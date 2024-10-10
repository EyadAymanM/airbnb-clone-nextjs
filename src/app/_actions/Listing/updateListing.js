'use server'
import axios from "axios";
export const updateListing = async (id, data) => {
    const newlisting = await axios.put(`http://localhost:3000/listing/${id}`, data)
    return newlisting.data
  }