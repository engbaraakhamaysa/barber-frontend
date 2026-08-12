import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/App.routes";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
