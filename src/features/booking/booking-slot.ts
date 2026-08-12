///////////////////////////////////////////
// BOOKING SLOT
// Represents an available time slot
// for a barber
///////////////////////////////////////////

export interface BookingSlot {
  id: number;
  barber_id: number;
  slot_time: Date;
  created_at: Date;
  updated_at: Date;
}

///////////////////////////////////////////
// CREATE BOOKING SLOT
///////////////////////////////////////////

export interface CreateBookingSlotRequest {
  barber_id: number;
  slot_time: Date;
}

///////////////////////////////////////////
// UPDATE BOOKING SLOT
///////////////////////////////////////////

export interface UpdateBookingSlotRequest {
  slot_time?: Date;
}
