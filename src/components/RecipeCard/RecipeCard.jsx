import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import "../RecipeCard/RecipeCard.css"

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
      <div className='recipe-list'>
        <h1 className='recipe-list-title'>Recipes</h1>
        {Object.keys(organizedMeals).map((day) => (
          <div className='recipe-day-section' key={day}>
            <h2 className='recipe-day'>{day}</h2>
            <ul className='detail-list'>
              {organizedMeals[day].map((recipe) => (
                <li className='recipe-item' key={recipe.id}>
                  <Link to={`/recipe/${recipe.id}`}>
                    <h2 className='recipe-name'>{recipe.name}</h2>
                    <img className='recipe-img' src={recipe.image} alt={recipe.name} />
                    <p className='recipe-description'>{recipe.description}</p>
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