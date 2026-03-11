import { Link } from "react-router-dom"; // ✅ Importas Link para navegación
import useGlobalReducer from "../hooks/useGlobalReducer"; // ✅ Importas el hook global
import { useState, useEffect } from "react"; // ✅ Importas hooks necesarios
import { useNavigate, useParams } from 'react-router-dom'; // ✅ Importas hooks para navegación y parámetros
import './addNewContact.css'; // ✅ Importas estilos

export const AddNewContact = () => {
  const { store, dispatch } = useGlobalReducer(); // ✅ Usas el hook para acceder al store
  const [fullName, setFullName] = useState(""); // ✅ Estado para el nombre completo
  const [email, setEmail] = useState(""); // ✅ Estado para el email
  const [phone, setPhone] = useState(""); // ✅ Estado para el teléfono
  const [address, setAddress] = useState(""); // ✅ Estado para la dirección
  const navigate = useNavigate(); // ✅ Hook para navegación
  const params = useParams(); // ✅ Hook para obtener parámetros de la URL

  const contactToEdit = store.contacts.find((contact) => contact.id == params.id); // 📝 Busca el contacto a editar

  useEffect(() => { // 📝 Efecto para cargar datos del contacto a editar
    if (contactToEdit) {
      setFullName(contactToEdit.name); // 📝 Carga el nombre
      setEmail(contactToEdit.email); // 📝 Carga el email
      setPhone(contactToEdit.phone); // 📝 Carga el teléfono
      setAddress(contactToEdit.address); // 📝 Carga la dirección
    }
  }, [contactToEdit]); // 📝 Dependencia para el efecto

  const handleSave = async (e) => { // 📝 Maneja el guardado del contacto
    e.preventDefault(); // ✅ Previene el comportamiento por defecto del formulario

    const myAgenda = "mauri-agenda"; // 📝 Define la agenda
    const contactData = { // 📝 Crea el objeto de contacto
      name: fullName, // 📝 Asigna el nombre
      email: email, // 📝 Asigna el email
      phone: phone, // 📝 Asigna el teléfono
      address: address // 📝 Asigna la dirección
    };

    try {
      if (params.id) { // 📝 Verifica si es una edición
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${myAgenda}/contacts/${params.id}`, {
          method: "PUT", // 📝 Método para actualizar
          headers: { "Content-Type": "application/json" }, // 📝 Define el tipo de contenido
          body: JSON.stringify(contactData) // 📝 Convierte el objeto a JSON
        });

        if (response.ok) { // 📝 Verifica si la respuesta es correcta
          const updatedContact = await response.json(); // 📝 Obtiene el contacto actualizado
          dispatch({ type: 'MODIFY_CONTACT', payload: updatedContact }); // 📝 Despacha la acción para modificar
          navigate("/"); // ✅ Navega a la lista de contactos
        }
      } else { // 📝 Si es un nuevo contacto
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${myAgenda}/contacts`, {
          method: "POST", // 📝 Método para crear
          headers: { "Content-Type": "application/json" }, // 📝 Define el tipo de contenido
          body: JSON.stringify(contactData) // 📝 Convierte el objeto a JSON
        });

        if (response.ok) { // 📝 Verifica si la respuesta es correcta
          const newContact = await response.json(); // 📝 Obtiene el nuevo contacto
          dispatch({ type: 'ADD_CONTACT', payload: newContact }); // 📝 Despacha la acción para añadir
          navigate("/"); // ✅ Navega a la lista de contactos
        }
      }
    } catch (error) { // 📝 Manejo de errores
      console.error("Error al guardar:", error); // ✅ Muestra el error en consola
    }
  };

  return (
    <div className="container mt-5"> // ✅ Estructura de la interfaz
      <div className="form-wrapper"> // ✅ Contenedor del formulario
        <h1 className="text-center mb-4 text-success"> // ✅ Título dinámico
          {params.id ? "Edit Contact" : "Add a New Contact"} // 📝 Cambia el título según el contexto
        </h1>

        <form onSubmit={handleSave}> // ✅ Maneja el envío del formulario

          <div className="mb-3"> // ✅ Contenedor para el nombre
            <label className="form-label">Full Name</label> // ✅ Etiqueta del campo
            <input
              type="text"
              className="form-control dark-input"
              placeholder="Enter Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)} // ✅ Maneja el cambio
              required // ✅ Campo requerido
            />
          </div>

          <div className="mb-3"> // ✅ Contenedor para el email
            <label className="form-label">Email</label> // ✅ Etiqueta del campo
            <input
              type="email"
              className="form-control dark-input"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // ✅ Maneja el cambio
              required // ✅ Campo requerido
            />
          </div>

          <div className="mb-3"> // ✅ Contenedor para el teléfono
            <label className="form-label">Phone</label> // ✅ Etiqueta del campo
            <input
              type="tel"
              className="form-control dark-input"
              placeholder="Enter Phone (e.g. 600123456)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} // ✅ Maneja el cambio
              required // ✅ Campo requerido
              pattern="[0-9]{9,15}" // 📝 Asegura que el teléfono sea válido
            />
          </div>

          <div className="mb-4"> // ✅ Contenedor para la dirección
            <label className="form-label">Address</label> // ✅ Etiqueta del campo
            <input
              type="text"
              className="form-control dark-input"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)} // ✅ Maneja el cambio
              required // ✅ Campo requerido
            />
          </div>

          <div className="d-grid gap-2"> // ✅ Contenedor para el botón
            <button type="submit" className="btn btn-primary btn-lg"> // ✅ Botón de envío
              Save changes // ✅ Texto del botón
            </button>
          </div>
        </form>

        <div className="mt-3 text-center"> // ✅ Enlace de regreso
          <Link to="/" className="text-secondary text-decoration-none">or get back to contacts</Link> // ✅ Enlace para volver
        </div>
      </div>
    </div>
  );
};
