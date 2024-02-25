import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app.routes";

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}