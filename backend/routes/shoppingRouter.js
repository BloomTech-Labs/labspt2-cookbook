// Base requires:
const express = require('express');
const router = express.Router();

// App requires/middleware
const shopping = require('../data/helpers/shoppingModel');


/* ---------- Endpoints for /api/list ---------- */

/* Get by userId & date */
router.get('/user/:id/date/:date', (req, res) => {
  const { id, date } = req.params;

  shopping.getUserDate(id, date)
    .then( (list) => {
      res.json(list);
    })
    .catch( (err) => {
      res.status(500).json({ error: `Could not get users shopping list: ${err}`});
    });
});


/* Post new list item */
router.post('/user/:id', (req, res) => {
  const { id } = req.params;
  const item = req.body;

  /* Check for missing fields */
  if( !item.ing_id || !item.start || !item.end ) {
    res.status(400).json({ message: "Missing required field: item, start or end date." });
  } else {
    // Send the insert
    shopping.insert(id, item)
      .then( (list) => {
        res.json(list);
      })
      .catch( (err) => {
        res.status(500).json({ error: `Could not post new list item: ${err}` });
      });
    // end insert
  }
});



/* ---------- Export ---------- */
module.exports = router;