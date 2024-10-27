"use server"
import axios from "axios";
import { revalidatePath } from 'next/cache';

const API_BASE_URL = "http://localhost:3000/wishlist";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDU1MzA2MDQ4ZWFhY2FlMmFkNmE3NiIsImZpcnN0TmFtZSI6Im1vc3RhZmEiLCJlbWFpbCI6ImZheWVkbW9zdGFmYUBnbWFpbC5jb20iLCJpYXQiOjE3Mjk1MDIzODksImV4cCI6MTcyOTU0NTU4OX0.wAZGCP0K4Y33L5-w0-8sBIAzmK7z7acDW_dSfTz-n3Q`;

const authHeader = {
  headers: {
    'Authorization':token
  }
};

export const fetchWishlists = async () => {
  try {
    const response = await axios.get(API_BASE_URL, authHeader);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlists:", error);
  }
};

export const createWishlists = async (values) => {
  try {
    const response = await axios.post(API_BASE_URL, values, authHeader);
    return response.data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
  }
};

export const removeWishlist = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, authHeader);
    revalidatePath('/wishlists')
    return response.data;
  } catch (error) {
    console.error("Error removing wishlist:", error);
  }
};

export const addToWishlist = async (wishlistId, listingId) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/add`,
      { wishlistId, listingId },
      authHeader
    );
    revalidatePath('/')
    return response.data;
  } catch (error) {
    console.error('Error adding listing to wishlist:', error);
  }
};

export const getWishlistById = async (wishlistId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${wishlistId}`, authHeader);
    return response.data.listing;
  } catch (error) {
      throw new Error(`Error retrieving wishlist with ID: ${wishlistId}`);
    }
}

export const getAllFavoriteListingIds = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/favorite/get`, authHeader);
    return response.data.listingIds;
  } catch (error) {
    throw new Error(`Error retrieving listing IDs: ${error.message}`);
  }
};

export const removeFromWishlist = async (listingId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/favorite/remove/${listingId}`, authHeader );
    return response.data;
  } catch (error) {
    throw new Error(`Error removing listing from wishlist: ${error.message}`);
  }
};