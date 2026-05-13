import { getCustomers } from "../../api/customersApi";
import "../../styles/home.css";
import { useEffect, useState } from "react";

type Customer = {
  id: number;
  name: string;
  phone: string;
};

type Slot = {
  id: number;
  slot_time: string;
  is_booked: boolean;
};

const Home = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const getBarber = () => {
    return JSON.parse(localStorage.getItem("user") || "{}");
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      const barber = getBarber();
      if (!barber?.id) return;

      //use api/customersApi to fetch data & get all customers
      const data = await getCustomers(barber.id);
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      const barber = getBarber();
      if (!barber?.id) return;

      const res = await fetch(`http://192.168.1.4:3000/api/slots/${barber.id}`);

      const data = await res.json();
      setSlots(data.filter((s: Slot) => !s.is_booked));
    };

    fetchSlots();
  }, []);

  useEffect(() => {
    if (customers.length === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          setCustomers((p) => p.slice(1));
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [customers]);

  const handleBook = async () => {
    if (!selectedSlot || !name || !phone) return alert("Fill all fields");

    const res = await fetch("http://192.168.1.4:3000/api/slots/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slot_id: selectedSlot,
        customer_name: name,
        customer_phone: phone,
      }),
    });

    if (!res.ok) return alert("Booking failed");

    setSlots((p) => p.filter((s) => s.id !== selectedSlot));
    setSelectedSlot(null);
    setName("");
    setPhone("");
  };

  const totalTime =
    customers.length > 0 ? (customers.length - 1) * 30 + timeLeft : 0;

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
            slots.map((slot) => (
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
          customers.map((c, index) => (
            <div key={c.id} className="queue-card">
              <div>
                <h4>{c.name}</h4>
                <p>{c.phone}</p>
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
};

export default Home;
