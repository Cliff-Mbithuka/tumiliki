import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:1234/api/auth/me", {
          withCredentials: true, 
          headers: { "Cache-Control": "no-cache" } 
        });
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data)); 
      } catch {
        setUser(null);
        localStorage.removeItem("user");
      }
    };
  
    fetchUser();
  
    // Re-fetch user every time they return to the page
    window.addEventListener("focus", fetchUser);
    return () => window.removeEventListener("focus", fetchUser);
  }, []);
  

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = async () => {
    try {
      await axios.post("http://localhost:1234/api/auth/logout", {}, { withCredentials: true });
  
      setUser(null);
      localStorage.removeItem("user");
  
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 100);
    } catch (error) {
      console.error("Logout failed", error.response?.data || error.message);
    }
  };
  
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
