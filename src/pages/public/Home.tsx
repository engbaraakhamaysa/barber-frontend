import "../../styles/home.css";
import { useEffect, useState } from "react";

import { slotsService } from "../../api/slotsService";
import { useHomeData } from "../../hooks/useHomeData";
import QueueCard from "../../components/Home/QueueCard";
import SlotButton from "../../components/Home/SlotButton";
import BookingForm from "../../components/Home/BookingForm";

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
      <BookingForm
        name={name}
        phone={phone}
        onNameChange={setName}
        onPhoneChange={setPhone}
        onBook={handleBook}
      >
        {slots.length === 0 ? (
          <p className="empty">No available slots</p>
        ) : (
          slots.map((slot: any) => (
            <SlotButton
              key={slot.id}
              id={slot.id}
              slotTime={slot.slot_time}
              isSelected={selectedSlot === slot.id}
              onSelect={setSelectedSlot}
            />
          ))
        )}
      </BookingForm>
      {/* ================= QUEUE ================= */}
      <div className="section">
        <h2>Queue</h2>

        {customers.length === 0 ? (
          <p className="empty">No customers in queue</p>
        ) : (
          customers.map((customer: Customer, index: number) => (
            <QueueCard
              key={customer.id}
              name={customer.name}
              phone={customer.phone}
              isCurrent={index === 0}
              timeLeft={timeLeft}
            />
          ))
        )}
      </div>
    </div>
  );
}
