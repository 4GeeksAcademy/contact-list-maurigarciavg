import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './addNewContact.css';

export const AddNewContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const contactToEdit = store.contacts.find((contact) => contact.id == params.id);

  useEffect(() => {
    if (contactToEdit) {
      setFullName(contactToEdit.name);
      setEmail(contactToEdit.email);
      setPhone(contactToEdit.phone);
      setAddress(contactToEdit.address);
    }
  }, [contactToEdit]);

  const handleSave = async (e) => {
    e.preventDefault();

    const myAgenda = "mauri-agenda";
    const contactData = {
      name: fullName,
      email: email,
      phone: phone,
      address: address
    };

    try {
      if (params.id) {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${myAgenda}/contacts/${params.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData)
        });

        if (response.ok) {
          const updatedContact = await response.json();
          dispatch({ type: 'MODIFY_CONTACT', payload: updatedContact });
          navigate("/");
        }
      } else {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${myAgenda}/contacts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData)
        });

        if (response.ok) {
          const newContact = await response.json();
          dispatch({ type: 'ADD_CONTACT', payload: newContact });
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error al guardar:", error);
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