import {
	createBrowserRouter,
	createRoutesFromElements,
	Route
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import ContactList from "./pages/ContactList";
import ContactForm from "./pages/ContactForm";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<Layout />}
			errorElement={
				<section className="container py-5">
					<div className="contact-feedback-card text-center">
						<h1 className="h4 mb-2">Page not found</h1>
						<p className="text-muted mb-0">
							This route does not exist in the contact manager.
						</p>
					</div>
				</section>
			}
		>
			<Route index element={<ContactList />} />
			<Route path="add" element={<ContactForm />} />
			<Route path="edit/:id" element={<ContactForm />} />
		</Route>
	)
);
