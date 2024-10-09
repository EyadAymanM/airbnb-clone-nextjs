'use server'
import axios from "axios";
import { cookies } from 'next/headers';

export const login = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', userData);
    const { access_token } = response.data;
    
    cookies().set('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development',
      maxAge: 3600 
    });

    console.log("Access token set in cookie");
    return response.data.error ? response.data.message : response.data;
  } catch (error) {
    return error.response?.data.message;
  }
};

export const signUp = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/register', userData);
    const { access_token } = response.data;
    
    cookies().set('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development',
      maxAge: 3600
    });
    console.log("Access token set in cookie after signup");
    return response.data;
  } catch (error) {
    console.error("Error creating new user:", error);
    throw error;
  }
};

