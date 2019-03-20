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
    .catch((err) => {
      res.status(500).json({ error: `Ingredients for recipe ${id} could not be retrieved: ${err}.` });
    });
});


/* ---------- Export ---------- */
module.exports = router;