// Base Requires:
const express = require('express');

// Middleware requires:
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// Route requires:
const userRouter = require('./routes/userRouter');
const recipeRouter = require('./routes/recipeRouter');
const tagsRouter = require('./routes/tagsRouter');
const ingredRouter = require('./routes/ingredientRouter');
const chargeRouter = require('./routes/chargeRouter');
const shoppingRouter = require('./routes/shoppingRouter');
const scheduleRouter = require('./routes/scheduleRouter');


// Server:
const server = express();
const PORT = process.env.PORT || 4321;


/* ---------- Middleware ---------- */
var corsOptions = {
//  origin: 'https://kookr.netlify.com/',
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200
};

server.use(
  express.json(),
  morgan('dev'),
  helmet(),
  cors(corsOptions),
  bodyParser.text(),
);
server.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});


/* ---------- Routes ---------- */
server.options('*', cors());
server.use('/api/user', userRouter);
server.use('/api/recipes', recipeRouter);
server.use('/api/tags', tagsRouter);
server.use('/api/ingredients', ingredRouter);
server.use('/api/charge', chargeRouter);
server.use('/api/list', shoppingRouter);
server.use('/api/schedule', scheduleRouter);



/* ---------- Listener ---------- */
server.listen( PORT, () => {
  console.info(`\n=== Server listening on port: ${PORT} ===\n`);
});
