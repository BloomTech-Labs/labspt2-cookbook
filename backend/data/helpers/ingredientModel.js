const db = require('../dbConfig.js');

module.exports = {
  /*
   * getId:
   *   -- Get an ingredient's id number by ingredient name.
   *   -- Returns: int (1)
   */
  getId: function(ing) {
    return db('ingredients').where('name', ing).first().pluck('ing_id');
  },

  /*
   * getByRecipe:
   *   -- Gets a list of ingredients by Recipe ID
   */

  /*
   * multiInsert:
   *   -- Inserts multiple ingredients through mapping.
   *   -- Useful for adding new recipes.
   */
  multiInsert: function(recipe_id, ing) {
    return ing.map( (i) => {
      this.insert(i, recipe_id);
    });
    
  },

  /*
   * insert:
   *   -- Inserts new ingredient.
   *   -- Makes call to insert to recipe_ingredients
   */
  insert: function(ing, recipe_id) {

    // First check to see if it already exists:
    return db('ingredients').where('name', ing.name).first().pluck('ing_id')
      .then( ([id]) => {
    
        if( id && id > 0 ){
          // Ingredient found, use this id.
          this.insertRi(ing, recipe_id, id);
        } else {
          // Ingredient not found. Add it and save the id.
          db('ingredients').insert({name: ing.name})
          .then( ([ing_id]) => {
            this.insertRi(ing, recipe_id, ing_id)
          } );
        }
      });
  },

  /*
   * insertRi:
   *   -- Inserts necessary row into join table, recipe_ingredients.
   */
  insertRi: function(ing, recipe_id, ing_id) {
    return db('recipe_ingredients').insert({
      recipe_id: recipe_id,
      amount: ing.amount,
      measurement: ing.measurement,
      ing_id: ing_id
    });
  }

  // put

  // delete
};