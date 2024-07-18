// COMPONENTE 6. Componente de validación, para verificar si un usuario ha hecho loguin correctamente y la API ha devuelto su token de acceso. De esta forma no será necesario que el usuario se loguee cada vez que quiera acceder a una página con ruta privada (perfil, carrito, pedidos...)

import { Navigate } from "react-router-dom";

// Los componentes de validación no tienen html, únicamente el condicional para dar acceso o no al usuarioa una ruta privada.
// Para ello se le pasa como props ({userData, component}), es decir, la información de la variable de estado "userData" donde se alojan los datos introducidos por el usuario en el Login, y el componente a renderizar
// En el condicional se define que si (if) existe contenido en la variable de estado usuario (userData), es decir recibe datos de nuevo login de usuario, se devuelva o renderice el componente Profile; y sino (else) se renderice de nuevo el componente Login

function AuthRoute({ userData, component }) {
    if (userData) {
        return component;
    } else {
        return <Navigate to="/login" />
    }

}

export default AuthRoute