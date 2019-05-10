// Base requires:
const express = require('express');
const router = express.Router();

// App requires/middleware
const recipes = require('../data/helpers/recipeModel');


/* ---------- Endpoints for /api/recipes ---------- */

/* GET (list) by user ID */
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

/* GET by recipe id */
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
router.post( '/', async (req, res) => {
  const recipeData = req.body;

  // Check for missing data first.
  if( !recipeData.user_id || !recipeData.link )
  {
    res.status(400).json({ error: "Missing data." });
  }
  else {
    await recipes.insert(recipeData)
      .then( (id) => {

        recipes.get(id)
        .then( (rec) => {
          let [recipe, ingredients, directions] = rec;
          recipe = recipe[0];
          res.json({...recipe, ingredients: ingredients, directions: directions });
        })
        .catch( (err) => {
          res.status(500).json({ error: `Could not get recipe: ${err}` });
          
        });
      })
      .catch( (err) => {
        res.status(500).json({ error: `Could not post recipe: ${err}` });
        
      });
    // end-recipe-insert
  }
});


/* DELETE */
router.delete( '/:rid/user/:uid', (req, res) => {
  const { rid, uid } = req.params;
  
  recipes.delete(uid, rid)
    .then( res.json({ success: "Deleted recipe from user." }) )
    .catch( (err) => {
      res.status(500).json({ error: "Could not delete recipe from user." });
    });
});

/* ---------- Export ---------- */
module.exports = router;
