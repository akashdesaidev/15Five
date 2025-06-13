// Note: These types are now exported from the schema file
interface Organization {
  id: string;
  name: string;
  timezone: string;
  fiscalYearStartMonth: number; // 1-12
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface Department {
  id: string;
  name: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface Team {
  id: string;
  name: string;
  departmentId: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface OrganizationCreateInput {
  name: string;
}

export interface DepartmentCreateInput {
  name: string;
  organizationId: string;
}

export interface TeamCreateInput {
  name: string;
  departmentId: string;
}

export interface OrganizationUpdateInput {
  name?: string;
}

export interface DepartmentUpdateInput {
  name?: string;
}

export interface TeamUpdateInput {
  name?: string;
  departmentId?: string;
}

// Request/Response types
interface CreateOrganizationRequest {
  name: string;
  timezone: string;
  fiscalYearStartMonth: number;
}

interface UpdateOrganizationRequest {
  name?: string;
  timezone?: string;
  fiscalYearStartMonth?: number;
}

interface CreateDepartmentRequest {
  name: string;
  organizationId: string;
}

interface UpdateDepartmentRequest {
  name?: string;
}

interface CreateTeamRequest {
  name: string;
  departmentId: string;
  organizationId: string;
}

interface UpdateTeamRequest {
  name?: string;
  departmentId?: string;
}

// Response types with relations
interface DepartmentWithTeams extends Department {
  teams: Team[];
}

interface OrganizationWithStructure extends Organization {
  departments: DepartmentWithTeams[];
} 