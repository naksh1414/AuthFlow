"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { authApi } from "@/services/api";
import { toast } from "sonner";
interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const saveUserToLocalStorage = (user: User) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
};

const getUserFromLocalStorage = (): User | null => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting user from localStorage:", error);
    return null;
  }
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() =>
    getUserFromLocalStorage()
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (user) {
      saveUserToLocalStorage(user);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = getUserFromLocalStorage();

      if (!token || !storedUser) {
        console.log("No token or user found");
      }
      // Only verify the token
      await authApi.verifyToken();
      // If verification successful, use stored user data
      setUser(storedUser);
      toast.success("Session restored successfully");
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error verifying token:", error.message);
      }
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      const userData = response.data?.user || response.user;
      if (userData) {
        setUser(userData);
        saveUserToLocalStorage(userData);
        toast.success("Login successful");
      }
      return response;
    } catch (error) {
      toast.error("Login failed");
      throw error;
    }
  };

  const register = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    try {
      const response = await authApi.register(data);
      const userData = response.data?.user || response.user;
      if (userData) {
        setUser(userData);
        saveUserToLocalStorage(userData);
        toast.success("Registration successful");
      }
      return response;
    } catch (error) {
      toast.error("Registeration failed");
      throw error;
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
    toast.success("Logout successful");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
