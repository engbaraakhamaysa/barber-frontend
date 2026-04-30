type Props = {
  message: string;
  type: "success" | "error";
};

export default function Notification({ message, type }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        background: type === "success" ? "#4caf50" : "#f44336",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        fontSize: "14px",
      }}
    >
      {message}
    </div>
  );
}
