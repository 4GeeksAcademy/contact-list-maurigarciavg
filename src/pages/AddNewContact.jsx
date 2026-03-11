import { Link } from "react-router-dom"; // ✅ Importas correctamente Link para la navegación
import useGlobalReducer from "../hooks/useGlobalReducer"; // ✅ Importas el hook global de estado
import { useState, useEffect } from "react"; // ✅ Importas hooks de React
import { useNavigate, useParams } from 'react-router-dom'; // ✅ Importas hooks para navegación y parámetros
import './addNewContact.css'; // ✅ Importas estilos

export const AddNewContact = () => {
  const { store, dispatch } = useGlobalReducer(); // ✅ Usas el hook para acceder al estado global
  const [fullName, setFullName] = useState(""); // ✅ Inicializas el estado
  const [email, setEmail] = useState(""); // ✅ Inicializas el estado
  const [phone, setPhone] = useState(""); // ✅ Inicializas el estado
  const [address, setAddress] = useState(""); // ✅ Inicializas el estado
  const navigate = useNavigate(); // ✅ Hook para navegar
  const params = useParams(); // ✅ Hook para obtener parámetros de la URL

  const contactToEdit = store.contacts.find((contact) => contact.id == params.id); // 💡 Considera usar '===' para comparación estricta

  useEffect(() => {
    if (contactToEdit) {
      setFullName(contactToEdit.name); // ✅ Asignas valores al editar
      setEmail(contactToEdit.email); // ✅ Asignas valores al editar
      setPhone(contactToEdit.phone); // ✅ Asignas valores al editar
      setAddress(contactToEdit.address); // ✅ Asignas valores al editar
    }
  }, [contactToEdit]); // ✅ Dependencia correcta para el efecto

  const handleSave = async (e) => {
    e.preventDefault(); // ✅ Previene el comportamiento por defecto del formulario

    const myAgenda = "mauri-agenda"; // ✅ Definición clara de la agenda
    const contactData = {
      name: fullName,
      email: email,
      phone: phone,
      address: address
    }; // ✅ Creas un objeto con los datos del contacto

    try {
      if (params.id) {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${myAgenda}/contacts/${params.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData)
        }); // ✅ Realizas la petición para editar

        if (response.ok) {
          const updatedContact = await response.json(); // ✅ Obtienes el contacto actualizado
          dispatch({ type: 'MODIFY_CONTACT', payload: updatedContact }); // ✅ Actualizas el estado global
          navigate("/"); // ✅ Navegas de vuelta a la lista
        }
      } else {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${myAgenda}/contacts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData)
        }); // ✅ Realizas la petición para crear

        if (response.ok) {
          const newContact = await response.json(); // ✅ Obtienes el nuevo contacto
          dispatch({ type: 'ADD_CONTACT', payload: newContact }); // ✅ Actualizas el estado global
          navigate("/"); // ✅ Navegas de vuelta a la lista
        }
      }
    } catch (error) {
      console.error("Error al guardar:", error); // 💡 Considera mostrar un mensaje al usuario en lugar de solo en consola
    }
  };

  return (
    <div className="container mt-5">
      <div className="form-wrapper">
        <h1 className="text-center mb-4 text-success">
          {params.id ? "Edit Contact" : "Add a New Contact"}
        </h1>

        <form onSubmit={handleSave}>

          <div className="mb-3">
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

          <div className="mb-3">
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

          <div className="mb-3">
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

          <div className="mb-4">
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

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-lg">
              Save changes
            </button>
          </div>
        </form>

        <div className="mt-3 text-center">
          <Link to="/" className="text-secondary text-decoration-none">or get back to contacts</Link>
        </div>
      </div>
    </div>
  );
};
