import { useEffect, useState } from "react";
import { getDataUser } from "../Services/api";


// COMPONENTE 2. Página de inicio



function Home({ userData }) {
    const [data, setData] = useState(null); // Variable de estado creada para alojar los datos del perfil de usuario que se reciban de la API

   
    useEffect(() => {
        if (userData) {
            getDataUser(userData.token).then((info) => {
                console.log(info);
                setData(info);
            });
        }
    }, []);

    return (
        <div>
            {/* La estructura html que renderiza la información importada de la API del perfil de cada usuario también debe encerrarse dentro de un condicional, para que solo se ejecute, en este caso cuando haya datos en la variable de estado definida en este componente "data" (que será la que se llene cuando se ejecute la función de arriba "getDataUser"), y sino, no pasa nada. De esta forma evitamos que la página se rompa. Esto lo hacemos con un operador ternario: {nombreVariableEstado ? <html></html> : null}
             Es decir, la información del perfil de cada usuario solo se mostrará cuando el usuario haga login (petición POST previa "getDataFromApi"), se reciban los datos de perfil de un usuario alojandose en la variable de estado original "userData", se realice la segunda petición a la API de forma correcta (petición GET "getDataUser"), y se pasen los datos a la variable de estado "data" creada en este componente para alojar toda la información.  */}
            {data ?
                <article>
                    <h3>{data.firstName} {data.lastName} </h3>
                    <p>{data.university}</p>
                </article>
                : null}
        </div>
    )
}

export default Home