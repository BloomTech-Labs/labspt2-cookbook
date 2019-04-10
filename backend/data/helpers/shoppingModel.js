const db = require('../dbConfig.js');

module.exports = {
  
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
  update: function(id, newItem) {
    return db('shopping_list').where('id', id).update(newItem)
      .then( () => this.getById(id) );
  },


  /*
   * delete:
   *  -- Delete shopping list entry
   */
  remove: function(id) {
    return db('shopping_list').where('id', id).del();
  },


  /*
   * getUserDate:
   *  -- Get shopping list by user
   */
  getUserDate: function(id, date) {
    return db.select( 's.id', 's.amount', 's.measurement', 'ing.name', 's.start' )
      .from('shopping_list as s')
      .innerJoin('ingredients as ing', 's.ing_id', 'ing.ing_id')
      .where('user_id', id)
      .andWhere( function () {
        this.where('start', date)
          //.andWhere('end', '>=', date)
      });
  },


  /* 
   * getById:
   *  -- Get shopping list item by id
   */
  getById: function(id) {
    return db.select( 's.id', 's.amount', 's.measurement', 'ing.name', 's.start')
      .from('shopping_list as s')
      .innerJoin('ingredients as ing', 's.ing_id', 'ing.ing_id')
      .where('id', id);
  }
};

