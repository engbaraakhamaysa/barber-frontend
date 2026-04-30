type User = {
  id: number;
  name: string;
  barber: string;
};

type Props = {
  user: User;
  onDelete: (id: number) => void;
};

export default function UserItem({ user, onDelete }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        background: "#fff",
        marginBottom: "8px",
        borderRadius: "8px",
      }}
    >
      <div>
        <div>{user.name}</div>
        <small>👨‍✂️ {user.barber}</small>
      </div>

      <button onClick={() => onDelete(user.id)}>حذف</button>
    </div>
  );
}
