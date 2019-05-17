// Base requires:
const express = require('express');
const router = express.Router();

// App requires/middleware
const schedule = require('../data/helpers/scheduleModel');


/* ---------- Endpoints for /api/schedule ---------- */

/* GET Endpoints */

/* GET schedule by ID */
router.get( '/:id', (req, res) => {
  const { id } = req.params;

  schedule.getById(id)
    .then( (sched) => {
      if( sched ){
        res.json(sched);
      } else {
        res.status(404).json({ error: `Schedule not found.` });
      }
    })
    .catch( (err) => {
      res.status(500).json({ error: `Could not get schedule by id: ${err}` });
    });
});


/* GET schedule by UserID */
router.get( '/user/:id', (req, res) => {
  const { id } = req.params;
  
  schedule.getByUser(id)
    .then( (list) => {
      res.json(list);
    })
    .catch( (err) => {
      res.status(500).json({ error: `Could not get schedule by UserID: ${err}` });
    });
});


/* GET schedule by Date */
router.get( '/user/:id/date/:date', async(req, res) => {
  const { id, date } = req.params;
  schedule.getByDate(id, date)
    .then( (list) => {
      res.json(list);
    })
    .catch( (err) => {
      res.status(500).json({ error: `Could not get schedule by date: ${err}` });
    });
});


/* GET schedule by UserID & RecipeID */
router.get( '/user/:id/recipe/:recId', (req, res) => {
  const { id, recId } = req.params;
  schedule.getByUserRecipe( id, recId )
    .then( (list) => {
      res.json(list);
    })
    .catch( (err) => {
      res.status(500).json({ error: `Could not get schedule by user/recipe: ${err}` });
    })
});


/* PUT */
router.put( '/:id', (req, res) => {
  const newSched = req.body;
  const { id } = req.params;
  
  // Check for required fields
  if( !newSched.user_id || !newSched.date || !newSched.recipe_id || !newSched.tag_id ) {
    res.status(400).json({ error: "Missing required field." });
  } else {
    schedule.update(id, newSched)
      .then( (sched) => {
        res.json(sched);
      })
      .catch( (err) => {
        res.status(500).json({ error: `Could not edit schedule: ${err}` });
      });
    // end schedule-insert
  }  
});


/* POST */
router.post( '/', (req, res) => {
  const newSched = req.body;

  // Check for required fields
  if( !newSched.user_id || !newSched.date || !newSched.recipe_id || !newSched.tag_id ) {
    res.status(400).json({ error: "Missing required field." });
  } else {
    schedule.insert(newSched)
      .then( (sched) => {
        res.json(sched);
      })
      .catch( (err) => {
        res.status(500).json({ error: `Could not insert new schedule: ${err}` });
      });
    // end schedule-insert
  }
});


/* DELETE */
router.delete( '/:id', (req, res) => {
  const { id } = req.params;

  schedule.delete(id)
    .then( () => {
      res.json({ success: "Deleted" });
    })
    .catch( (err) => {
      res.status(500).json({ error: `Could not delete: ${err}`});
    })
});


/* ---------- Export ---------- */
module.exports = router;