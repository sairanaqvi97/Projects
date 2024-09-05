// COMPONENTE 2. Formulario de Login para validar a un usuario el acceso a las rutas privadas de la web. 

import { useState } from "react";
import { getDataFromApi } from "../Services/api";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css"
import foodieplannerlogo from "../../media/foodieplannerlogo.svg"


// Se debe importar la función "getDataFromApi" definida en el componente "api.jsx" que ejecuta la petición a la API donde estarán los valores que permitan validad el login.
// Como hay definidas varias peticiones en el archivo "api.jsx", se debe importar entre llaves

function Login({ setUserData }) {
    const INITIAL_STATE = {
        username: '',
        password: '',
    }; // variable objeto con valores vacíos, creada para definir el estado inicial del formulario. Esta variable "INITIAL_STATE" se le pasa como contenido inicial a la variable de estado definida para alojar los valores que el usuario introduzca para loguearse
    // La estructura del objeto debe coincidir con la estructura de objetos que tiene definida la API a la que se le hace la petición para validar el login(en este caso se ha cogido una API de muestra https://dummyjson.com/docs/auth#auth-login, donde estas propiedades son username y password). 
    // Esta estructura de objeto "user" definida por la API para el login, suele tener más propiedades (id, email, gender, image, token...), pero en este caso del acceso, se deben definir las que estan establecidas como condición para permitir a un usuario loguearse

    const navigate = useNavigate();

    const [user, setUser] = useState(INITIAL_STATE); // Variable de estado creada para alojar los valores introducidos en el formulario pintado abajo de Login. En este caso se ha creado en el mismo componente porque son datos que solo se van a utilizar en este componente para validar si el usuario accede o no a las rutas privadas

    const handleInput = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value });
    }; // Función manejadora del evento onChange definido sobre el elemento <form></form> para llamar a la función "setUser" de la variable de estado "user" (cuyo estado inicial es objeto vacío) y pasarle los valores introducidos por el usuario.
    // Para ello esta función "setUser" ejecutará el codigo definido: copia el objeto guardado en la variable de estado (...user) y le pasa el contenido recogido por el evento (e). Como propiedad clave para localizar el usuario en la API se ha definido "id" (es una propiedad que en este caso existe en la API, sino poner "username" u otra que tenga el objeto en la API)

    const handleForm = (e) => {
        e.preventDefault();
        getDataFromApi(user).then((data) => {
            localStorage.setItem("user", JSON.stringify(data)); // Método para guardar el token de acceso en el localStorage, es decir, guardar los datos en el navegador para que cuando se recargue la página no vuelva a pedir el login. El tiempo máximo de login estará definido en la petición (user.expiresInMins = 30;) realizada desde el componente "api.jsx"
            setUserData(data); // Se ejecuta la función de la variable de estado "userData" creada en el componente principal para alojar los datos de acceso del usuario, para que se le envíen y modifique su contenido inicia, cuando el usuario haga login y se produzca la verificación
            navigate('/inicio');

        });
    }; // Función manejadora del evento onSubmit que ejecuta la petición a la API definida en el componente "api.jsx" (debe importarse). Para ello llama a la función "getDataFromApi" que realiza la petición a la API en dicho componente y le pasa como parámetro la información a enviar aquí (user)
    // Esta información viene de una petición y por lo tanto es una promesa, por lo que se le debe ejecutar el método .then para traducirla (este método .then seria el que iría en la propia función "getDataFromApi" tras traducir la info a .json, pero como en este caso se utiliza en este componente, se aplica aqui) 
    return (
        <div className="container">
            <div className="login-box">
           <div> <img className= "logo" src={foodieplannerlogo} alt="foodie-planner-logo" /> </div> 
      <h2 className="description">Inicia sesión </h2>
                <form className='form' action='' onChange={handleInput} onSubmit={handleForm}>
                    
                    <div className="input-field">
                    <label htmlFor='username'>Nombre de usuario</label>
                    <input type="text" id='username' name='username' />
                    </div>
                    <div className="input-field">
                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' name='password' id='password' />
                    </div>
                    <button className="submit-button" type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login

