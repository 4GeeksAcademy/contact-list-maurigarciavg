import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "../components/ContactCard";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { loadContacts } from "../store";

const ContactList = () => {
	const { store, dispatch } = useGlobalReducer();
	const {
		contacts,
		error,
		hasLoadedContacts,
		isLoadingContacts,
		isSavingContact
	} = store;
	const hasBootstrapped = useRef(false);

	useEffect(() => {
		if (hasBootstrapped.current) {
			return;
		}

		hasBootstrapped.current = true;
		void loadContacts(dispatch);
	}, [dispatch]);

	const isBusy = isLoadingContacts || isSavingContact;

	return (
		<section className="container py-5">
			<header className="page-hero mb-4">
				<div className="toolbar-grid">
					<div>
						<p className="text-uppercase text-muted small mb-2">
							Mauricio Garcia-Valdecasas Gámez
						</p>
						<h1 className="mb-1">Contact List</h1>
						<p className="text-muted mb-0">
							CRUD conectado a la API oficial de 4Geeks usando un store global.
						</p>
					</div>
					<div className="d-flex gap-2">
						<button
							type="button"
							className="btn btn-outline-secondary"
							onClick={() => loadContacts(dispatch)}
							disabled={isBusy}
						>
							{isLoadingContacts ? "Refreshing..." : "Refresh"}
						</button>
						<Link to="/add" className="btn btn-success">
							Add New Contact
						</Link>
					</div>
				</div>
			</header>

			{error ? (
				<div
					className="alert alert-danger d-flex justify-content-between align-items-center flex-wrap gap-3"
					role="alert"
				>
					<span>{error}</span>
					<button
						type="button"
						className="btn btn-outline-danger btn-sm"
						onClick={() => loadContacts(dispatch)}
						disabled={isBusy}
					>
						Retry
					</button>
				</div>
			) : null}

			{isLoadingContacts && !hasLoadedContacts ? (
				<div className="contact-feedback-card text-center">
					<div className="spinner-border text-success mb-3" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
					<h2 className="h5">Loading contacts...</h2>
					<p className="text-muted mb-0">
						Connecting to the 4Geeks contacts API and syncing the agenda.
					</p>
				</div>
			) : null}

			{hasLoadedContacts && contacts.length === 0 ? (
				<div className="contact-feedback-card text-center">
					<h2 className="h4 mb-2">No contacts yet</h2>
					<p className="text-muted mb-4">
						Create the first contact and it will be persisted in the shared
						agenda.
					</p>
					<Link to="/add" className="btn btn-primary">
						Create your first contact
					</Link>
				</div>
			) : null}

			<div className="d-grid gap-3">
				{contacts.map((contact) => (
					<ContactCard key={contact.id} contact={contact} />
				))}
			</div>

			{hasLoadedContacts && contacts.length > 0 ? (
				<footer className="text-center mt-4 contact-count">
					Total contacts: {contacts.length}
				</footer>
			) : null}
		</section>
	);
};

export default ContactList;
