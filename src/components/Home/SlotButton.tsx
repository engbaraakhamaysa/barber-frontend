type Props = {
  id: number;
  slotTime: string;
  isSelected: boolean;
  onSelect: (id: number) => void;
};

export default function SlotButton({
  id,
  slotTime,
  isSelected,
  onSelect,
}: Props) {
  return (
    <button
      className={`slot-btn ${isSelected ? "active" : ""}`}
      onClick={() => onSelect(id)}
    >
      {new Date(slotTime).toLocaleString()}
    </button>
  );
}
