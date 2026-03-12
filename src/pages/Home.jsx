import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
// ✅ Importamos el componente ContactCard separado
import ContactCard from "../components/ContactCard";
import './home.css';

export const Home = () => {
    const { store, actions } = useGlobalReducer();
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
                {/* 💡 Ahora usamos el componente ContactCard en vez de escribir todo el HTML aquí */}
                {store.contacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact} onDelete={deleteContact} />
                ))}
            </div>
        </div>
    );
};
