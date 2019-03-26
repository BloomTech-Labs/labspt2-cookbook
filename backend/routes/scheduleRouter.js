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
router.get( '/user/:id/date/:date', (req, res) => {
  const { id, date } = req.params;

  schedule.getByDate(id, date)
    .then( (list) => {
      res.json(list);
    })
    .catch( (err) => {
      res.status(500).json({ error: `Could not get schedule by date: ${err}` });
    });
});


/* PUT */

/* POST */

/* DELETE */


/* ---------- Export ---------- */
module.exports = router;