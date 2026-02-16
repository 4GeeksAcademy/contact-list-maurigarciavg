import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import './home.css'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate();
	const deleteContact = (id) => {
		dispatch({
			type: 'DELETE_CONTACT',
			payload: id
		});
		navigate("/")
	};


	console.log(store)
	return (
		<div className="container">
			<div>
				<Link to="/AddNewContact">Add new contact</Link>
			</div>
			{
				store.contacts.map((contact) => (

					<div className="text-center mt-5">
						<div className="contactCard">
							<div className="name">{contact.full_name}</div>
							<div className="address">{contact.address}</div>
							<div className="phone">{contact.phone}</div>
							<div className="email">{contact.email}</div>
							<button className="deleteContact" onClick={() => deleteContact(contact.id)}>Delete</button>
						<button className="editContact" onClick={navigate("/AddNewContact")}>Edit</button>
						</div>
					</div>
				))
			}
		</div>
	);
};

