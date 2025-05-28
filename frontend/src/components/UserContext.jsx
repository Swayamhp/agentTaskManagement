import { createContext, useContext, useState } from "react";

// Create a Context object for user data
const UserContext = createContext();

// Provider component that wraps your app and makes user data available throughout
export const UserProvider = ({ children }) => {
  // State to hold the current user object (null if not logged in)
  const [user, setUser] = useState(null);

  // Logout function clears user state and removes user from localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    // Provide user state, setUser function, and logout function to children components
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context easily in any component
export const useUser = () => useContext(UserContext);
