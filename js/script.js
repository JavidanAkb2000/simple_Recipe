// Recipe Class
class Recipe {
    constructor(name, img, cookTime, ingredients) {
        this.name = name;
        this.img = img;
        this.cookTime = cookTime;
        this.ingredients = new Set(ingredients.split(',').map(item => item.trim()));
    }
}

// Recipe App
class RecipeApp {
    constructor() {
        this.recipes = new Map();
    }

    addRecipe(name, img, cookTime, ingredients) {
        const recipe = new Recipe(name, img, cookTime, ingredients);
        this.recipes.set(name, recipe);
        this.renderRecipes();
    }

    deleteRecipe(name) {
        this.recipes.delete(name);
        this.renderRecipes();
    }

    renderRecipes() {
        const recipeList = document.getElementById('recipe-list');
        recipeList.innerHTML = '';

        this.recipes.forEach((recipe, name) => {
            const recipeItem = document.createElement('div');
            recipeItem.classList.add('recipe-item');
            recipeItem.innerHTML = `
            <div class="recipe-item bg-white rounded-lg shadow-md p-4">
            <h3 class="text-xl font-semibold mb-2">${recipe.name}</h3>
            <img src="${recipe.img}" alt="${recipe.name}" class="w-full h-auto rounded-md mb-2">
            <p class="text-gray-600">Cook Time: ${recipe.cookTime} minutes</p>
            <p class="text-gray-600">Ingredients:</p>
            <ul class="list-disc ml-6">
                ${[...recipe.ingredients].map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <button onclick="app.deleteRecipe('${name}')"
                    class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md mt-4 focus:outline-none focus:ring focus:ring-red-200">
                Delete
            </button>
        </div>
        
            `;
            recipeList.appendChild(recipeItem);
        });
    }
}

const app = new RecipeApp();

// Callback for adding a recipe
function addRecipe() {
    const nameInput = document.getElementById('recipe-name');
    const imgInput = document.getElementById('recipe-img');
    const cookTimeInput = document.getElementById('recipe-cook-time');
    const ingredientsInput = document.getElementById('recipe-ingredients');
    
    const name = nameInput.value.trim();
    const img = imgInput.value.trim();
    const cookTime = parseInt(cookTimeInput.value);
    const ingredients = ingredientsInput.value.trim();
    
    if (name !== '' && img !== '' && !isNaN(cookTime) && ingredients !== '') {
        app.addRecipe(name, img, cookTime, ingredients);
        nameInput.value = '';
        imgInput.value = '';
        cookTimeInput.value = '';
        ingredientsInput.value = '';
    } else {
        alert('Please fill out all fields correctly.');
    }
}

// Rendering
app.renderRecipes();
