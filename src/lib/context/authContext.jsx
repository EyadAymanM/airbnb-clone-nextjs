"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import { getSession } from "next-auth/react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      const session = await getSession();
      if (session?.user.token.access_token) {
        setToken(session?.user.token.access_token);
      }
    }
    fetchToken();
  }, []);
  return (
    <AuthContext.Provider value={token}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthToken() {
  return useContext(AuthContext);
}