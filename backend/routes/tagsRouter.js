// Base requires:
const express = require('express');
const router = express.Router();

// App requires/middleware
const tags = require('../data/helpers/tagsModel');


/* ---------- Endpoints for /api/tags ---------- */

//get 

router.get('/', (req, res) =>{
    
    tags.getAll()
    .then(tag =>{
        res.json(tag);
    })
    .catch((err) =>{
        res
        .status(500)
        .json({error: "Tags could not be retrieved."})
    })
})

//get//api/tags/recipe/id

router.get('/recipe/:id', (req, res) =>{
    const recipe_id = req.params.id;

    tags.getByRecipe(recipe_id)
    .then(tags =>{
        if(tags.length !== 0){
            res.json(tags)
        } else {
            res
            .status(404)
            .json({error: "Recipe does not exist"})
        }

    })
    .catch(err =>{
        res
        .status(500)
        .json({error : "Tags could not be retrieved"})
    })
})

//post//api/tags/recipe/id
router.get('/recipe/:id', (req, res) =>{
    const recipe_id = req.params.id;
    const tag = req.body;

    tags.insert(tag, recipe_id)
    .then(id =>{
        console.log(id)
        res.json(id)
    })
    .catch(err =>{
        console.log(err)
    })
})




/* ---------- Export ---------- */
module.exports = router;