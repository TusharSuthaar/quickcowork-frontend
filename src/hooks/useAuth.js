import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('quickcowork_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role = 'renter') => {
    setLoading(true);
    
    // Mock login - in real app, this would be an API call
    setTimeout(() => {
      const mockUser = {
        id: '1',
        email,
        role, // 'owner', 'renter', 'admin'
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      
      setUser(mockUser);
      localStorage.setItem('quickcowork_user', JSON.stringify(mockUser));
      setLoading(false);
      console.log('Login successful:', mockUser);
    }, 1000);
  };

  const signup = async (email, password, role = 'renter', name) => {
    setLoading(true);
    
    // Mock signup - in real app, this would be an API call
    setTimeout(() => {
      const mockUser = {
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