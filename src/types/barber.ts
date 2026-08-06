///////////////////////////////////////////
// BARBER STATUS
// Define barber active state
///////////////////////////////////////////
export type BarberStatus = boolean;

///////////////////////////////////////////
// BARBER MODEL
// Represents barber data from backend
///////////////////////////////////////////
export interface Barber {
  id: number;
  user_id: number;
  shop_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

///////////////////////////////////////////
// BARBER WITH USER DATA
// Barber information with user details
///////////////////////////////////////////
export interface BarberWithUser extends Barber {
  name: string;
  email: string;
  role: "admin" | "barber" | "user";
}

///////////////////////////////////////////
// CREATE BARBER REQUEST
// Data required to create barber
///////////////////////////////////////////
export interface CreateBarberRequest {
  shop_id: number;
  name: string;
  email: string;
  password: string;
}

///////////////////////////////////////////
// UPDATE BARBER REQUEST
// Partial update fields
///////////////////////////////////////////
export interface UpdateBarberRequest {
  name?: string;
  email?: string;
  password?: string;
  is_active?: boolean;
}
