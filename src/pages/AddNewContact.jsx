import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './addNewContact.css'; 

export const AddNewContact = () => {
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
    const nextId = store.contacts.length > 0
      ? Math.max(...store.contacts.map(c => c.id)) + 1
      : 1;

    if (params.id) {
      dispatch({
        type: 'MODIFY_CONTACT',
        payload: {
          id: parseInt(params.id),
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
          id: nextId,
          full_name: fullName,
          email: email,
          phone: phone,
          address: address
        }
      });
    }
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="form-wrapper">
        <h1 className="text-center mb-4 text-success">
          {params.id ? "Edit Contact" : "Add a New Contact"}
        </h1>
        
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input 
            type="text" 
            className="form-control dark-input" 
            placeholder="Enter Full Name" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
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
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input 
            type="text" 
            className="form-control dark-input" 
            placeholder="Enter Phone" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
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
          />
        </div>

        <div className="d-grid gap-2">
          <button className="btn btn-primary btn-lg" onClick={handleSave}>save</button>
        </div>

        <div className="mt-3 text-center">
          <Link to="/" className="text-secondary text-decoration-none">or get back to contacts</Link>
        </div>
      </div>
    </div>
  );
};
