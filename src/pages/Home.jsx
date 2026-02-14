import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import './home.css'


export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			
			<div className="contactCard">
				<div className="name">Nombre</div>
				<div className="address">Dirección</div>
				<div className="phone">Telefono</div>
				<div className="email">email</div>
				
			</div>
		</div>
	);
}; 