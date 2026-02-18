import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import './home.css'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPencilAlt, FaTrash } from "react-icons/fa";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate();
    
    // Aquí más adelante pondremos la lógica de la API
    const deleteContact = (id) => {
        dispatch({
            type: 'DELETE_CONTACT',
            payload: id
        });
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/add" className="btn btn-success">Add new contact</Link>
            </div>
            
            <div className="contacts-wrapper">
                {store.contacts.map((contact) => (
                    <div key={contact.id} className="contactCard">
                        <div className="d-flex align-items-center">
                            <img 
                                src={`https://picsum.photos/seed/${contact.id}/150/150`} 
                                alt="avatar" 
                                className="contact-img" 
                            />
                            <div className="contact-info">
                                <div className="name">{contact.full_name}</div>
                                <div className="data-row">
                                    <FaMapMarkerAlt className="icon" /> 
                                    <span className="address">{contact.address}</span>
                                </div>
                                <div className="data-row">
                                    <FaPhone className="icon" /> 
                                    <span className="phone">{contact.phone}</span>
                                </div>
                                <div className="data-row">
                                    <FaEnvelope className="icon" /> 
                                    <span className="email">{contact.email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="contact-actions">
                            <button className="btn-icon edit" onClick={() => navigate(`/edit/${contact.id}`)}>
                                <FaPencilAlt />
                            </button>
                            <button className="btn-icon delete" onClick={() => deleteContact(contact.id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

