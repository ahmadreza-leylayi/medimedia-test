// Dashboard Types

export interface Employee {
  id: string;
  name: string;
  phoneNumber: string;
  phoneNumber2?: string;
  position: string;
  city: string;
  province: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  avatar?: string;
}

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  pendingEmployees: number;
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  category: 'medical' | 'pharmacy' | 'hospital' | 'insurance' | 'management';
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ListColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface FilterOptions {
  status?: 'active' | 'inactive' | 'pending' | 'all';
  position?: string;
  city?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

