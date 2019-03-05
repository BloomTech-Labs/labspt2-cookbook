// Base Requires:
const express = require('express');

// Middleware requires:
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

// Route requires:
const userRouter = require('./routes/userRouter');
const recipeRouter = require('./routes/recipeRouter');

// Server:
const server = express();
const PORT = process.env.PORT || 1234;


/* ---------- Middleware ---------- */
server.use(
  express.json(),
  morgan('dev'),
  helmet(),
  cors()
);


/* ---------- Routes ---------- */
server.use('/api/user', userRouter);
server.use('/api/recipes', recipeRouter);


/* ---------- Listener ---------- */
server.listen( PORT, () => {
  console.log(`\n=== Server listening on port: ${PORT} ===\n`);
});