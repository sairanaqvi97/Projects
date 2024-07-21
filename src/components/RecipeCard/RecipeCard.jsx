import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';


  function RecipeCard() {
    const { recipes, loading, error } = useContext(RecipeContext);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    const organizeMealsByDay = (recipes) => {
      return recipes.reduce((acc, recipe) => {
        const day = recipe.weekday || 'Sin día';
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push(recipe);
        return acc;
      }, {});
    };
  
    const organizedMeals = organizeMealsByDay(recipes);
  
    return (
      <div>
        <h1>Recipes</h1>
        {Object.keys(organizedMeals).map((day) => (
          <div key={day}>
            <h2>{day}</h2>
            <ul>
              {organizedMeals[day].map((recipe) => (
                <li key={recipe.id}>
                  <Link to={`/recipe/${recipe.id}`}>
                    <h2>{recipe.name}</h2>
                    <img src={recipe.image} alt={recipe.name} />
                    <p>{recipe.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  
  export default RecipeCard;