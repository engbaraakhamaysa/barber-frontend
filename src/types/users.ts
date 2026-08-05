export type UserRole = "admin" | "barber" | "user";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
}

///////////////////////////////////////////
// CREATE USER
///////////////////////////////////////////

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

///////////////////////////////////////////
// UPDATE USER
///////////////////////////////////////////

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  is_active?: boolean;
}
