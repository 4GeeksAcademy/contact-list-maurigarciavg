import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<button className="btn btn-primary">Contacts</button>
				</Link>
				<div className="ml-auto">
					<Link to="/add">
						<button className="btn btn-primary">Add New Contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};