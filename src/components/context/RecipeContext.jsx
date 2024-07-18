import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getDataRecipes } from "../Services/recipeApi";

export const RecipeContext = createContext();
export const useRecipeContext = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDataRecipes()
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  console.log(recipes);

  return { recipes, setRecipes, loading, setLoading, error, setError };
};
