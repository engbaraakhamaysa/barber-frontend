import { useState } from "react";

type Booking = {
  id: number;
  name: string;
  phone: string;
  time: string;
};

type AllBookings = {
  baraa: Booking[];
  ahmad: Booking[];
};

export default function ShowTime() {
  const [selectedUser, setSelectedUser] = useState<"baraa" | "ahmad">("baraa");

  // بيانات تجريبية (لاحقاً رح تيجي من backend أو AddTime)
  const [bookings] = useState<AllBookings>({
    baraa: [
      { id: 1, name: "Ali", phone: "0599999999", time: "10:00" },
      { id: 2, name: "Omar", phone: "0588888888", time: "11:30" },
    ],
    ahmad: [{ id: 3, name: "Sara", phone: "0566666666", time: "09:00" }],
  });

  return (
    <div style={{ padding: "20px", color: "white" }}>
      {/* اختيار المستخدم */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <button
          onClick={() => setSelectedUser("baraa")}
          style={{
            padding: "8px",
            background: selectedUser === "baraa" ? "#3b82f6" : "#334155",
            color: "white",
          }}
        >
          Baraa
        </button>

        <button
          onClick={() => setSelectedUser("ahmad")}
          style={{
            padding: "8px",
            background: selectedUser === "ahmad" ? "#3b82f6" : "#334155",
            color: "white",
          }}
        >
          Ahmad
        </button>
      </div>

      {/* العنوان */}
      <h2>Booked Times for {selectedUser}</h2>

      {/* الجدول */}
      <table
        style={{
          width: "100%",
          marginTop: "10px",
          background: "#1e293b",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ background: "#0f172a" }}>
            <th style={{ padding: "10px" }}>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {bookings[selectedUser].length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "10px" }}>
                No bookings yet
              </td>
            </tr>
          ) : (
            bookings[selectedUser].map((b, i) => (
              <tr key={b.id} style={{ borderTop: "1px solid #334155" }}>
                <td style={{ padding: "10px" }}>{i + 1}</td>
                <td>{b.name}</td>
                <td>{b.phone}</td>
                <td>{b.time}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
