import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://dummyjson.com/recipes?limit=100&skip=1&select=name,image')
            .then(response => response.json())
            .then(data => setRecipes(data.recipes));
    }, []);

    const recipesPerPage = 10;
    const pages = Math.ceil(recipes.length / recipesPerPage);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    return (
        <div>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {currentRecipes.map(recipe => (
                    <div key={recipe.id}>
                        <Link to={`/recipe/${recipe.id}`}>
                            <h3 className="p-3">{recipe.name}</h3>
                            <img src={recipe.image} alt={recipe.title} />
                        </Link>
                    </div>
                ))}
            </div>
            <div>
                {[...Array(pages).keys()].map(number => (
                    <button key={number + 1} onClick={() => setCurrentPage(number + 1)}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
