export interface Customer {
  id: number;

  user_id: number | null;

  name: string;

  phone: string | null;

  created_at: string;

  updated_at: string;
}

export interface CreateCustomerRequest {
  user_id?: number | null;

  name?: string;

  phone?: string | null;
}

export interface UpdateCustomerRequest {
  name?: string;

  phone?: string | null;
}
