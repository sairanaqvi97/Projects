
  import React, { createContext, useState, useEffect } from 'react';

  export const RecipeContext = createContext();
  
  export const  useRecipeContext = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('https://668c1d430b61b8d23b0c7558.mockapi.io/WeeklyMenuApp/Recipe')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setRecipes(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching meals:', error);
          setError(error);
          setLoading(false);
        });
    }, []);
  
    const addNewMeal = (newMeal) => {
      return fetch('https://668c1d430b61b8d23b0c7558.mockapi.io/WeeklyMenuApp/Recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMeal),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(addedMeal => {
          setRecipes(prevRecipes => [...prevRecipes, addedMeal]);
          return addedMeal;
        })
        .catch(error => {
          console.error('Error:', error);
          throw error;
        });
    };
  
    const deleteMeal = (mealId) => {
      return fetch(`https://668c1d430b61b8d23b0c7558.mockapi.io/WeeklyMenuApp/Recipe/${mealId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        })
        .then(() => {
          setRecipes(prevRecipes => prevRecipes.filter(meal => meal.id !== mealId));
        })
        .catch(error => {
          console.error('Error deleting meal:', error);
        });
    };
  
    return { recipes, addNewMeal, deleteMeal, loading, error };
  };
  
  // export const RecipeProvider = ({ children }) => {
  //   const recipeContextValue = useRecipeContext();
  
  //   return (
  //     <RecipeContext.Provider value={recipeContextValue}>
  //       {children}
  //     </RecipeContext.Provider>
  //   );
  // };
  