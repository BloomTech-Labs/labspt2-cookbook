// Base requires:
const express = require('express');
const router = express.Router();

// App requires/middleware
const recipes = require('../data/helpers/recipeModel');


/* ---------- Endpoints for /api/recipes ---------- */

/* GET (list) */
router.get( '/user/:id', (req, res) => {
  const { id } = req.params;

  recipes.getByUserId(id)
    .then( (list) => {
      let [recipe] = list;
      //recipe = recipe[0];
      res.json({...recipe});
    })
    .catch( (err) => {
      res.status(500).json({ error: `Could not get list of recipes. ${err}`});
    });
});

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

  if( !recipeData.user_id || !recipeData.name || !recipeData.link )
  {
    res.status(400).json({ error: "Missing data." });
  }
  else {
    recipes.insert(recipeData)
      .then( (id) => {
        recipes.get(id)
        .then( (rec) => {
          let [recipe, ingredients, directions] = rec;
          recipe = recipe[0];
          res.json({...recipe, ingredients: ingredients, directions: directions });
        })
        .catch( (err) => {
          res.status(500).json({ error: err});
        });
      })
      .catch( (err) => {
        res.status(500).json({ error: err})
      });
    // end-recipe-insert
  }
});


/* PUT */



/* DELETE */


/* ---------- Export ---------- */
module.exports = router;