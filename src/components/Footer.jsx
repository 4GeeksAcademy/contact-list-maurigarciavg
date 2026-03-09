import { FaHeart } from "react-icons/fa";

export const Footer = () => (
	<footer className="footer mt-auto py-4 text-center">
		<p className="mb-0 text-light-emphasis">
			Made with <FaHeart className="text-danger mx-1" /> using React by{" "}
			<a
				href="https://github.com/maurigarciavg"
				target="_blank"
				rel="noreferrer"
				className="footer-link"
			>
				Mauri
			</a>
		</p>
	</footer>
);
