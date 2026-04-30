import { useState } from "react";

type Props = {
  onAdd: (name: string, barber: string) => void;
  barbers: string[];
};

export default function AddUser({ onAdd, barbers }: Props) {
  const [name, setName] = useState("");
  const [barber, setBarber] = useState(barbers[0]);

  const handleAdd = () => {
    onAdd(name, barber);
    setName("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginBottom: "16px",
      }}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="اسم الزبون"
        style={{ padding: "8px" }}
      />

      <select
        value={barber}
        onChange={(e) => setBarber(e.target.value)}
        style={{ padding: "8px" }}
      >
        {barbers.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <button onClick={handleAdd}>حجز عند الحلاق</button>
    </div>
  );
}
