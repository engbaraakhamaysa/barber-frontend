import { useState } from "react";
import "../../styles/AddTime.css";

type TimeData = {
  start: string;
  end: string;
  duration: number;
  slots: string[];
};

type AllData = {
  baraa: TimeData;
  ahmad: TimeData;
};

export function AddTime() {
  const [selectedUser, setSelectedUser] = useState<"baraa" | "ahmad">("baraa");

  const [data, setData] = useState<AllData>({
    baraa: { start: "", end: "", duration: 30, slots: [] },
    ahmad: { start: "", end: "", duration: 30, slots: [] },
  });

  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const current = data[selectedUser];

  // ⏰ توليد الأوقات
  const generateSlots = () => {
    if (!current.start || !current.end) return [];

    const slots: string[] = [];

    let [sh, sm] = current.start.split(":").map(Number);
    const [eh, em] = current.end.split(":").map(Number);

    let currentMin = sh * 60 + sm;
    const endMin = eh * 60 + em;

    while (currentMin < endMin) {
      const h = Math.floor(currentMin / 60);
      const m = currentMin % 60;

      slots.push(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
      );

      currentMin += current.duration;
    }

    return slots;
  };

  // 🔥 Generate
  const handleGenerate = () => {
    const slots = generateSlots();

    setData((prev) => ({
      ...prev,
      [selectedUser]: {
        ...prev[selectedUser],
        slots,
      },
    }));

    setSelectedSlots([]);
  };

  // ✔ اختيار / إلغاء اختيار slot
  const toggleSlot = (slot: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot],
    );
  };

  // 💾 حفظ فقط المختار
  const handleSave = () => {
    setData((prev) => ({
      ...prev,
      [selectedUser]: {
        ...prev[selectedUser],
        slots: selectedSlots,
      },
    }));
  };

  return (
    <div className="add-time-page">
      {/* اختيار المستخدم */}
      <div className="user-switch">
        <button
          className={selectedUser === "baraa" ? "active" : ""}
          onClick={() => setSelectedUser("baraa")}
        >
          Baraa
        </button>

        <button
          className={selectedUser === "ahmad" ? "active" : ""}
          onClick={() => setSelectedUser("ahmad")}
        >
          Ahmad
        </button>
      </div>

      {/* الفورم */}
      <div className="time-form">
        <input
          type="time"
          value={current.start}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              [selectedUser]: {
                ...prev[selectedUser],
                start: e.target.value,
              },
            }))
          }
        />

        <input
          type="time"
          value={current.end}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              [selectedUser]: {
                ...prev[selectedUser],
                end: e.target.value,
              },
            }))
          }
        />

        <input
          type="number"
          value={current.duration}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              [selectedUser]: {
                ...prev[selectedUser],
                duration: Number(e.target.value),
              },
            }))
          }
        />

        <button onClick={handleGenerate}>Generate</button>
      </div>

      {/* slots */}
      <div className="slots-container">
        <h3>Slots for {selectedUser}</h3>

        {current.slots.length === 0 ? (
          <p>No slots</p>
        ) : (
          current.slots.map((slot, i) => (
            <div
              key={i}
              className="slot"
              onClick={() => toggleSlot(slot)}
              style={{
                background: selectedSlots.includes(slot)
                  ? "#3b82f6"
                  : "#0f172a",
                color: selectedSlots.includes(slot) ? "white" : "#94a3b8",
              }}
            >
              {slot}
            </div>
          ))
        )}

        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
