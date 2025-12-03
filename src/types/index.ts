// TypeScript Interfaces & Types
// Project, TimeBox, TimeLog, etc.

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  hourlyRate: number; // $ per hour
  totalHours: number;
  totalValue: number; // Calculated: totalHours * hourlyRate
}

export interface TimeBox {
  id: string;
  name: string;
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  color: string;
  opacity: number;
  recurrence: 'everyday' | 'workdays' | 'custom';
  customDays?: number[]; // 0-6 (Sunday-Saturday) for custom recurrence
}

export interface TimeLog {
  id: string;
  projectId: string;
  date: string; // ISO date string
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  duration: number; // hours
  value: number; // Calculated: duration * project.hourlyRate
  isCompleted: boolean; // Whether the time slot is marked as done
}
