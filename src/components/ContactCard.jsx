// 📝 Este componente se ha extraído de Home.jsx para cumplir con el requisito del proyecto:
// "Crear un componente ContactCard separado para renderizar cada contacto"
// 💡 Separar componentes hace que tu código sea más fácil de leer y reutilizar

import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

// ✅ Recibe un contacto y las funciones necesarias como props
const ContactCard = ({ contact, onDelete }) => {
    const navigate = useNavigate();

    return (
        <div className="contactCard">
            <div className="d-flex align-items-center">
                <img src={`https://picsum.photos/seed/${contact.id}/150/150`} className="contact-img" alt="contact" />
                <div className="contact-info">
                    <div className="name">{contact.name}</div>
                    <div className="data-row"><FaMapMarkerAlt className="icon" /> <span>{contact.address}</span></div>
                    <div className="data-row"><FaPhone className="icon" /> <span>{contact.phone}</span></div>
                    <div className="data-row"><FaEnvelope className="icon" /> <span>{contact.email}</span></div>
                </div>
            </div>
            <div className="contact-actions">
                {/* 🔧 El botón de editar navega a la ruta /edit/:id */}
                <button className="btn-icon edit" onClick={() => navigate(`/edit/${contact.id}`)}><FaPencilAlt /></button>
                {/* 🔧 El botón de borrar llama a la función onDelete que viene del padre */}
                <button className="btn-icon delete" onClick={() => onDelete(contact.id)}><FaTrash /></button>
            </div>
        </div>
    );
};

export default ContactCard;
