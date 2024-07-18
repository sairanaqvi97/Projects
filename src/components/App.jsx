import { Route, Routes } from "react-router-dom"; // Módulo requerido para trabajar con rutas internas al proyecto
import { useState } from "react";
import Header from "./Header/Header";
import Home from './Home/Home';
import Login from './Login/Login'
import NotFound from "./NotFound/NotFound";
import AuthRoute from "./Auth/AuthRoute";
import Form from "./Form/Form";
import List from "./List/List"
import RecipeDetail from "./RecipeDetail/RecipeDetail"
import { RecipeContext, useRecipeContext } from "./context/RecipeContext";


function App() {

  const dataLocal = JSON.parse(localStorage.getItem('userData')); // Variable creada para alojar los datos de login guardados en el localStorage (que tendrán x duración). Para extraerlos se ejecuta el método .getItem('userData')
  // Además como para guardarlos se transforman en lenguaje .JSON (legible por este sistema), para extraerlos y trabajar con ellos en Js, se deben volver a convertir a su estado original (en este caso objeto) mediante el método JSON.parse().

  // Variable de estado para alojar el token de validación de acceso al usuario a las rutas privadas. Se debe pasar como props a las funciones de los componentes que vayan a utilizarla y como argumento al elemento html aquí importado:
  // La función asociada "setUserData" se pasará al componente "Login" como props para que cambie su estado inicial con los datos introducidos por el usuario y se produzca la verificación
  // Como valor inicial a la variable de estado se le asigna los datos guardados en el localStorage (alojados en la variable arriba creada "dataLocal"), que tendran x duración definida por cada API. De esta forma el usuario permanecerá logueado ese tiemo y no se pedirá de nuevo el login para acceder a las rutas privadas. Una vez pasado ese tiempo, los datos se borran del localStorage y se deberá repetir de nuevo todo el proceso de login y peticion API
  // La variable de estado "userData" se pasará al componente "AuthRoute" como props de su función para que valide los datos enviados por el usuario y alojados en esta variable
  const [userData, setUserData] = useState(dataLocal);
  const recipesContext = useRecipeContext()

  return (
    <>
    <RecipeContext.Provider value={recipesContext} >
<List></List>

     <Routes>
        <Route path='/' element={<Login setUserData={setUserData} />} />
        <Route
          path='/inicio'
          element={
            <main>
              <Header setUserData={setUserData} userData={userData} />
              <AuthRoute userData={userData} component={<Home userData={userData} />} />
            </main>}
        />

        <Route
          path='/list'
          element={
            <main>
              <Header setUserData={setUserData} userData={userData} />
              <AuthRoute userData={userData} component={<List />} />
            </main>}
        />

        <Route
          path='/form'
          element={
            <main>
              <Header setUserData={setUserData} userData={userData} />
              <AuthRoute userData={userData} component={<Form />} />
            </main>}
        />
        <Route path='*' element={<NotFound />} />

        <Route path="/recipe/:idRecipe"></Route>
      </Routes>
    
</RecipeContext.Provider>
    </>
  );
}

export default App 
