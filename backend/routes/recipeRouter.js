// Base requires:
const express = require('express');
const router = express.Router();

// App requires/middleware
const recipes = require('../data/helpers/recipeModel');


/* ---------- Endpoints for /api/recipes ---------- */

/* GET (list) */


/* GET by id */
router.get( '/:id', (req, res) => {
  const { id } = req.params;

  recipes.get(id)
    .then( (rec) => {
      let [recipe, ingredients, directions] = rec;
      recipe = recipe[0];
      res.json({...recipe, ingredients: ingredients, directions: directions });
    })
    .catch( (err) => {
      res.status(500).json({ error: err});
    });

});



/* POST */
router.post( '/', (req, res) => {
  const recipeData = req.body;

  recipes.insert(recipeData).then( (newId) => {res.json(newId);}).catch( (err) => {res.status(500).json({ error: err})});
});


/* PUT */



/* DELETE */


/* ---------- Export ---------- */
module.exports = router;