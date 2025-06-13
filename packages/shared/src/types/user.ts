import { z } from 'zod';

// Note: These types are now exported from the schema file
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  
  // Employment info
  hireDate: Date;
  terminationDate?: Date;
  currentManagerId?: string;
  
  // Notification preferences
  emailNotificationsEnabled: boolean;
  notificationFrequency: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  organizationId: string;
}

interface UserWithRelations extends User {
  manager?: User;
  directReports?: User[];
  department?: { id: string; name: string };
  team?: { id: string; name: string };
}

// Request/Response types
interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  hireDate: Date;
  currentManagerId?: string;
  departmentId?: string;
  teamId?: string;
  organizationId: string;
}

interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  role?: string;
  status?: string;
  currentManagerId?: string;
  departmentId?: string;
  teamId?: string;
  emailNotificationsEnabled?: boolean;
  notificationFrequency?: string;
}

interface UserResponse extends User {
  manager?: User;
  department?: { id: string; name: string };
  team?: { id: string; name: string };
} 