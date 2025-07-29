import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: 'owner' | 'renter' | 'admin';
  name: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: string) => Promise<void>;
  signup: (email: string, password: string, role?: string, name?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  isOwner: boolean;
  isRenter: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('quickcowork_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'owner' | 'renter' | 'admin' = 'renter') => {
    setLoading(true);
    
    // Mock login - in real app, this would be an API call
    setTimeout(() => {
      const mockUser: User = {
        id: '1',
        email,
        role,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      
      setUser(mockUser);
      localStorage.setItem('quickcowork_user', JSON.stringify(mockUser));
      setLoading(false);
      console.log('Login successful:', mockUser);
    }, 1000);
  };

  const signup = async (email: string, password: string, role: 'owner' | 'renter' | 'admin' = 'renter', name?: string) => {
    setLoading(true);
    
    // Mock signup - in real app, this would be an API call
    setTimeout(() => {
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        role,
        name: name || email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      
      setUser(mockUser);
      localStorage.setItem('quickcowork_user', JSON.stringify(mockUser));
      setLoading(false);
      console.log('Signup successful:', mockUser);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quickcowork_user');
    console.log('Logout successful');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
    isOwner: user?.role === 'owner',
    isRenter: user?.role === 'renter',
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};