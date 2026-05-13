import "../../styles/home.css";
import { useEffect, useState } from "react";

import { slotsService } from "../../api/slotsService";
import { useHomeData } from "../../hooks/useHomeData";

type Customer = {
  id: number;
  name: string;
  phone: string;
};

export default function Home() {
  /////////////////////////////////////////////////////////
  // HOME DATA HOOK
  /////////////////////////////////////////////////////////
  const { customers, slots } = useHomeData();

  /////////////////////////////////////////////////////////
  // LOCAL UI STATE
  /////////////////////////////////////////////////////////
  const [timeLeft, setTimeLeft] = useState(30);

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  /////////////////////////////////////////////////////////
  // TIMER
  /////////////////////////////////////////////////////////
  useEffect(() => {
    if (customers.length === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          return 30;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [customers]);

  /////////////////////////////////////////////////////////
  // BOOK SLOT
  /////////////////////////////////////////////////////////
  const handleBook = async () => {
    if (!selectedSlot || !name || !phone) {
      alert("Fill all fields");
      return;
    }

    try {
      await slotsService.book({
        slot_id: selectedSlot,
        customer_name: name,
        customer_phone: phone,
      });

      alert("Booked successfully");

      setSelectedSlot(null);
      setName("");
      setPhone("");
    } catch (error) {
      console.error(error);
      alert("Booking failed");
    }
  };

  /////////////////////////////////////////////////////////
  // TOTAL TIME
  /////////////////////////////////////////////////////////
  const totalTime =
    customers.length > 0 ? (customers.length - 1) * 30 + timeLeft : 0;

  /////////////////////////////////////////////////////////
  // UI
  /////////////////////////////////////////////////////////
  return (
    <div className="home">
      {/* ================= STATS ================= */}
      <div className="stats">
        <div className="card">
          <h3>{customers.length}</h3>
          <p>Customers</p>
        </div>

        <div className="card">
          <h3>{totalTime}s</h3>
          <p>Waiting Time</p>
        </div>
      </div>

      {/* ================= BOOKING ================= */}
      <div className="section">
        <h2>Book Appointment</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="slots">
          {slots.length === 0 ? (
            <p className="empty">No available slots</p>
          ) : (
            slots.map((slot: any) => (
              <button
                key={slot.id}
                className={`slot-btn ${
                  selectedSlot === slot.id ? "active" : ""
                }`}
                onClick={() => setSelectedSlot(slot.id)}
              >
                {new Date(slot.slot_time).toLocaleString()}
              </button>
            ))
          )}
        </div>

        <button className="book-btn" onClick={handleBook}>
          Book Now
        </button>
      </div>

      {/* ================= QUEUE ================= */}
      <div className="section">
        <h2>Queue</h2>

        {customers.length === 0 ? (
          <p className="empty">No customers in queue</p>
        ) : (
          customers.map((customer: Customer, index: number) => (
            <div key={customer.id} className="queue-card">
              <div>
                <h4>{customer.name}</h4>
                <p>{customer.phone}</p>
              </div>

              <div className="time">
                {index === 0 ? `${timeLeft}s ⏱️` : "Waiting"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
