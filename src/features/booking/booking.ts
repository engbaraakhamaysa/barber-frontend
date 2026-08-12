export type BookingStatus = "confirmed" | "completed" | "cancelled" | "no_show";

///////////////////////////////////////////
// BOOKING
///////////////////////////////////////////

export interface Booking {
  id: number;
  customer_id: number;
  slot_id: number;
  status: BookingStatus;
  created_at: Date;
  updated_at: Date;
}

///////////////////////////////////////////
// CREATE BOOKING
///////////////////////////////////////////

export interface CreateBookingRequest {
  customer_id: number;
  slot_id: number;
}

///////////////////////////////////////////
// UPDATE BOOKING
///////////////////////////////////////////

export interface UpdateBookingRequest {
  status?: BookingStatus;
}

///////////////////////////////////////////
// BOOKING WITH DETAILS
///////////////////////////////////////////

export interface BookingWithDetails extends Booking {
  customer_name: string;
  customer_phone: string | null;
  barber_name: string;
  slot_time: Date;
}
