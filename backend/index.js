// Base Requires:
const express = require('express');

// Middleware requires:
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

// Route requires:
const userRouter = require('./routes/userRouter');
const recipeRouter = require('./routes/recipeRouter');
const tagsRouter = require('./routes/tagsRouter')
const ingredRouter = require('./routes/ingredientRouter');
const shoppingRouter = require('./routes/shoppingRouter');
const scheduleRouter = require('./routes/scheduleRouter');

// Server:
const server = express();
const PORT = process.env.PORT || 1234;


/* ---------- Middleware ---------- */
var corsOptions = {
//  origin: 'https://kookr.netlify.com/',
  origin: '*',
  optionsSuccessStatus: 200
};

server.use(
  express.json(),
  morgan('dev'),
  helmet(),
  cors(corsOptions)
);


/* ---------- Routes ---------- */
server.use('/api/user', userRouter);
server.use('/api/recipes', recipeRouter);
server.use('/api/tags', tagsRouter)
server.use('/api/ingredients', ingredRouter);
server.use('/api/list', shoppingRouter);
server.use('/api/schedule', scheduleRouter);


/* ---------- Listener ---------- */
server.listen( PORT, () => {
  console.log(`\n=== Server listening on port: ${PORT} ===\n`);
});
