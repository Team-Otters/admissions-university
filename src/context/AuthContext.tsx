"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState("Khach");
  const router = useRouter();

  useEffect(() => {
    const loadToken = () => {
      const role = localStorage.getItem("role");
      setRole(role);
    };

    window.addEventListener("storage", loadToken);

    loadToken();

    return () => {
      window.removeEventListener("storage", loadToken);
    };
  }, []);

  const login = (token) => {
    console.log("login", token);
    localStorage.setItem("role", token);
    setRole(token);
  };

  const logout = () => {
    localStorage.setItem("role", "Khach");
    console.log("logout", "Khach");
    setRole("Khach");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("[logging out]");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
