import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthenticatedUser, UpdateProfileData } from '@/types/auth';

interface AuthState {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Load from localStorage
const loadFromLocalStorage = (): Partial<AuthState> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const user = localStorage.getItem('auth-user');
    const isAuthenticated = localStorage.getItem('auth-isAuthenticated');
    
    return {
      user: user ? JSON.parse(user) : null,
      isAuthenticated: isAuthenticated === 'true',
    };
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return {};
  }
};

const savedData = loadFromLocalStorage();

const initialState: AuthState = {
  user: (savedData.user as AuthenticatedUser) || null,
  isAuthenticated: savedData.isAuthenticated || false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthenticatedUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth-user', JSON.stringify(action.payload));
        localStorage.setItem('auth-isAuthenticated', 'true');
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-user');
        localStorage.removeItem('auth-isAuthenticated');
      }
    },
    updateProfile: (state, action: PayloadAction<UpdateProfileData>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
        
        // Update localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth-user', JSON.stringify(state.user));
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { login, logout, updateProfile, setLoading } = authSlice.actions;
export default authSlice.reducer;

