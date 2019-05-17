const db = require('../dbConfig.js');

module.exports = {
  /*
   * getById:
   *   -- Get a schedule entry by it's ID
   *   -- Returns: int (1)
   */
  getById: function(id) {
    return db('schedule').where('id', id).first();
  },

  /*
   * getByUserId:
   *   -- Gets a list of scheduled recipes by User ID
   */
  getByUser: function(userId) {
    return db('schedule').where('user_id', userId);
  },

  /*
   * getByUserAndRecipe
   *   -- Gets a list of scheduled recipes by UserID & RecipeID
   */
  getByUserRecipe: function(userId, recipeId) {
    return db('schedule').where('user_id', userId).andWhere('recipe_id',recipeId);
  },
  
  /*
   * getByDate:
   *  -- Gets a list of scheduled recipes by User ID for date
   */ 
  getByDate: function(userId, date) {
    return db('schedule').where('user_id', userId).andWhere('date', date) ;
  },

  /*
   * insert:
   *   -- Inserts a new scheduled recipe
   */
  insert: async function(sched) {
    return await db('schedule').insert(sched)
     .returning('id')
     .then( ([id]) => this.getById(id) );
  },

  /*
   * update:
   *   -- Edits a scheduled recipe
   */
  update: function(id, sched) {
    return db('schedule').where('id', id).update(sched).returning('id')
      .then( ([id]) => this.getById(id) );
  },

  /*
   * delete:
   *  -- Deletes a scheduled recipe
   */
  delete: function(id) {
    return db('schedule').where('id', id).del();
  }
};