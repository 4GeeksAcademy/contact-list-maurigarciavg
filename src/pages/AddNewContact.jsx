// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export const AddNewContact = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const contactToEdit = store.contacts.find((contact) => contact.id == params.id);

useEffect(() => {
    if (contactToEdit) {
        setFullName(contactToEdit.full_name);
        setEmail(contactToEdit.email);
        setPhone(contactToEdit.phone);
        setAddress(contactToEdit.address);
    }
}, [contactToEdit]);

  const handleSave = () => {
    if (params.id) {
      dispatch({
      type: 'MODIFY_CONTACT',
      payload: {
        id: params.id,
        full_name: fullName,
        email: email,
        phone: phone,
        address: address
      }
    });
    } else {
    dispatch({
      type: 'ADD_CONTACT',
      payload: {
        full_name: fullName,
        email: email,
        phone: phone,
        address: address
      }
    });
    }
    navigate("/")
  };

  return (
    <div className="container">
      <div className="title">Add new Contact</div>
      <div className="form">
        <div>Full Name name</div>
        <input type="text" placeholder="Enter Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <div>Email</div>
        <input type="text" placeholder="youremail@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div>Phone</div>
        <input type="text" placeholder="Enter phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <div>Address</div>
        <input type="text" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <button onClick={handleSave}>Send</button>
        <Link to="/">or get back to contacts</Link>
      </div>
    </div>

  );
};
