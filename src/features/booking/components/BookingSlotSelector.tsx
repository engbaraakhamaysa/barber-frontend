import type { BookingSlot } from "../booking-slot";

interface BookingSlotSelectorProps {
  slots: BookingSlot[];
  selectedSlotId: number | null;
  onSelect: (slotId: number) => void;
}

export default function BookingSlotSelector({
  slots,
  selectedSlotId,
  onSelect,
}: BookingSlotSelectorProps) {
  if (slots.length === 0) {
    return <p>No available booking times.</p>;
  }

  return (
    <section>
      <h2>Available Times</h2>

      <div>
        {slots.map((slot) => {
          const isSelected = slot.id === selectedSlotId;

          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => onSelect(slot.id)}
              style={{
                margin: "4px",
                padding: "10px 16px",
                fontWeight: isSelected ? "bold" : "normal",
              }}
            >
              {new Date(slot.slot_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </button>
          );
        })}
      </div>

      {selectedSlotId !== null && <p>Selected slot: {selectedSlotId}</p>}
    </section>
  );
}
