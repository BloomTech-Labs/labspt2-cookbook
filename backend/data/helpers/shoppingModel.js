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

  /*
   * update:
   *  -- Update shopping list entry
   */

  /*
   * delete:
   *  -- Delete shopping list entry
   */

  /*
   * get:
   *  -- Get shopping list by user
   */
  get: function(id, date) {
    return db.select( 's.id', 's.amount', 's.measurement', 'ing.name', 's.start', 's.end')
      .from('shopping_list as s')
      .innerJoin('ingredients as ing', 's.ing_id', 'ing.ing_id')
      .where('user_id', id)
      .andWhere( function () {
        this.where('start', '<=', date)
          .andWhere('end', '>=', date)
      })
  }
};

