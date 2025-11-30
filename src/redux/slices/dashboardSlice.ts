import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Employee, FilterOptions, PaginationInfo, Task } from '@/types/dashboard';

interface DashboardState {
  employees: Employee[];
  tasks: Task[];
  filters: FilterOptions;
  pagination: PaginationInfo;
  selectedEmployees: string[];
  isLoading: boolean;
  sidebarOpen: boolean;
  modalOpen: {
    delete: boolean;
    add: boolean;
    edit: boolean;
  };
  selectedEmployee: Employee | null;
}

// Load from localStorage
const loadFromLocalStorage = (): Partial<DashboardState> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const employees = localStorage.getItem('dashboard-employees');
    const tasks = localStorage.getItem('dashboard-tasks');
    
    return {
      employees: employees ? JSON.parse(employees) : [],
      tasks: tasks ? JSON.parse(tasks) : [],
    };
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return {};
  }
};

const savedData = loadFromLocalStorage();

const initialState: DashboardState = {
  employees: (savedData.employees as Employee[]) || [],
  tasks: (savedData.tasks as Task[]) || [],
  filters: {
    status: 'all',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 0,
  },
  selectedEmployees: [],
  isLoading: false,
  sidebarOpen: false,
  modalOpen: {
    delete: false,
    add: false,
    edit: false,
  },
  selectedEmployee: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
      state.pagination.totalItems = action.payload.length;
      state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.itemsPerPage);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
      state.pagination.totalItems = state.employees.length;
      state.pagination.totalPages = Math.ceil(state.employees.length / state.pagination.itemsPerPage);
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
      state.pagination.totalItems = state.employees.length;
      state.pagination.totalPages = Math.ceil(state.employees.length / state.pagination.itemsPerPage);
    },
    deleteSelectedEmployees: (state) => {
      state.employees = state.employees.filter(emp => !state.selectedEmployees.includes(emp.id));
      state.selectedEmployees = [];
      state.pagination.totalItems = state.employees.length;
      state.pagination.totalPages = Math.ceil(state.employees.length / state.pagination.itemsPerPage);
    },
    toggleEmployeeSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedEmployees.includes(id)) {
        state.selectedEmployees = state.selectedEmployees.filter(empId => empId !== id);
      } else {
        state.selectedEmployees.push(id);
      }
    },
    selectAllEmployees: (state) => {
      state.selectedEmployees = state.employees.map(emp => emp.id);
    },
    deselectAllEmployees: (state) => {
      state.selectedEmployees = [];
    },
    setFilters: (state, action: PayloadAction<FilterOptions>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.totalPages = Math.ceil(state.employees.length / action.payload);
      state.pagination.currentPage = 1;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<'delete' | 'add' | 'edit'>) => {
      state.modalOpen[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<'delete' | 'add' | 'edit'>) => {
      state.modalOpen[action.payload] = false;
    },
    setSelectedEmployee: (state, action: PayloadAction<Employee | null>) => {
      state.selectedEmployee = action.payload;
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setEmployees,
  setTasks,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  deleteSelectedEmployees,
  toggleEmployeeSelection,
  selectAllEmployees,
  deselectAllEmployees,
  setFilters,
  setCurrentPage,
  setItemsPerPage,
  toggleSidebar,
  setSidebarOpen,
  openModal,
  closeModal,
  setSelectedEmployee,
  toggleTaskCompletion,
  setLoading,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

