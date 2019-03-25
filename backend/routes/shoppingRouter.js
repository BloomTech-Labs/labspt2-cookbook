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


/* Get by shopping list id */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  shopping.getById(id)
    .then( (item) => {
      res.json(item);
    })
    .catch( (err) => {
      res.status(500).json({ error: `Could not get shopping list item` });
    });
});



/* POST new list item */
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


/* PUT update shopping list item */
router.put( '/:id', (req, res) => {
  const { id } = req.params;
  const newItem = req.body;

  /* Missing field check */
  if( !newItem.ing_id || !newItem.start || !newItem.end ) {
    res.status(400).json({ message: "Missing required field: ingredient id, start, or end date." });
  } else {
    // Update item
    shopping.update(id, newItem)
      .then( (list) => {
        res.json(list);
      })
      .catch( (err) => {
        res.status(500).json({ error: `Could not update shopping list item: ${err}` });
      });
    // end update
  }
});


/* DELETE */
router.delete( '/:id', (req, res) => {
  const { id } = req.params;

  shopping.remove(id)
    .then( () => {
      res.json({ message: "Success" });
    })
    .catch( (err) => {
      res.status(500).json({ error: `Could not delete shopping list item: ${err}` });
    })
});


/* ---------- Export ---------- */
module.exports = router;