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
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} > // ✅ Buen manejo de errores al no encontrar la ruta
      <Route path="/" element={<Home />} /> // ✅ Ruta principal para la página de inicio
      <Route path="/add" element={<AddNewContact />} /> // ✅ Ruta para agregar un nuevo contacto
      <Route path="/edit/:id" element={<AddNewContact />} /> // 💡 Considera crear un componente diferente para editar
    </Route>
  )
);