"use server";
import axios from "axios";
const api = process.env.NEXT_PUBLIC_API_URL
export const fetchData = async (path) => {
  try {
    const res = await axios.get(`${api}/${path}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUserTrips = async (path, token) => {
  try {
    const res = await axios.get(`${api}/${path}`,{
      headers:{
        "Authorization" : token
      }
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteData = async (id) => {
  try {
    const res = await axios.delete(`${api}/book/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete the trip");
  }
};

export const addReservation = async (token, data) => {
  console.log(data);
  try {
    const res = await axios.post(`${api}/book`, data, {
      headers: { 'Authorization': token },
    });
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};