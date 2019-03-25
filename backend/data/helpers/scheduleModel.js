const db = require('../dbConfig.js');

module.exports = {
  /*
   * getById:
   *   -- Get a schedule entry by it's ID
   *   -- Returns: int (1)
   */
  getById: function(ing) {
    return db('schedule').where('id', id).first().pluck('id');
  },

  /*
   * getByUserId:
   *   -- Gets a list of scheduled recipes by User ID
   */

  /*
   * getByDate:
   *  -- Gets a list of scheduled recipes by User ID for date
   */ 

  /*
   * insert:
   *   -- Inserts a new scheduled recipe
   */

  /*
   * update:
   *   -- Edits a scheduled recipe
   */

  /*
   * delete:
   *  -- Deletes a scheduled recipe
   */

};