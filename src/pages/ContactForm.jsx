import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import {
	addContact,
	clearErrorAction,
	createEmptyContact,
	getContactById,
	loadContacts,
	updateContact,
	validateContactData
} from "../store";

const FORM_FIELDS = [
	{
		name: "name",
		label: "Full Name",
		type: "text",
		placeholder: "Enter full name"
	},
	{
		name: "email",
		label: "Email",
		type: "email",
		placeholder: "Enter email"
	},
	{
		name: "phone",
		label: "Phone",
		type: "tel",
		placeholder: "Enter phone number"
	},
	{
		name: "address",
		label: "Address",
		type: "text",
		placeholder: "Enter address"
	}
];

const ContactForm = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const contactId = id ? Number(id) : null;
	const isEditMode = id !== undefined;

	const { store, dispatch } = useGlobalReducer();
	const {
		contacts,
		error,
		hasLoadedContacts,
		isLoadingContacts,
		isSavingContact
	} = store;

	const [formData, setFormData] = useState(createEmptyContact);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (!isEditMode) {
			setFormData(createEmptyContact());
			setErrors({});
			return;
		}

		if (!hasLoadedContacts && !isLoadingContacts) {
			void loadContacts(dispatch);
		}
	}, [dispatch, hasLoadedContacts, isEditMode, isLoadingContacts]);

	useEffect(() => {
		if (!isEditMode) {
			return;
		}

		if (!Number.isInteger(contactId)) {
			navigate("/", { replace: true });
			return;
		}

		if (!hasLoadedContacts) {
			return;
		}

		const contact = getContactById(contacts, contactId);

		if (!contact) {
			navigate("/", { replace: true });
			return;
		}

		setFormData({
			name: contact.name,
			email: contact.email,
			phone: contact.phone,
			address: contact.address
		});
	}, [contactId, contacts, hasLoadedContacts, isEditMode, navigate]);

	const handleChange = ({ target }) => {
		const { name, value } = target;

		setFormData((currentFormData) => ({
			...currentFormData,
			[name]: value
		}));

		setErrors((currentErrors) => {
			if (!currentErrors[name]) {
				return currentErrors;
			}

			return {
				...currentErrors,
				[name]: null
			};
		});

		if (error) {
			dispatch(clearErrorAction());
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const validationErrors = validateContactData(formData);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) {
			return;
		}

		const didSave = isEditMode
			? await updateContact(dispatch, contactId, formData)
			: await addContact(dispatch, formData);

		if (didSave) {
			navigate("/");
		}
	};

	if (isEditMode && !hasLoadedContacts) {
		return (
			<section className="container py-5">
				<div className="contact-feedback-card text-center">
					{isLoadingContacts ? (
						<>
							<div className="spinner-border text-primary mb-3" role="status">
								<span className="visually-hidden">Loading contact...</span>
							</div>
							<h1 className="h4">Loading contact...</h1>
							<p className="text-muted mb-0">
								Fetching the current values before opening edit mode.
							</p>
						</>
					) : (
						<>
							<h1 className="h4">Unable to load the contact yet</h1>
							<p className="text-muted mb-4">
								Reload the agenda before editing this contact.
							</p>
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => loadContacts(dispatch)}
							>
								Retry loading contacts
							</button>
						</>
					)}
				</div>
			</section>
		);
	}

	return (
		<section className="container py-5">
			<div className="row justify-content-center">
				<div className="col-lg-8">
					<div className="contact-form-card card border-0 shadow-sm">
						<div className="card-body p-4 p-md-5">
							<div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
								<div>
									<p className="text-uppercase text-muted small mb-2">
										{isEditMode ? "Edit flow" : "Create flow"}
									</p>
									<h1 className="h3 mb-1">
										{isEditMode ? "Edit Contact" : "Add New Contact"}
									</h1>
									<p className="text-muted mb-0">
										All changes are synced with the official contacts API.
									</p>
								</div>
								<Link to="/" className="btn btn-outline-secondary">
									Back to list
								</Link>
							</div>

							{error ? (
								<div className="alert alert-danger" role="alert">
									{error}
								</div>
							) : null}

							<form noValidate onSubmit={handleSubmit}>
								<div className="row">
									{FORM_FIELDS.map((field) => (
										<div key={field.name} className="col-md-6 mb-3">
											<label htmlFor={field.name} className="form-label">
												{field.label} *
											</label>
											<input
												type={field.type}
												id={field.name}
												name={field.name}
												value={formData[field.name]}
												onChange={handleChange}
												placeholder={field.placeholder}
												className={`form-control ${
													errors[field.name] ? "is-invalid" : ""
												}`}
											/>
											{errors[field.name] ? (
												<div className="invalid-feedback">
													{errors[field.name]}
												</div>
											) : null}
										</div>
									))}
								</div>

								<div className="d-flex justify-content-end gap-2 mt-4">
									<Link to="/" className="btn btn-light">
										Cancel
									</Link>
									<button
										type="submit"
										className="btn btn-primary"
										disabled={isSavingContact}
									>
										{isSavingContact
											? "Saving..."
											: isEditMode
												? "Save Changes"
												: "Add Contact"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
