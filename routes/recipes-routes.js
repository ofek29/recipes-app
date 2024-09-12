const express = require('express');
const router = express.Router();
const path = require('path')

// const recipesController = require('../controllers/recipesController');


router.get('/recipes', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public', 'recipes.html'))
});

router.get('/shopping-list', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public', 'shoppingList.html'))
});

module.exports = router;