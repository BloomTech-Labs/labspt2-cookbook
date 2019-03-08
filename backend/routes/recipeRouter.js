// Base requires:
const express = require('express');
const router = express.Router();

// App requires/middleware
const recipes = require('../data/helpers/recipeModel');


/* ---------- Endpoints for /api/recipes ---------- */

/* GET (list) */


/* GET by id */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  recipes.get(id)
    .then((rec) => {
      let [recipe, ingredients, directions] = rec;
      recipe = recipe[0];
      res.json({ ...recipe, ingredients: ingredients, directions: directions });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });

});



/* POST */
router.post( '/', (req, res) => {
  const recipeData = req.body;

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
      //res.json(id);
    })
    .catch( (err) => {
      res.status(500).json({ error: err})
    });
});


/* PUT */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const recipeEdit = req.body;

  if (recipeEdit.name && recipeEdit.link) {
    recipes.update(id, recipeEdit)
      .then((recipe) => {
        if (id) {
          res.json({ message: "Recipe has been updated." })
        } else {
          res.status(400).json({ message: "Recipe with specified ID does not exist." })
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Failed to update recipe." })
      })
  } else {
    res.status(404).json({
      message: "Missing name or link."
    })
  }
});


/* DELETE */
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  recipes.remove(id)
    .then((recipe) => {
      if (id) {
        res.json({ message: "User has been deleted." })
      } else {
        res.status(400).json({ message: "Recipe with specified ID does not exist." })
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete recipe." })
    })
});

/* ---------- Export ---------- */
module.exports = router;