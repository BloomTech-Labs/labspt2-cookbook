const db = require('../dbConfig.js');

module.exports = {
  /*
   * deleteOld:
   * Delete shopping lists older than x days.
   */

  /*
   * insert:
   *  -- Insert new shopping list
   */
  insert: async function(id, item) {
    return await db('shopping_list').insert({
      user_id: id,
      ...item
    })
    .then( ([id]) => this.getById(id) );
  },

  /*
   * update:
   *  -- Update shopping list entry
   */

  /*
   * delete:
   *  -- Delete shopping list entry
   */

  /*
   * getUserDate:
   *  -- Get shopping list by user
   */
  getUserDate: function(id, date) {
    return db.select( 's.id', 's.amount', 's.measurement', 'ing.name', 's.start', 's.end')
      .from('shopping_list as s')
      .innerJoin('ingredients as ing', 's.ing_id', 'ing.ing_id')
      .where('user_id', id)
      .andWhere( function () {
        this.where('start', '<=', date)
          .andWhere('end', '>=', date)
      });
  },

  /* 
   * getById:
   *  -- Get shopping list item by id
   */
  getById: function(id) {
    return db.select( 's.id', 's.amount', 's.measurement', 'ing.name', 's.start', 's.end')
      .from('shopping_list as s')
      .innerJoin('ingredients as ing', 's.ing_id', 'ing.ing_id')
      .where('id', id);
  }
};

