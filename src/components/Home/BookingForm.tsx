type Props = {
  name: string;
  phone: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onBook: () => void;
  children: React.ReactNode;
};

export default function BookingForm({
  name,
  phone,
  onNameChange,
  onPhoneChange,
  onBook,
  children,
}: Props) {
  return (
    <div className="section">
      <h2>Book Appointment</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
      />

      <div className="slots">{children}</div>

      <button className="book-btn" onClick={onBook}>
        Book Now
      </button>
    </div>
  );
}
