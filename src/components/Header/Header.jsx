// COMPONENTE 1. Header para pintar el menú con los enlaces a las páginas de la web. Será común a toda la web por lo que se debe renderizar en todos los componentes

import { Link, useNavigate } from "react-router-dom";
import "../Header/Header.css"
import foodieplannerlogo from "../../media/foodieplannerlogo.svg"

function Header({ setUserData, userData }) {
    const navigate = useNavigate(); // Hook propio de React que nos devuelve la función navigate, que nos permite hacer redirecciones programáticas de una URL al resultado de otra ruta. Se crea para redirigir al usuario a la home al realizar el logout de sesión

    const handleLogout = (e) => {
        setUserData(null);
        localStorage.removeItem('user');
        navigate('/');
    }; // Función manejadora del evento onClick del elemento <button></button> que ejecuta varias acciones en su código:
    // 1. Llama a la función de la variable de estado que tiene los datos del usuario logueado "setUserData" y los borra dándole valor vacío (null)
    // 2. Elimina el item "user" guardado en el localStorage para eliminar también los datos de acceso del navegador y se cierre la sesión por completo
    // 3. Llama la variable "navigate", la cual gracias al Hook ejecutado "useNavigate" permite renderizar el componente de la ruta indicada, en este caso la Home ("/")


    return (
        <header className="header">
            <div className="logo"><Link className="link" to="/inicio"><img src={foodieplannerlogo} alt="foodie-planner-logo" /></Link></div>
        <nav>
            <ul className="menu">
                <li className="menu-item"><Link className="link" to="/inicio">Inicio</Link></li>
                <li className="menu-item"><Link className="link" to="/list">Mis comidas</Link></li>
                <li className="menu-item"><Link className="link" to="/form">Nueva comida</Link></li>

                {userData && (
                    <li>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </li>
                )}

            </ul>
        </nav>
    </header>)
}

export default Header