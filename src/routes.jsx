import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { AddNewContact } from "./pages/AddNewContact";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route index element={<Home />} /> // 📝 Usar 'index' para la ruta raíz es correcto
      <Route path="/add" element={<AddNewContact />} />
      <Route path="/edit/:id" element={<AddNewContact />} />
    </Route>
  )
);