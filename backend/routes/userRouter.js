// Base requires:
const express = require('express');
const router = express.Router();

// App requires/middleware
const user = require('../data/helpers/userModel');


/* ---------- Endpoints for /api/user ---------- */

/* GET (list) */
router.get('/', (req, res) => {

  user.get()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: "User information could not be retrieved." });
    });
});


/* GET by id */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  user.get(id)
    .then( (user) => {
      if( user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found." });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "User information could not be retrieved." });
    });
});

/* Get by AuthId */
router.get('/:authId', (req, res) =>{
  const {authId} = req.params;

  user.getByAuth(authId)
    .then( (user) =>{
      if( user) {
        res.json(user);
      } else {
        res.status(404).json({error: "Authentication ID not found"})
      }
    })
    .catch((err) => {
      res.status(404).json({error: "User information could not be retrieved "})
    })
});


/* POST */
router.post('/', (req, res) => {
  const newUser = req.body;

  if (newUser.email) {
    user.insert(newUser)
      .then((user) => {
        res.json(user)
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to create user." });
      })
  } else {
    res.status(400).json({
      message: "Missing email."
    });
  }
})



/* PUT */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const userEdit = req.body;

  if (userEdit.email) {
    user.update(id, userEdit)
      .then((user) => {
        if (id) {
          res.json({ message: "User has been updated." })
        } else {
          res.status(400).json({ message: "User with specified ID does not exist" })
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Failed to update User."
        })
      })
  } else {
    res.status(400).json({
      message: "Missing email."
    });
  }
})


/* DELETE */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const userDel = req.body;

  user.remove(id)
    .then((user) => {
      if (user) {
        res.json(userDel)
      } else {
        res.status(404).json({ message: "User with specified ID does not exist." })
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete user." })
    })
})

/* ---------- Export ---------- */
module.exports = router;