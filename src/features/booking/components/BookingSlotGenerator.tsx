import { useState } from "react";

interface BookingSlotGeneratorProps {
  onSlotsGenerated: (slots: Date[]) => void;
}

const SLOT_DURATION = 20;

export default function BookingSlotGenerator({
  onSlotsGenerated,
}: BookingSlotGeneratorProps) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const generateSlots = () => {
    if (!date || !startTime || !endTime) {
      return;
    }

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (start >= end) {
      return;
    }

    const generatedSlots: Date[] = [];

    let current = new Date(start);

    while (current < end) {
      generatedSlots.push(new Date(current));

      current = new Date(current.getTime() + SLOT_DURATION * 60 * 1000);
    }

    onSlotsGenerated(generatedSlots);
  };

  return (
    <section>
      <h2>Booking Times</h2>

      <div>
        <label>Date</label>

        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

      <div>
        <label>From</label>

        <input
          type="time"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
        />
      </div>

      <div>
        <label>To</label>

        <input
          type="time"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
        />
      </div>

      <button type="button" onClick={generateSlots}>
        Generate Times
      </button>
    </section>
  );
}
