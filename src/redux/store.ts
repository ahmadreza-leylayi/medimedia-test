import { configureStore, Middleware } from '@reduxjs/toolkit';
import exampleReducer from './slices/exampleSlice';
import dashboardReducer from './slices/dashboardSlice';
import authReducer from './slices/authSlice';

// Middleware to save to localStorage
const localStorageMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);
  
  // Save employees and tasks to localStorage after relevant actions
  if (
    action.type?.startsWith('dashboard/') &&
    (
      action.type.includes('setEmployees') ||
      action.type.includes('addEmployee') ||
      action.type.includes('updateEmployee') ||
      action.type.includes('deleteEmployee') ||
      action.type.includes('deleteSelectedEmployees') ||
      action.type.includes('setTasks') ||
      action.type.includes('toggleTaskCompletion')
    )
  ) {
    const state = store.getState();
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('dashboard-employees', JSON.stringify(state.dashboard.employees));
        localStorage.setItem('dashboard-tasks', JSON.stringify(state.dashboard.tasks));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
  
  return result;
};

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    dashboard: dashboardReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

