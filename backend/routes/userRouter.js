// Base requires:
const express = require('express');
const router = express.Router();

// App requires/middleware
const user = require('../data/helpers/userModel');


/* ---------- Endpoints for /api/user ---------- */

/* GET (list) */
router.get( '/', (req, res) => {
  const { id } = req.params;

  user.get(id)
    .then( (users) => {
      res.json(users);
    })
    .catch( (err) => {
      res.status(500).json({ error: "User information could not be retrieved." });
    });
});


/* GET by id */



/* POST */



/* PUT */



/* DELETE */


/* ---------- Export ---------- */
module.exports = router;