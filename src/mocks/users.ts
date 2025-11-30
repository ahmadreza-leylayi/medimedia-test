import type { User } from '@/types/auth';

// Sample user for employer (username: admin, password: admin123)
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    firstName: 'مدیر',
    lastName: 'سیستم',
    email: 'admin@medimedia.com',
    phone: '09123456789',
    createdAt: new Date().toISOString(),
  },
];

// Load users from localStorage or use default
export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return mockUsers;
  
  try {
    const stored = localStorage.getItem('mock-users');
    if (stored) {
      return JSON.parse(stored);
    }
    // Save initial users
    localStorage.setItem('mock-users', JSON.stringify(mockUsers));
    return mockUsers;
  } catch (error) {
    console.error('Error loading users:', error);
    return mockUsers;
  }
};

// Add new user
export const addUser = (user: User): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('mock-users', JSON.stringify(users));
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

// Find user by username
export const findUserByUsername = (username: string): User | undefined => {
  const users = getUsers();
  return users.find(u => u.username === username);
};

// Find user by id
export const findUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find(u => u.id === id);
};

// Update user
export const updateUser = (userId: string, updates: Partial<User>): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        ...updates,
      };
      localStorage.setItem('mock-users', JSON.stringify(users));
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Validate login
export const validateLogin = (username: string, password: string): User | null => {
  const user = findUserByUsername(username);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

