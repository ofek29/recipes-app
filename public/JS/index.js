function getCookie() {
    fetch('/', {
        method: 'GET',
        credentials: 'include',
    })
        .then(data => {
            console.log('im data', data, data.username);

            if (data.username) {
                console.log(data.username + ' get cookie');
                return data.username;
            }
            else {
                console.log('No username in cookie');
                return null;
            }
        })
        .catch(err => {
            console.error(err, 'isnot working');
            return null;
        });
}

function isUserLoggedIn() {
    console.log('isUserLogin func ');

    const username = getCookie();
    try {
        if (username) {
            console.log(`${username} is user logged in`);
            updateNavbarUsername(username);
        }
    } catch (error) {
        console.error('Error checking user login:', error);
    }
}

isUserLoggedIn();

function updateNavbarUsername(username) {

    const signInLink = document.getElementById('sign-in-link');
    const signUpLink = document.getElementById('sign-up-link');
    const userNameLink = document.getElementById('user-name-link');
    const logoutLink = document.getElementById('logout-link');

    userNameLink.textContent = username;

    signInLink.style.display = 'none';
    signUpLink.style.display = 'none';
    userNameLink.style.display = 'inline';
    logoutLink.style.display = 'inline';

}
// function logout() {
//     document.cookie = 'myToken=; Max-Age=0; path=/';
//     window.location.href = 'login.html';
// }


// //recipes gallery build
// document.addEventListener('DOMContentLoaded', () => {
//     const recipeGallery = document.getElementById('recipe-gallery');
//     if (recipeGallery) {
//         recipes.forEach((recipe, index) => {
//             const card = document.createElement('div');
//             card.className = 'recipe-card';
//             card.innerHTML = `
//           <img src="${recipe.image}" alt="${recipe.name}">
//           <h3>${recipe.name}</h3>
//           <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
//           <button class="save-recipe-button" data-index="${index}">Save Recipe</button>
//         `;
//             recipeGallery.appendChild(card);
//         });
//     }
// });


// // Search bar imp.
// const searchBar = document.getElementById('search-bar');
// if (searchBar) {
//     searchBar.addEventListener('input', (e) => {
//         const query = e.target.value.toLowerCase();
//         const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(query));

//         recipeGallery.innerHTML = '';
//         filteredRecipes.forEach((recipe, index) => {
//             const card = document.createElement('div');
//             card.className = 'recipe-card';
//             card.innerHTML = `
//             <img src="${recipe.image}" alt="${recipe.name}">
//             <h3>${recipe.name}</h3>
//             <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
//             <button class="save-recipe-button" data-index="${index}">Save Recipe</button>
//           `;
//             recipeGallery.appendChild(card);
//         });
//     });
// }

// // Save recipe functionality
// document.addEventListener('click', (e) => {
//     if (e.target.classList.contains('save-recipe-button') && checkSignInStatus()) {

//         const index = e.target.getAttribute('data-index');
//         const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
//         savedRecipes.push(recipes[index]);
//         localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
//         alert(`${recipes[index].name} has been saved to your list.`);
//     }
// });

// //delete save recipe

// // saved recipes and generate shopping list
// document.addEventListener('DOMContentLoaded', () => {
//     const savedRecipesList = document.getElementById('saved-recipes-list');
//     const generateShoppingListButton = document.getElementById('generate-shopping-list');

//     if (savedRecipesList) {
//         const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
//         savedRecipes.forEach(recipe => {
//             const listItem = document.createElement('li');
//             listItem.textContent = recipe.name;
//             savedRecipesList.appendChild(listItem);
//         });
//     }

//     if (generateShoppingListButton) {
//         generateShoppingListButton.addEventListener('click', () => {
//             const shoppingListItems = document.getElementById('shopping-list-items');
//             shoppingListItems.innerHTML = '';

//             const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
//             const ingredients = savedRecipes.flatMap(recipe => recipe.ingredients);
//             const uniqueIngredients = [...new Set(ingredients)];

//             uniqueIngredients.forEach(ingredient => {
//                 const listItem = document.createElement('li');
//                 listItem.textContent = ingredient;
//                 shoppingListItems.appendChild(listItem);
//             });

//             alert('Shopping list generated.');
//         });
//     }
// });
