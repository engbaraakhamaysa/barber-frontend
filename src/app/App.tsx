import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthRoutes from "./routes/auth.routes";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <AuthRoutes />
    </BrowserRouter>
  );
}
