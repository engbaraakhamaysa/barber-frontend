// Provides routing for the app.
import { BrowserRouter } from "react-router-dom";

// Application routes.
import AppRoutes from "./routes/app.routes";

export default function App() {
  return (
    <BrowserRouter>
      {/* Render routes. */}
      <AppRoutes />
    </BrowserRouter>
  );
}
