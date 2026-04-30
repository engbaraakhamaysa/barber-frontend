import "../pages/home.css";
type Props = {
  title: string;
  children: React.ReactNode;
};

export default function AuthLayout({ title, children }: Props) {
  return (
    <div className="login-container">
      <div className="login-card">{children}</div>
    </div>
  );
}
