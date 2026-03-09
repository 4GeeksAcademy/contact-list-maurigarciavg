import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
	FaEnvelope,
	FaMapMarkerAlt,
	FaPencilAlt,
	FaPhone,
	FaTrashAlt
} from "react-icons/fa";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { deleteContact } from "../store";

const getInitials = (name = "") =>
	name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((chunk) => chunk.charAt(0).toUpperCase())
		.join("") || "?";

const ContactCard = ({ contact }) => {
	const { store, dispatch } = useGlobalReducer();

	const handleDelete = async () => {
		const confirmed = window.confirm(
			`Delete ${contact.name} from the shared agenda?`
		);

		if (!confirmed) {
			return;
		}

		await deleteContact(dispatch, contact.id);
	};

	return (
		<article className="contact-card">
			<div className="contact-card-main">
				<div className="avatar-badge" aria-hidden="true">
					{getInitials(contact.name)}
				</div>

				<div className="min-w-0">
					<h2 className="h4 mb-2">{contact.name}</h2>
					<div className="contact-meta">
						<div className="contact-meta-row">
							<FaMapMarkerAlt />
							<span>{contact.address}</span>
						</div>
						<div className="contact-meta-row">
							<FaPhone />
							<span>{contact.phone}</span>
						</div>
						<div className="contact-meta-row">
							<FaEnvelope />
							<span>{contact.email}</span>
						</div>
					</div>
				</div>
			</div>

			<div className="contact-actions">
				<Link
					to={`/edit/${contact.id}`}
					className="btn btn-outline-info contact-action-button"
					aria-label={`Edit ${contact.name}`}
				>
					<FaPencilAlt />
				</Link>
				<button
					type="button"
					className="btn btn-outline-danger contact-action-button"
					onClick={handleDelete}
					disabled={store.isSavingContact}
					aria-label={`Delete ${contact.name}`}
				>
					<FaTrashAlt />
				</button>
			</div>
		</article>
	);
};

ContactCard.propTypes = {
	contact: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		phone: PropTypes.string.isRequired,
		address: PropTypes.string.isRequired
	}).isRequired
};

export default ContactCard;
