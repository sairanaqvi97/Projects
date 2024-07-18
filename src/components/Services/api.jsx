// COMPONENTE 5. Componente creado para definir las peticiones a las APIs necesarias en la web

// PETICIÓN API - LOGIN
// 1. Se define una Función para realizar una petición a la API donde se guardan los datos de acceso. En este caso no es GET (pedir datos), sino POST, enviar la información introducida por el usuario en el componente Login (alojada en la variable de estado "user") a la API con el objetivo de obtener una respuesta de validación de acceso. Si es positiva, la API devuelve el token o clave de validación del usuario logueado.
// Como parámetro, la función recibirá el objeto alojado en la variable de estado (user) que ha introducido el usuario en el formulario
// 2. PETICION FETCH A LA API
// La peticion fetch debe de llevar un "return", pues lo que se necesita es recoger la respuesta de validación de la API, es decir el token.
// El primer parámetro será la URL de la API
// Como segundo parámetro de la petición se definen otras propiedades que requiere la API de destino (esta información la facilita el proveedor de la API): el método "method" de envio (POST), las cabeceras "headers", y el objeto "body" de envío (user) transcrito a lenguaje JSON (body: JSON.stringify(user)). El "method" y el "body" son obligatorios.
// En el primer .then se recoge la respuesta de la API (response) y se aplica el método .json igualmente para traducirla a este lenguaje
// 3. Llamar y ejecutar la función desde el componente que se necesite hacer la petición a la API y desde el que se vaya a trabajar con la respuesta obtenida. En este caso desde el componente Login y será la función manejadora del evento onSubmit (se ejeccutará cuando el usuario envie el formulario)
// Como las peticiones a API devuelven la información tipo promesa, se necesita ejecutar el método .then en la función que ejecute esta petición en el componente "login" (este método .then seria el que iría en esta función "getDataFromApi" tras traducir la info a .json, pero como en este caso se utiliza en otro componente, se aplica alli)

const getDataFromApi = (user) => {

    user.expiresInMins = 30; // Esta API requiere la propiedad de tiempo máximo de login, es decir, tiempo máximo que el navegador mantiene la sesión iniciada (guarda el token de acceso de un usuario en el localStorage) sin solicitar de nuevo el login. Este método se debe ejecutar en la función creada para llamar a la API desde el componente login

    return fetch('https://dummyjson.com/auth/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }).then(response => response.json());
}

// PETICION API - PERFIL USUARIO
// Función para ejecutar la petición a la misma API pero para que nos devuelva los datos de perfil de cada usuario, por lo que en este caso se aplicará el método GET (method: GET) y se apuntará a un endpoint diferente de la URL (esto depende de la estructura de cada API). El parámetro que se le pasa a la función es el token del usuario, para que nos devuelva la información de ese perfil concretamente.
// En este caso en la propiedad headers se debe añadir también el token del usuario para solicitar la autorización de la API y nos de la información ya que se trata de una ruta privada.
// En el primer .then se recoge la respuesta de la API (response) y se aplica el método .json igualmente para traducirla a este lenguaje y el segundo .then se ejecutará en el componente donde se llame a esta función para utilizar alli estos datos
const getDataUser = (token) => {
    return fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
        },
    }).then((response) => response.json());
};


export { getDataFromApi, getDataUser };
// Se debe exportar el archivo como un objeto ya que se definen varias peticiones a la API y cada una se va a utilizar desde un componente, en el cual solo se importa la función de la petición necesaria.
// Se debe eliminar el método "default" para que permita exportar objeto, sino dará error