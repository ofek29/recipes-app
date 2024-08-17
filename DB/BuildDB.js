const { sql, appPool } = require('./connectToDB');

const recipes = [
    {
        name: 'Spaghetti Bolognese',
        ingredients: [
            { name: 'Spaghetti', quantity: 200, quantity_unit: 'grams' },
            { name: 'Ground beef', quantity: 250, quantity_unit: 'grams' },
            { name: 'Tomato sauce', quantity: 300, quantity_unit: 'ml' },
            { name: 'Onion', quantity: 1, quantity_unit: 'unit' },
            { name: 'Garlic', quantity: 2, quantity_unit: 'cloves' }
        ],
        image: 'spaghetti-bolognese.jpeg'
    },
    {
        name: 'Chicken Curry',
        ingredients: [
            { name: 'Chicken', quantity: 300, quantity_unit: 'grams' },
            { name: 'Curry powder', quantity: 2, quantity_unit: 'tbsp' },
            { name: 'Coconut milk', quantity: 400, quantity_unit: 'ml' },
            { name: 'Onion', quantity: 1, quantity_unit: 'unit' },
            { name: 'Garlic', quantity: 2, quantity_unit: 'cloves' },
            { name: 'Ginger', quantity: 1, quantity_unit: 'tsp' }
        ],
        image: 'Chicken-Curry.jpg'
    },
    {
        name: 'Vegetable Stir Fry',
        ingredients: [
            { name: 'Mixed vegetables', quantity: 300, quantity_unit: 'grams' },
            { name: 'Soy sauce', quantity: 3, quantity_unit: 'tbsp' },
            { name: 'Garlic', quantity: 2, quantity_unit: 'cloves' },
            { name: 'Ginger', quantity: 1, quantity_unit: 'tsp' },
            { name: 'Sesame oil', quantity: 1, quantity_unit: 'tbsp' }
        ],
        image: 'vegetarian-stir-fry-.jpg'
    },
    {
        name: 'Filet and Mushrooms',
        ingredients: [
            { name: 'Beef', quantity: 250, quantity_unit: 'grams' },
            { name: 'Shallots', quantity: 2, quantity_unit: 'units' },
            { name: 'Red wine', quantity: 100, quantity_unit: 'ml' },
            { name: 'Butter', quantity: 2, quantity_unit: 'tbsp' },
            { name: 'Mushrooms', quantity: 200, quantity_unit: 'grams' },
            { name: 'Thyme leaves', quantity: 1, quantity_unit: 'tsp' }
        ],
        image: 'beef-bowl.jpg'
    }
];

async function insertDataToDB() {
    try {
        const pool = await appPool;

        try {
            for (const recipe of recipes) {
                // Insert recipe
                const recipeResult = await pool.request()
                    .input('name', sql.VarChar, recipe.name)
                    .input('image_path', sql.VarChar, recipe.image)
                    .query('INSERT INTO recipes (name, image_path) OUTPUT INSERTED.id VALUES (@name, @image_path)');
                const recipeId = recipeResult.recordset[0].id;

                for (const ingredient of recipe.ingredients) {
                    // Check if ingredient exists
                    let ingredientResult = await pool.request()
                        .input('name', sql.VarChar, ingredient.name)
                        .query('SELECT id FROM ingredients WHERE name = @name');

                    let ingredientId;
                    if (ingredientResult.recordset.length === 0) {
                        // Insert ingredient
                        ingredientResult = await pool.request()
                            .input('name', sql.VarChar, ingredient.name)
                            .query('INSERT INTO ingredients (name) OUTPUT INSERTED.id VALUES (@name)');
                        ingredientId = ingredientResult.recordset[0].id;
                    } else {
                        ingredientId = ingredientResult.recordset[0].id;
                    }

                    // Insert recipe_ingredients relationship
                    await pool.request()
                        .input('recipe_id', sql.Int, recipeId)
                        .input('ingredient_id', sql.Int, ingredientId)
                        .input('quantity', sql.Int, ingredient.quantity)
                        .input('quantity_unit', sql.VarChar, ingredient.quantity_unit)
                        .query('INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, quantity_unit) VALUES (@recipe_id, @ingredient_id, @quantity, @quantity_unit)');
                }
            }
            console.log('Data inserted successfully');
        } catch (err) {
            console.error('Error inserting data:', err);
        }

    } catch (err) {
        console.error('Error connecting to database:', err);
    }
}

insertDataToDB();