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
   * getByDate:
   *  -- Gets a list of scheduled recipes by User ID for date
   */ 
  getByDate: function(userId, date) {
    return db('schedule').where('user_id', userId).andWhere('date', date);
  },

  /*
   * insert:
   *   -- Inserts a new scheduled recipe
   */
  insert: function(userId, sched) {
    return db('schedule').insert({
      user_id: userId,
      ...sched
    });
  },

  /*
   * update:
   *   -- Edits a scheduled recipe
   */
  update: function(id, sched) {
    return db('schedule').where('id', id).update(sched);
  },

  /*
   * delete:
   *  -- Deletes a scheduled recipe
   */
  delete: function(id) {
    return db('schedule').where('id', id).del();
  }
};