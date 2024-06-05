import { useState, useEffect } from "react";

function useRole() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    const handleStorageChange = () => {
      if (window.localStorage.getItem("role") !== role) {
        const newRole = localStorage.getItem("role");
        setRole(newRole);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return role;
}

export default useRole;