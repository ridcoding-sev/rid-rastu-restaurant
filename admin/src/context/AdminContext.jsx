import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {

  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const value = {
    token,
    setToken,
    role,
    setRole,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;