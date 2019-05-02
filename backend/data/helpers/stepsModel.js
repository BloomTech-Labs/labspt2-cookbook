const db = require('../dbConfig.js');

module.exports = {
  /*
   * multiInsert:
   *   -- Inserts multiple directions through mapping.
   *   -- Useful for adding new recipes.
   */
  multiInsert: function(recipe_id, steps) {
    return steps.map( (step) => {
      this.insert(step, recipe_id);
    });
    
  },

  /*
   * insert:
   *   -- Inserts new direction. (recipe_id, order, directions)
   */
  insert: function(step, recipe_id) {
    // Insert into directions table:
    db('directions')
      .insert({
        recipe_id: recipe_id,
        order: step.order,
        directions: step.directions
      })
      .returning('dir_id')
      .then( ([id]) => {
        return id;
      });
  },
};
