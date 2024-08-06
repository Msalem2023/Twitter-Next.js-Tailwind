"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Define types for user and context

interface User {
  token: string;
  user: {
    id: string;
    userName: string;
    profileImage: string;
  };
  // data: {
  //   id: string;
  //   userName: string;
  //   profileImage: string;
  // };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  data:User|null
}

// Initialize context with undefined to handle initialization later
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       if (token) {
  //         setUser({ token }); // Ensure user has the correct type
  //       } else {
  //         setUser(null);
  //       }
  //     } catch (error) {
  //       console.error('Failed to check authentication:', error);
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  const login = (userData: User) => {
    setUser(userData);
    // setData(userData);

    console.log(userData)
    localStorage.setItem('token', userData.token);
    // localStorage.setItem('id', userData.user.id);
    // localStorage.setItem('profileImage', userData.user.profileImage);
    // localStorage.setItem('userName', userData.user.userName);

    router.push('/');
  };

  const logout = () => {
    console.log("hi")
    setUser(null);
    localStorage.clear();
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
