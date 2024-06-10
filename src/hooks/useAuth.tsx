"use client";
import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    alert("useAuth must be used within an AuthProvider");
  }
  return context;
};
