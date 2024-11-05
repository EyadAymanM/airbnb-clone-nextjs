import axiosInstance from '@/lib/axiosInstance';
import { revalidatePath } from 'next/cache';
const api = process.env.NEXT_PUBLIC_API_URL

export const fetchWishlists = async () => {
  try {
    const response = await axiosInstance.get('/wishlist');
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in.");
    }
  }
};

export const createWishlists = async (values) => {
  try {
    const response = await axiosInstance.post('/wishlist', values);
    return response.data;
  } catch (error) {
    console.error("Error creating wishlist:", error);
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in.");
    }
  }
};

export const removeWishlist = async (id) => {
  try {
    const response = await axiosInstance.delete(`/wishlist/${id}`);
    revalidatePath('/wishlists');
    return response.data;
  } catch (error) {
    console.error("Error removing wishlist:", error);
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in.");
    }
  }
};

export const addToWishlist = async (wishlistId, listingId) => {
  try {
    const response = await axiosInstance.put(
      `/wishlist/add`,
      { wishlistId, listingId }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding listing to wishlist:', error);
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in.");
    }
  }
};

export const getWishlistById = async (wishlistId) => {
  try {
    const response = await axiosInstance.get(`/wishlist/${wishlistId}`);
    return response.data.listing;
  } catch (error) {
    console.error(`Error retrieving wishlist with ID: ${wishlistId}`, error);
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in.");
    }
  }
};

export const getAllFavoriteListingIds = async () => {
  try {
    const response = await axiosInstance.get(`/wishlist/favorite/get`);
    return response.data.listingIds;
  } catch (error) {
    console.error("Error retrieving listing IDs:", error);
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in.");
    }
  }
};

export const removeFromWishlist = async (listingId) => {
  try {
    const response = await axiosInstance.delete(`/wishlist/favorite/remove/${listingId}`);
    return response.data;
  } catch (error) {
    console.error(`Error removing listing from wishlist: ${listingId}`, error);
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please log in.");
    }
  }
};
