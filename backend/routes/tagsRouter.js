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



/* ---------- Export ---------- */
module.exports = router;