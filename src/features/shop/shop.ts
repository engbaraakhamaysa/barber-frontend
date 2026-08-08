///////////////////////////////////////////
// SHOP STATUS
// Define shop active state
///////////////////////////////////////////
export type ShopStatus = boolean;

///////////////////////////////////////////
// SHOP MODEL
// Represents shop data from backend
///////////////////////////////////////////
export interface Shop {
  id: number;
  name: string;
  location: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

///////////////////////////////////////////
// CREATE SHOP REQUEST
// Data required to create new shop
///////////////////////////////////////////
export interface CreateShopRequest {
  name: string;
  location: string;
}

///////////////////////////////////////////
// UPDATE SHOP REQUEST
// Partial update fields
///////////////////////////////////////////
export interface UpdateShopRequest {
  name?: string;
  location?: string;
  is_active?: boolean;
}
