// Base requires:
const express = require('express');
const router = express.Router();

// App requires/middleware
const tags = require('../data/helpers/tagsModel');


/* ---------- Endpoints for /api/tags ---------- */

/* GET all tags */
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

/* GET recipe's tags */
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

/* PUT */
router.put('/:id', (req, res) =>{
    const tag = req.body;
    const id = req.params.id;

    if(tag.tag){
        tags.update(id, tag)
        .then(tag =>{
            res.json(tag)
        })
        .catch(err =>{
            res.status(500).json({error: "Could not update tag"})
        })
    } else {
        res.status(400).json({error:"Missing data"})
    }
    
})

/* POST */
router.post('/recipe/:id', (req, res) =>{
    const recId = req.params;
    const tag = req.body;

    if(tag.tag){
        tags.insert(tag, recId)
        .then(id =>{
            res.json(id)
        })
        .catch(err =>{
            res
            .status(500)
            .json({error: "Could not add tag to database"})
        })
    } else {
        res.status(400).json({error: "Missing data"});
    }
    
})


/* DELETE by recipe id */
router.delete('/recipe/:id/:tagId', (req, res) =>{
    const recId = req.params.id;
    const tagId = req.params.tagId;

    tags.remove(tagId, recId)
    .then(count =>{
        res.json(count)
    })
    .catch(err =>{
        res.status(500).json({error:"Could not delete tag"})
    })
}) 

/* DELETE from all */
router.delete('/:id', (req, res) =>{
    const tagId = req.params.id;

    tags.totalRemove(tagId)
    .then(count =>{
        res.json(count)
    })
    .catch(err =>{
        res.status(500).json({error:"Could not delete tag"})
    })
}) 


/* ---------- Export ---------- */
module.exports = router;