const db = require('../dbConfig.js');
const ingredientHelper = require('./ingredientModel');
const stepsHelper = require('./stepsModel');
const checkUrl = require('./recipeScraper');

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
   *   -- Returns recipe info: id, name, image (scheduling info)
   */
  getByUserId: function(user_id) {
    // Setting this up to use Promise so that scheduling info can be added.
    // TODO: Add scheduling info!
    const query1 = db('user_recipes as u').join('recipes as r', 'u.recipe_id', 'r.recipe_id').select('r.*').where('u.user_id', user_id);
    
    return Promise.all([query1]);
  },

  /*
   * recipeExists:
   *   -- Get a recipe by link (unique field).
   *   -- Used for checking if recipe exists already.
   */
  recipeExists: function(link) {
    return db('recipes').where('link', link).pluck('recipe_id');
  },

  
  insertLink: async function(recipe) {
    const [recId] = await this.recipeExists(recipe.link);
    
    // Check if recipe exists first.
    if( recId > 0 ) {
      return this.insert(recipe);
    } else {
      // Scrape the recipe data
      let newRecipe = await checkUrl.checkUrl(recipe);
      
      newRecipe = {
        ...newRecipe,
        user_id: recipe.user_id
      };
      return (newRecipe);
    }
  },

  /*
   * insert:
   *   -- Insert a full recipe.
   *   -- Returns recipe id: int (1)
   */
  insert: async function(recipe) {
    const [recId] = await this.recipeExists(recipe.link);
    
    // Check if recipe exists first.
    if( recId > 0 ) {
      
      // Recipe already exists. Check if linked to customer.
      return db('user_recipes').where({
        user_id: recipe.user_id,
        recipe_id: recId
      }).pluck('id')
        .then( (result) => {
          if( result.length <= 0 ){

            // Recipe is not linked to customer. Link it now.
            return db('user_recipes')
              .insert({
                user_id: recipe.user_id,
                recipe_id: recId
              })
              .return(recId);    
            // end db.insert
          }
          else{
            // Recipe is already linked. Return the recipe id.
            return recId;
          }
        });
      // end db.where
    } else {
      // // Might need to add another endpoint specifically for this.
      
      let newRecipe = await checkUrl.checkUrl(recipe);
      
      newRecipe = {
        ...newRecipe,
        user_id: recipe.user_id
      };
      recipe = newRecipe;
      console.log(recipe); 

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
            console.log(`=== recipe_id: ${recipe_id} ===`);
            if( recipe.ingredients && recipe.ingredients !== null ) {
              ingredientHelper.multiInsert(recipe_id, recipe.ingredients);
            }
            return recipe_id;
          })
          .then( (recipe_id) => {
            // Add all directions
            if( recipe.directions && recipe.directions !== null ){
              stepsHelper.multiInsert(recipe_id, recipe.directions);
            }
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
        // Transaction success.
        console.log(result)
        return(result);
      })
      .catch(function(err) {
        console.log("error: ", err);
      })
    }
  },

  // put? Do we need an edits?

  /*
   * delete:
   *  -- We don't actually want to delete the recipe.
   *  -- Just unlink from user
   */
  delete: function(userId, recipeId) {
    return db('user_recipes').where({
      user_id: userId,
      recipe_id: recipeId
    }).del();
  }
};
