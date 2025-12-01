export interface Appointment {
  id: string;
  name: string;
  time: string;
  status: 'active' | 'pending' | 'inactive' | 'completed' | 'cancelled';
  date: string; // Format: YYYY-MM-DD
}

