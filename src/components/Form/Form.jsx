import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";

function FormMeal() {
    const context = useContext(RecipeContext);
    const navigate = useNavigate();

    const INITIAL_STATE = {
        id: '',
        type: '',
        name: '',
        image: '',
        description: '',
        ingredients: [],
        weekday: ''
    };

    const [newRecipe, setNewRecipe] = useState(INITIAL_STATE);

    // Función para crear nuevo producto con los datos recogidos del formulario
    const changeNewRecipe = (key, value) => {
        setNewRecipe({ ...newRecipe, [key]: value });
    };

    const handleInput = (e) => {
        changeNewRecipe(e.target.id, e.target.value);
    };

    const handleForm = (e) => {
        e.preventDefault();
        context.addNewMeal(newRecipe)
            .then(() => {
                setNewRecipe(INITIAL_STATE);
                navigate('/list');
            })
            .catch(error => {
                console.error('Error adding recipe: ', error);
            });
    };

    return (
        <>
            <form onSubmit={handleForm}>
                <fieldset>
                    <legend>Añadir nueva comida</legend>
                    <div>
                        <label htmlFor="id">Ref. comida </label>
                        <input id="id" name="id" value={newRecipe.id} onChange={handleInput}></input>
                    </div>
                    <div>
                        <label htmlFor="name">Nombre del plato </label>
                        <input id="name" name="name" value={newRecipe.name} onChange={handleInput}></input>
                    </div>
                    <div>
                        <label htmlFor="type">Tipo de comida </label>
                        <input id="type" name="type" value={newRecipe.type} onChange={handleInput}></input>
                    </div>
                    <div>
                        <label htmlFor="image">Imagen </label>
                        <input id="image" name="image" value={newRecipe.image} onChange={handleInput}></input>
                    </div>
                    <div>
                        <label htmlFor="description">Descripción </label>
                        <input id="description" name="description" value={newRecipe.description} onChange={handleInput}></input>
                    </div>
                    <div>
                        <label htmlFor="ingredients">Ingredientes </label>
                        <input id="ingredients" name="ingredients" value={newRecipe.ingredients} onChange={handleInput}></input>
                    </div>
                    <div>
                        <label htmlFor="weekday">Día de la semana </label>
                        <input id="weekday" name="weekday" value={newRecipe.weekday} onChange={handleInput}></input>
                    </div>
                    <button>Crear comida</button>
                </fieldset>
            </form>
        </>
    );
}

export default FormMeal;
