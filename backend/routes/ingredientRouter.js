// Base requires:
const express = require('express');
const router = express.Router();

// App requires/middleware
const ingredients = require('../data/helpers/ingredientModel');


/* ---------- Endpoints for /api/ingredients ---------- */

/* GET by RecipeID (list) */
router.get('/recipe/:id', (req, res) => {
  const { id } = req.params;

  ingredients.getByRecipe(id)
    .then( (ing) => {
      res.json(ing);
    })
    .catch( (err) => {
      res.status(500).json({ error: `Ingredients for recipe ${id} could not be retrieved: ${err}.` });
    });
});

/* GET by Ingredient Name */
router.get('/name', (req, res) => {
  const ing = req.body;

  // Check for empty name
  if( !ing.name ) {
    res.status(400).json({ error: "Missing ingredient name." });
  }
  ingredients.getByName(ing.name)
    .then( (list) => {

      if( list.length < 1 ) {
        res.status(404).json({ error: `Ingredient ${ing.name} not found.` });
      } else {
        res.json(list);
      }
    })
    .catch( (err) => {
      res.status(500).json({ error: `Ingredient ${ing.name} could not be retrieved: ${err}` });
    });
});




/* ---------- Export ---------- */
module.exports = router;