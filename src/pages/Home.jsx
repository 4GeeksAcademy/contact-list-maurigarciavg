import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPencilAlt, FaTrash } from "react-icons/fa";
import './home.css';

export const Home = () => {
    const { store, actions } = useGlobalReducer();
    const navigate = useNavigate();
    const myAgenda = "mauri-agenda";

    useEffect(() => {
        actions.checkOrCreateAgenda();
    }, []);

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${myAgenda}/contacts/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                actions.checkOrCreateAgenda();
            }
        } catch (error) {
            console.error("Error al borrar:", error);
        }
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
                            <img src={`https://picsum.photos/seed/${contact.id}/150/150`} className="contact-img" alt="contact" />
                            <div className="contact-info">
                                <div className="name">{contact.name}</div>
                                <div className="data-row"><FaMapMarkerAlt className="icon" /> <span>{contact.address}</span></div>
                                <div className="data-row"><FaPhone className="icon" /> <span>{contact.phone}</span></div>
                                <div className="data-row"><FaEnvelope className="icon" /> <span>{contact.email}</span></div>
                            </div>
                        </div>
                        <div className="contact-actions">
                            <button className="btn-icon edit" onClick={() => navigate(`/edit/${contact.id}`)}><FaPencilAlt /></button>
                            <button className="btn-icon delete" onClick={() => deleteContact(contact.id)}><FaTrash /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

