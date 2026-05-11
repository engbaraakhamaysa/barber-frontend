import { useEffect, useState } from "react";

type Booking = {
  id: number;
  name: string;
  phone: string;
  slot_time: string;
};

type Slot = {
  id: number;
  slot_time: string;
  is_booked: boolean;
};

export default function ShowTime() {
  const [selectedUser, setSelectedUser] = useState<number>(1);

  const [bookings, setBookings] = useState<Booking[]>([]);

  const [slots, setSlots] = useState<Slot[]>([]);

  /////////////////////////////////////////////////////////
  //        GET BARBER FROM LOCAL STORAGE              //
  /////////////////////////////////////////////////////////

  const getBarber = () => {
    return JSON.parse(localStorage.getItem("user") || "{}");
  };

  /////////////////////////////////////////////////////////
  //              FETCH BOOKINGS                        //
  /////////////////////////////////////////////////////////

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const barber = getBarber();

        if (!barber?.id) return;

        const res = await fetch(
          `http://192.168.1.4:3000/api/customers/${barber.id}`,
        );

        const data = await res.json();

        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [selectedUser]);

  /////////////////////////////////////////////////////////
  //              FETCH SLOTS                           //
  /////////////////////////////////////////////////////////

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const barber = getBarber();

        if (!barber?.id) return;

        const res = await fetch(
          `http://192.168.1.4:3000/api/slots/${barber.id}`,
        );

        const data = await res.json();

        setSlots(data);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
  }, [selectedUser]);

  return (
    <div
      style={{
        padding: "20px",
        color: "white",
      }}
    >
      <h2>📊 Barber Dashboard</h2>

      <h3>📌 Customers Bookings</h3>
      <table
        style={{
          width: "100%",
          background: "#1e293b",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={4}>No bookings</td>
            </tr>
          ) : (
            bookings.map((b, i) => (
              <tr key={b.id}>
                <td>{i + 1}</td>
                <td>{b.name}</td>
                <td>{b.phone}</td>
                <td>{new Date(b.slot_time).toLocaleTimeString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h3 style={{ marginTop: "20px" }}>⏰ Available Slots</h3>
      <table
        style={{
          width: "100%",
          background: "#1e293b",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {slots.length === 0 ? (
            <tr>
              <td colSpan={3}>No slots available</td>
            </tr>
          ) : (
            slots.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td>{new Date(s.slot_time).toLocaleTimeString()}</td>
                <td>{s.is_booked ? "❌ Booked" : "✅ Available"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
