// Base requires:
const express = require('express');
const router = express.Router();

// App requires/middleware
const user = require('../data/helpers/userModel');


/* ---------- Endpoints for /api/user ---------- */

/* GET (list) */
router.get( '/', (req, res) => {

  user.get()
    .then( (users) => {
      res.json(users);
    })
    .catch( (err) => {
      res.status(500).json({ error: "User information could not be retrieved." });
    });
});


/* GET by id */
router.get( '/:id', (req, res) => {
  const { id } = req.params;

  user.get(id)
    .then( (user) => {
      if( user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found." });
      }
    })
    .catch( (err) => {
      res.status(500).json({ error: "User information could not be retrieved." });
    });
});



/* POST */



/* PUT */



/* DELETE */


/* ---------- Export ---------- */
module.exports = router;