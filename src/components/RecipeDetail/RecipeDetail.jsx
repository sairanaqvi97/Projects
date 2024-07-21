import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { Link, useParams } from "react-router-dom";


function RecipeDetail() {
    const context = useContext(RecipeContext);

    const { idMeal } = useParams();
    const findMeal = context.recipes.find((recipe) => recipe.id === idMeal);

    return (
        <>
            {findMeal ? (
                <>
                    <h2>{findMeal.name}</h2>
                    <img src={findMeal.image} />
                    <h5>Tipo de comida</h5>
                    <p className="text-meal">{findMeal.type}</p>
                    <h5>Descripción</h5>
                    <p className="text-meal">{findMeal.description}</p>
                    <h5>Ingredientes</h5>
                    <p className="text-meal">{findMeal.ingredients}</p>
                </>
            ) : null}
            <Link to={'/list'}>Volver a Menu Semanal</Link>
        </>
    )
};

export default RecipeDetail