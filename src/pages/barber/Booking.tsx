import { useAuthContext } from "../../app/providers/AuthProvider";

import BookingForm from "../../features/booking/components/BookingForm";

import { useBarberBookings } from "../../features/booking/hooks/useBarberBookings";

export default function Booking() {
  const { user } = useAuthContext();

  if (!user) {
    return <p>Loading...</p>;
  }

  return <BookingPage barberId={user.id} />;
}

interface BookingPageProps {
  barberId: number;
}

function BookingPage({ barberId }: BookingPageProps) {
  const {
    bookings,
    loading: bookingsLoading,
    error: bookingsError,
    refreshBookings,
  } = useBarberBookings(barberId);

  async function handleBookingSuccess() {
    await refreshBookings();
  }

  return (
    <main>
      <h1>Bookings</h1>

      {/* CREATE BOOKING */}

      <BookingForm barberId={barberId} onSuccess={handleBookingSuccess} />

      {/* TODAY'S BOOKINGS */}

      <section>
        <h2>Today's Bookings</h2>

        {bookingsLoading && <p>Loading bookings...</p>}

        {bookingsError && <p>{bookingsError}</p>}

        {!bookingsLoading && !bookingsError && bookings.length === 0 && (
          <p>No bookings yet.</p>
        )}

        {!bookingsLoading && !bookingsError && bookings.length > 0 && (
          <div>
            {bookings.map((booking) => (
              <article key={booking.id}>
                <h3>{booking.customer_name}</h3>

                <p>{booking.customer_phone}</p>

                <p>
                  {new Date(booking.slot_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <p>{booking.status}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
