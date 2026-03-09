import { Link, NavLink } from "react-router-dom";
import { FaAddressBook, FaPlus } from "react-icons/fa";

export const Navbar = () => {
	return (
		<header className="site-header">
			<div className="container py-3 d-flex justify-content-between align-items-center flex-wrap gap-3">
				<Link to="/" className="brand-link">
					<FaAddressBook className="me-2" />
					<span>Contact Manager</span>
				</Link>

				<div className="d-flex align-items-center gap-2">
					<NavLink
						to="/"
						end
						className={({ isActive }) =>
							`btn btn-outline-light ${isActive ? "active-nav-link" : ""}`
						}
					>
						Contacts
					</NavLink>
					<Link to="/add" className="btn btn-success">
						<FaPlus className="me-2" />
						Add New Contact
					</Link>
				</div>
			</div>
		</header>
	);
};
