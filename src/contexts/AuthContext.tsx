"use client";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import AuthService from "@/services/AuthService";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  role: string;
  login: (role: string) => void;
  logout: () => void;
  authInstance: AuthService;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const authInstance = AuthService.getInstance();
  const [role, setRole] = useState<string>(authInstance.getRole());

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(authInstance.getRole());
    };

    if (typeof window !== "undefined") {
      setRole(authInstance.getRole());
      window.addEventListener("storage", handleStorageChange);
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (role: string) => {
    authInstance.login(role);
    setRole(role);
  };

  const logout = () => {
    authInstance.logout();
    setRole("Khach");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, authInstance }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
