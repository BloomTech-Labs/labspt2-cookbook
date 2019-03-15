const db = require('../dbConfig.js');
const ingredientHelper = require('./ingredientModel');
const stepsHelper = require('./stepsModel');

module.exports = {
  /*
   * get:
   *   -- Get a full recipe by id.
   */
  get: function(id) {
    const query1 = db('recipes').where('recipe_id', id);
    const query2 = db.select('a.id','a.amount','a.measurement','b.name')
      .from('recipe_ingredients as a').innerJoin('ingredients as b', 'a.ing_id', 'b.ing_id')
      .where('recipe_id', id);
    const query3 = db.select('order','directions').from('directions').where('recipe_id',id).orderBy('order');

    return Promise.all([query1, query2, query3]);
  },


  /*
   * getByUserId:
   *   -- Get a list of recipes by user id.
   *   -- Returns recipe info
   */
  

  /*
   * insert:
   *   -- Insert a full recipe.
   *   -- Returns recipe id: int (1)
   */
  insert: function(recipe) {
    return db.transaction( (trans) => {
      return db('recipes')
        .transacting(trans)
        .insert({
          name: recipe.name,
          image: recipe.image,
          link: recipe.link
        })
        .then( (result) => {
          // Add all ingredients
          const recipe_id = result[0];
          ingredientHelper.multiInsert(recipe_id, recipe.ingredients);
          return recipe_id;
        })
        .then( (recipe_id) => {
          // Add all directions
          stepsHelper.multiInsert(recipe_id, recipe.directions);
          return recipe_id;
        })
        .then( (recipe_id) => {
          // Inserting to user_recipe
          return db('user_recipes')
            .transacting(trans)
            .insert({
              user_id: recipe.user_id,
              recipe_id: recipe_id
            })
            .return(recipe_id);
          // end insert to user_recipes
        })
        .then(trans.commit)
        .catch(trans.rollback)
    })
    .then( (result) => {
      console.log("Result: ", result);
      // Transaction success.
      return(result);
    })
    .catch(function(err) {
      console.log("error: ", err);
    })
  },

  // put

  // delete
};
