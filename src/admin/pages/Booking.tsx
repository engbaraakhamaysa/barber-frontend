import { useState } from "react";

export default function Booking({ barbers, setBarbers }: any) {
  const [selectedBarber, setSelectedBarber] = useState<any>(null);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [duration, setDuration] = useState(30);

  const [generatedSlots, setGeneratedSlots] = useState<string[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  // ⏰ format
  const formatTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const hour12 = h % 12 || 12;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  // 🔥 توليد الأوقات
  const generateSlots = () => {
    if (!start || !end) return [];

    const slots: string[] = [];

    let [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    let current = sh * 60 + sm;
    const endMinutes = eh * 60 + em;

    while (current < endMinutes) {
      const h = Math.floor(current / 60);
      const m = current % 60;

      slots.push(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`,
      );

      current += duration;
    }

    return slots;
  };

  // 🔥 توليد
  const handleGenerate = () => {
    const slots = generateSlots();
    setGeneratedSlots(slots);
    setSelectedSlots([]);
  };

  // ✔ اختيار/إلغاء اختيار
  const toggleSlot = (slot: string) => {
    setSelectedSlots((prev: string[]) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot],
    );
  };

  // 💾 حفظ فعلي داخل barber
  const saveSchedule = () => {
    if (!selectedBarber) return;

    const updated = barbers.map((b: any) =>
      b.id === selectedBarber.id
        ? {
            ...b,
            startTime: start,
            endTime: end,
            duration,
            availableTimes: selectedSlots, // 👈 أهم سطر
          }
        : b,
    );

    setBarbers(updated);

    // تحديث الواجهة مباشرة
    setSelectedBarber({
      ...selectedBarber,
      availableTimes: selectedSlots,
    });

    // تنظيف
    setGeneratedSlots([]);
    setSelectedSlots([]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>👨‍💼 إدارة الحلاقين</h2>

      {/* اختيار الحلاق */}
      <div style={{ display: "flex", gap: 10 }}>
        {barbers.map((b: any) => (
          <button key={b.id} onClick={() => setSelectedBarber(b)}>
            {b.name}
          </button>
        ))}
      </div>

      {selectedBarber && (
        <div style={{ marginTop: 20 }}>
          <h3>👨‍✂️ {selectedBarber.name}</h3>

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

          <button onClick={handleGenerate}>🔥 توليد الأوقات</button>

          {/* اختيار الأوقات */}
          {generatedSlots.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <h4>اختار الأوقات:</h4>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: 10,
                }}
              >
                {generatedSlots.map((t, i) => (
                  <div
                    key={i}
                    onClick={() => toggleSlot(t)}
                    style={{
                      padding: 10,
                      cursor: "pointer",
                      borderRadius: 6,
                      textAlign: "center",
                      background: selectedSlots.includes(t) ? "green" : "#eee",
                      color: selectedSlots.includes(t) ? "white" : "black",
                    }}
                  >
                    {formatTime(t)}
                  </div>
                ))}
              </div>

              <button onClick={saveSchedule} style={{ marginTop: 10 }}>
                💾 حفظ الأوقات
              </button>
            </div>
          )}

          {/* عرض المخزن فعلياً */}
          <div style={{ marginTop: 20 }}>
            <h4>📌 الأوقات المحفوظة:</h4>

            {selectedBarber.availableTimes?.length ? (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {selectedBarber.availableTimes.map((t: string, i: number) => (
                  <span
                    key={i}
                    style={{
                      padding: 6,
                      background: "#ddd",
                      borderRadius: 5,
                    }}
                  >
                    {formatTime(t)}
                  </span>
                ))}
              </div>
            ) : (
              <p>لا يوجد أوقات محفوظة</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
