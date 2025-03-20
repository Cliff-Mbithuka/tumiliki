// import { createContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Load user from localStorage on page reload
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   // Login function
//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   // Logout function
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("http://localhost:1234/api/auth/me", { withCredentials: true });
//         setUser(res.data);
//       } catch {
//         setUser(null);
//       }
//     };

//     fetchUser();
//   }, []);

//   const logout = () => {
//     setUser(null);
//     window.location.href = "/sign-in";
//   };

//   return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
// };

// export default AuthContext;
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:1234/api/auth/me", {
          withCredentials: true, // Ensures cookies are sent
        });
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data)); // Store user info
      } catch {
        setUser(null);
        localStorage.removeItem("user"); // Remove stale user data
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = "/sign-in";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
