"use server"
// import axiosInstance from '@/lib/axiosInstance';
import axios from 'axios';
// import { revalidatePath } from 'next/cache';

const api = process.env.NEXT_PUBLIC_API_URL

export const fetchWishlists = async (token) => {
  try {
    const response = await axios.get(`${api}/wishlist`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // throw new Error("Unauthorized. Please log in.");
    }
  }
};

export const createWishlists = async (values, token) => {
  try {
    const response = await axios.post(`${api}/wishlist`, values, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // throw new Error("Unauthorized. Please log in.");
    }
  }
};

export const removeWishlist = async (id, token) => {
  try {
    const response = await axios.delete(`${api}/wishlist/${id}`,{
      headers: { Authorization: token },
    });
    revalidatePath('/wishlists');
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // throw new Error("Unauthorized. Please log in.");
    }
  }
};

export const addToWishlist = async (wishlistId, listingId,token) => {
  try {
    const response = await axios.put(
      `${api}/wishlist/add`,
      { wishlistId, listingId },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // throw new Error("Unauthorized. Please log in.");
    }
  }
};

export const getWishlistById = async (wishlistId,token) => {
  try {
    const response = await axios.get(`${api}/wishlist/${wishlistId}`,{
      headers: { Authorization: token },
    });
    return response.data.listing;
  } catch (error) {
    if (error.response?.status === 401) {
      // throw new Error("Unauthorized. Please log in.");
    }
  }
};

export const getAllFavoriteListingIds = async (token) => {
  try {
    const response = await axios.get(`${api}/wishlist/favorite/get`,{
      headers: { Authorization: token },
    });
    return response.data.listingIds;
  } catch (error) {
    if (error.response?.status === 401) {
      // throw new Error("Unauthorized. Please log in.");
    }
  }
};

export const removeFromWishlist = async (listingId, token) => {
  try {
    const response = await axios.delete(`${api}/wishlist/favorite/remove/${listingId}`,{headers: { Authorization: token },});
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // throw new Error("Unauthorized. Please log in.");
    }
  }
};

