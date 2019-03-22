// Base requires:
const express = require('express');
const router = express.Router();

// App requires/middleware
const shopping = require('../data/helpers/shoppingModel');


/* ---------- Endpoints for /api/list ---------- */

/* Get by userId & date */
router.get('/user/:id/date/:date', (req, res) => {
  const { id, date } = req.params;

  shopping.get(id, date)
    .then( (list) => {
      res.json(list);
    })
    .catch( (err) => {
      res.status(500).json({ error: `Could not get users shopping list: ${err}`});
    });
});



/* ---------- Export ---------- */
module.exports = router;