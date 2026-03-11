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
      <Route path="/" element={<Home />} /> // ✅ Ruta principal para la página de inicio
      <Route path="/add" element={<AddNewContact />} /> // ✅ Ruta para agregar un nuevo contacto
      <Route path="/edit/:id" element={<AddNewContact />} /> // 📝 Esta ruta también usa el mismo componente, asegúrate de manejar el caso de edición
    </Route>
  )
);