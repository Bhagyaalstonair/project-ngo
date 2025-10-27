import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'executive' | 'employee';
  avatar?: string;
  profileImage?: string;
  department?: string;
  position?: string;
  phone?: string;
  address?: string;
  organization?: string;
  experience?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, selectedRole: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'executive' | 'employee';
  phone: string;
  address: string;
  organization?: string;
  experience?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Store registered users in localStorage for demo purposes
const getStoredUsers = (): User[] => {
  const stored = localStorage.getItem('ngo_users');
  return stored ? JSON.parse(stored) : [];
};

const storeUsers = (users: User[]) => {
  localStorage.setItem('ngo_users', JSON.stringify(users));
};

// Store current logged-in user in localStorage
const getStoredUser = (): User | null => {
  const stored = localStorage.getItem('ngo_current_user');
  return stored ? JSON.parse(stored) : null;
};

const storeCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('ngo_current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('ngo_current_user');
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true to check for saved user

  // Initialize demo users if they don't exist
  const initializeDemoUsers = () => {
    const users = getStoredUsers();
    // Only initialize if no users exist at all
    if (users.length === 0) {
      const demoUsers: User[] = [
        {
          id: '1',
          name: 'NGO India',
          email: 'admin@ngoindia.org',
          role: 'admin',
          department: 'Program Management',
          position: 'Administrator',
          phone: '+91 98765 43210',
          address: 'Mumbai, Maharashtra',
          organization: 'NGO India',
          experience: '8 years in social work'
        },
        {
          id: '2',
          name: 'NGO India',
          email: 'executive@ngoindia.org',
          role: 'executive',
          department: 'Executive',
          position: 'Executive Director',
          phone: '+91 98765 43211',
          address: 'Delhi, NCR',
          organization: 'NGO India',
          experience: '12 years in NGO management'
        },
        {
          id: '3',
          name: 'NGO India',
          email: 'employee@ngoindia.org',
          role: 'employee',
          department: 'Field Operations',
          position: 'Employee',
          phone: '+91 98765 43212',
          address: 'Ahmedabad, Gujarat',
          organization: 'NGO India',
          experience: '3 years in field work'
        }
      ];
      storeUsers(demoUsers);
    }
  };

  // Check for saved user on app startup
  useEffect(() => {
    initializeDemoUsers();
    const savedUser = getStoredUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  // Define role-specific email validation
  const validateRoleEmail = (email: string, selectedRole: string): boolean => {
    const roleEmailMap: { [key: string]: string[] } = {
      'admin': ['admin@ngoindia.org'],
      'executive': ['executive@ngoindia.org'],
      'employee': ['employee@ngoindia.org']
      // Director role is excluded as requested
    };
    
    const allowedEmails = roleEmailMap[selectedRole.toLowerCase()];
    return allowedEmails ? allowedEmails.includes(email.toLowerCase()) : false;
  };

  const login = async (email: string, password: string, selectedRole: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // First validate if the email is allowed for the selected role
    if (!validateRoleEmail(email, selectedRole)) {
      setIsLoading(false);
      return false;
    }
    
    const users = getStoredUsers();
    const foundUser = users.find(u => u.email === email.toLowerCase() && u.role === selectedRole.toLowerCase());
    if (foundUser) {
      setUser(foundUser);
      storeCurrentUser(foundUser); // Save user to localStorage
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const users = getStoredUsers();
      
      // Check if user already exists
      if (users.find(u => u.email === userData.email)) {
        setIsLoading(false);
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.organization || 'NGO India',
        email: userData.email,
        role: userData.role,
        phone: userData.phone,
        address: userData.address,
        organization: userData.organization || 'NGO India',
        experience: userData.experience,
        department: userData.role === 'admin' ? 'Program Management' : 
                   userData.role === 'executive' ? 'Executive' : 'Field Operations',
        position: userData.role === 'admin' ? 'Administrator' : 
                 userData.role === 'executive' ? 'Executive Director' : 'Employee',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
      };
      
      const updatedUsers = [...users, newUser];
      storeUsers(updatedUsers);
      
      // Auto-login the new user
      setUser(newUser);
      storeCurrentUser(newUser); // Save new user to localStorage
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    storeCurrentUser(null); // Clear saved user from localStorage
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      storeCurrentUser(updatedUser);
      
      // Also update in the stored users array
      const users = getStoredUsers();
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        storeUsers(users);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}