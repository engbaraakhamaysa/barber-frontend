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

  /////////////////////////////////////////////////////////
  const getBarber = () => {
    return JSON.parse(localStorage.getItem("user") || "{}");
  };

  /////////////////////////////////////////////////////////
  // CUSTOMERS
  /////////////////////////////////////////////////////////
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const barber = getBarber();
        if (!barber?.id) return;

        const res = await fetch(
          `http://192.168.1.4:3000/customers/${barber.id}`,
        );

        if (!res.ok) throw new Error("Customers API failed");

        const data = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, []);

  /////////////////////////////////////////////////////////
  // SLOTS
  /////////////////////////////////////////////////////////
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const barber = getBarber();
        if (!barber?.id) return;

        const res = await fetch(
          `http://192.168.1.4:3000/api/slots/${barber.id}`,
        );

        if (!res.ok) throw new Error("Slots API failed");

        const data = await res.json();

        // ❗ فقط المتاح
        const available = data.filter((s: Slot) => !s.is_booked);

        setSlots(available);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSlots();
  }, []);

  /////////////////////////////////////////////////////////
  // TIMER
  /////////////////////////////////////////////////////////
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

  /////////////////////////////////////////////////////////
  // BOOK SLOT
  /////////////////////////////////////////////////////////
  const handleBook = async () => {
    if (!selectedSlot || !name || !phone) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch("http://192.168.1.4:3000/api/slots/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slot_id: selectedSlot,
          customer_name: name,
          customer_phone: phone,
        }),
      });

      if (!res.ok) {
        alert("Booking failed");
        return;
      }

      alert("Booked successfully");

      // تحديث UI
      setSlots((prev) => prev.filter((s) => s.id !== selectedSlot));

      setSelectedSlot(null);
      setName("");
      setPhone("");
    } catch (error) {
      console.error(error);
    }
  };

  const totalTime =
    customers.length > 0 ? (customers.length - 1) * 30 + timeLeft : 0;

  /////////////////////////////////////////////////////////
  // UI
  /////////////////////////////////////////////////////////
  return (
    <div className="home">
      <div className="content">
        <h1>Welcome 👋</h1>

        <h3>Total waiting time: {totalTime} sec</h3>
        <h3>Total customers: {customers.length}</h3>

        <hr />

        {/* ================= BOOKING ================= */}
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

        <h3>Available Slots</h3>

        {slots.length === 0 ? (
          <p>No available slots</p>
        ) : (
          slots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => setSelectedSlot(slot.id)}
              style={{
                margin: "5px",
                padding: "10px",
                background: selectedSlot === slot.id ? "green" : "#222",
                color: "white",
              }}
            >
              {new Date(slot.slot_time).toLocaleString()}
            </button>
          ))
        )}

        <br />

        <button onClick={handleBook} style={{ marginTop: "10px" }}>
          Book Now
        </button>

        {/* ================= QUEUE ================= */}
        <hr />

        {customers.length === 0 ? (
          <p>No customers in queue</p>
        ) : (
          customers.map((c, index) => (
            <div key={c.id}>
              <h4>{c.name}</h4>
              <p>{c.phone}</p>

              {index === 0 ? (
                <p>Time left: {timeLeft}s ⏱️</p>
              ) : (
                <p>Waiting...</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
