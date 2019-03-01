// Base Requires:
const express = require('express');

// Middleware requires:
const morgan = require('morgan');

// Route requires:

// Server:
const server = express();
const PORT = 1234;


/* ---------- Middleware ---------- */
server.use(
  express.json(),
  morgan('dev')
);


/* ---------- Routes ---------- */


/* ---------- Listener ---------- */
server.listen( PORT, () => {
  console.log(`\n=== Server listening on port: ${PORT} ===\n`);
});