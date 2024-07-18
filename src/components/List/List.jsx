import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext, useRecipeContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

function List() {

  const { recipes, loading, error } = useContext(RecipeContext);
  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const groupedByDay = recipes.reduce((acc, recipe) => {
    const day  = recipe.weekDay;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(recipe);
    return acc;
  }, {});

 
  return (
    <div>
      <h1>Recipes</h1>
      {Object.keys(groupedByDay).map((day) => (
        <div key={day}>
          <h2>{day}</h2>
          <ul>
            {groupedByDay[day].map((recipe) => (
              <li key={recipe.id}>
                <Link to={`/Recipe/${recipe.id}`}>
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
  
  
export default List;