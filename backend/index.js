// Base Requires:
const express = require('express');

// Middleware requires:
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser')

// Route requires:
const userRouter = require('./routes/userRouter');
const recipeRouter = require('./routes/recipeRouter');
const tagsRouter = require('./routes/tagsRouter');
const ingredRouter = require('./routes/ingredientRouter');
<<<<<<< HEAD
const chargeRouter = require('./routes/chargeRouter')
=======
const shoppingRouter = require('./routes/shoppingRouter');
>>>>>>> b8505b2d31021a5005391fcbf183f6e494b23925

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
  cors(corsOptions),
  bodyParser.text()

);


/* ---------- Routes ---------- */
server.use('/api/user', userRouter);
server.use('/api/recipes', recipeRouter);
server.use('/api/tags', tagsRouter);
server.use('/api/ingredients', ingredRouter);
server.use('/api/charge', chargeRouter);
server.use('/api/list', shoppingRouter);


/* ---------- Listener ---------- */
server.listen( PORT, () => {
  console.log(`\n=== Server listening on port: ${PORT} ===\n`);
});
