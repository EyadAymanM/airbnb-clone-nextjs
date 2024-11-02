"use server";
import axios from "axios";

export const fetchData = async (path) => {
  try {
    const res = await axios.get(`http://localhost:3000/${path}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteData = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3000/book/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete the trip");
  }
};

export const addReservation = async (token, data) => {
  console.log(data);
  try {
    const res = await axios.post("http://localhost:3000/book", data, {
      headers: { 'Authorization': token },
    });
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};