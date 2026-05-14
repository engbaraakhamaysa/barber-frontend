type Props = {
  name: string;
  phone: string;
  isCurrent: boolean;
  timeLeft: number;
};

export default function QueueCard({ name, phone, isCurrent, timeLeft }: Props) {
  return (
    <div className="queue-card">
      <div>
        <h4>{name}</h4>
        <p>{phone}</p>
      </div>

      <div className="time">{isCurrent ? `${timeLeft}s ` : "Waiting"}</div>
    </div>
  );
}
