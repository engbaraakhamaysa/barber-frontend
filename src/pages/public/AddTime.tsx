import { useEffect, useState } from "react";
import "../../styles/AddTime.css";

type Slot = {
  id: number;
  slot_time: string;
};

export function AddTime() {
  const [generatedSlots, setGeneratedSlots] = useState<string[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [savedSlots, setSavedSlots] = useState<Slot[]>([]);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [duration, setDuration] = useState(30);

  /////////////////////////////////////////////////////////
  // GET BARBER FROM LOCALSTORAGE
  /////////////////////////////////////////////////////////
  const getBarber = () => {
    return JSON.parse(localStorage.getItem("user") || "{}");
  };

  /////////////////////////////////////////////////////////
  // FETCH SLOTS
  /////////////////////////////////////////////////////////
  useEffect(() => {
    const fetchSlots = async () => {
      const barber = getBarber();
      if (!barber?.id) return;

      try {
        const res = await fetch(
          `http://192.168.1.4:3000/api/slots/${barber.id}`,
        );
        const data = await res.json();
        setSavedSlots(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchSlots();
  }, []);

  /////////////////////////////////////////////////////////
  // GENERATE SLOTS
  /////////////////////////////////////////////////////////
  const handleGenerate = () => {
    if (!start || !end) return;

    const slots: string[] = [];

    let [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    let current = sh * 60 + sm;
    const endMin = eh * 60 + em;

    while (current < endMin) {
      const h = Math.floor(current / 60);
      const m = current % 60;

      slots.push(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
      );

      current += duration;
    }

    setGeneratedSlots(slots);
    setSelectedSlots([]);
  };

  /////////////////////////////////////////////////////////
  // SELECT SLOT
  /////////////////////////////////////////////////////////
  const toggleSlot = (slot: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot],
    );
  };

  /////////////////////////////////////////////////////////
  // SAVE SLOTS
  /////////////////////////////////////////////////////////
  const handleSave = async () => {
    const barber = getBarber();

    if (!barber?.id || selectedSlots.length === 0) return;

    try {
      await fetch("http://192.168.1.4:3000/api/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          barber_id: barber.id,
          slots: selectedSlots,
        }),
      });

      const res = await fetch(`http://192.168.1.4:3000/api/slots/${barber.id}`);

      const data = await res.json();
      setSavedSlots(data);

      setGeneratedSlots([]);
      setSelectedSlots([]);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  /////////////////////////////////////////////////////////
  // DELETE SLOT
  /////////////////////////////////////////////////////////
  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/api/slots/${id}`, {
        method: "DELETE",
      });

      setSavedSlots((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-time-page">
      {/* FORM */}
      <div className="time-form">
        <input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />

        <input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />

        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />

        <button onClick={handleGenerate}>Generate Slots</button>
      </div>

      {/* GENERATED */}
      <div className="slots-container">
        <h3>Generated Slots</h3>

        {generatedSlots.length === 0 ? (
          <p className="empty">No slots generated</p>
        ) : (
          generatedSlots.map((slot, i) => (
            <div
              key={i}
              className={`slot ${selectedSlots.includes(slot) ? "active" : ""}`}
              onClick={() => toggleSlot(slot)}
            >
              {slot}
            </div>
          ))
        )}

        <button className="save-btn" onClick={handleSave}>
          Save Selected
        </button>
      </div>

      {/* SAVED */}
      <div className="slots-container">
        <h3>Saved Slots</h3>

        {savedSlots.length === 0 ? (
          <p className="empty">No saved slots</p>
        ) : (
          savedSlots.map((slot) => (
            <div key={slot.id} className="slot-item">
              <span>
                {new Date(slot.slot_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>

              <button onClick={() => handleDelete(slot.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
