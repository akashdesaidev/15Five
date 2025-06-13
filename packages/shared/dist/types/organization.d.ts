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
