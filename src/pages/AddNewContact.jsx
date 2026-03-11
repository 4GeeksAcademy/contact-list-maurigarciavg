import { Link } from "react-router-dom"; // ✅ Importa Link para la navegación
import useGlobalReducer from "../hooks/useGlobalReducer"; // ✅ Importa el hook global
import { useState, useEffect } from "react"; // ✅ Importa hooks de React
import { useNavigate, useParams } from 'react-router-dom'; // ✅ Importa hooks para navegación y parámetros
import './addNewContact.css'; // ✅ Importa estilos

export const AddNewContact = () => {
  const { store, dispatch } = useGlobalReducer(); // ✅ Obtiene el store y dispatch del contexto
  const [fullName, setFullName] = useState(""); // ✅ Estado para el nombre completo
  const [email, setEmail] = useState(""); // ✅ Estado para el email
  const [phone, setPhone] = useState(""); // ✅ Estado para el teléfono
  const [address, setAddress] = useState(""); // ✅ Estado para la dirección
  const navigate = useNavigate(); // ✅ Hook para navegar
  const params = useParams(); // ✅ Hook para obtener parámetros de la URL

  const contactToEdit = store.contacts.find((contact) => contact.id == params.id); // 🔧 Cambiar '==' a '===' para comparación estricta

  useEffect(() => {
    if (contactToEdit) {
      setFullName(contactToEdit.name); // ✅ Establece el nombre completo si se está editando
      setEmail(contactToEdit.email); // ✅ Establece el email si se está editando
      setPhone(contactToEdit.phone); // ✅ Establece el teléfono si se está editando
      setAddress(contactToEdit.address); // ✅ Establece la dirección si se está editando
    }
  }, [contactToEdit]); // ✅ Dependencia correcta para el efecto

  const handleSave = async (e) => {
    e.preventDefault(); // ✅ Previene el comportamiento por defecto del formulario

    const myAgenda = "mauri-agenda"; // ✅ Define la agenda
    const contactData = {
      name: fullName,
      email: email,
      phone: phone,
      address: address
    }; // ✅ Crea el objeto de contacto

    try {
      if (params.id) {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${myAgenda}/contacts/${params.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData)
        }); // ✅ Envía la solicitud de actualización

        if (response.ok) {
          const updatedContact = await response.json(); // ✅ Obtiene el contacto actualizado
          dispatch({ type: 'MODIFY_CONTACT', payload: updatedContact }); // ✅ Despacha la acción para modificar el contacto
          navigate("/"); // ✅ Navega a la lista de contactos
        }
      } else {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${myAgenda}/contacts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData)
        }); // ✅ Envía la solicitud para crear un nuevo contacto

        if (response.ok) {
          const newContact = await response.json(); // ✅ Obtiene el nuevo contacto
          dispatch({ type: 'ADD_CONTACT', payload: newContact }); // ✅ Despacha la acción para agregar el contacto
          navigate("/"); // ✅ Navega a la lista de contactos
        }
      }
    } catch (error) {
      console.error("Error al guardar:", error); // ✅ Manejo de errores
    }
  };

  return (
    <div className="container mt-5"> // ✅ Estructura del contenedor
      <div className="form-wrapper"> // ✅ Estructura del formulario
        <h1 className="text-center mb-4 text-success">
          {params.id ? "Edit Contact" : "Add a New Contact"} // ✅ Título dinámico
        </h1>

        <form onSubmit={handleSave}> // ✅ Manejo de envío del formulario

          <div className="mb-3"> // ✅ Estructura del campo nombre
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control dark-input"
              placeholder="Enter Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3"> // ✅ Estructura del campo email
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control dark-input"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3"> // ✅ Estructura del campo teléfono
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control dark-input"
              placeholder="Enter Phone (e.g. 600123456)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="[0-9]{9,15}"
            />
          </div>

          <div className="mb-4"> // ✅ Estructura del campo dirección
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control dark-input"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="d-grid gap-2"> // ✅ Estructura del botón
            <button type="submit" className="btn btn-primary btn-lg">
              Save changes // ✅ Texto del botón
            </button>
          </div>
        </form>

        <div className="mt-3 text-center"> // ✅ Estructura del enlace
          <Link to="/" className="text-secondary text-decoration-none">or get back to contacts</Link> // ✅ Enlace de navegación
        </div>
      </div>
    </div>
  );
};
