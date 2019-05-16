const db = require('../dbConfig.js');
const ing = require('./ingredientModel');

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
    .returning('id')
    .then( ([id]) => this.getById(id) );
  },

  
  /* 
   * getServings:
   *   -- Gets the default number of servings a recipe is set for
   */
  getServings: function(recipeId) {
    return db('recipes').where('recipe_id', recipeId).pluck('servings');
  },


  /*
   * addScheduleList:
   *    -- Insert shopping list by schedule ID
   */
  addScheduleList: async function(sched) {

    // get recipe servings info
    const [defaultServings] = await this.getServings(sched.recipe_id);

    // Set the date/time for all new entries to be the same
    const date = new Date().toISOString();

    // get ingredients by recipe id
    return await db('recipe_ingredients').where('recipe_id', sched.recipe_id)
      .then( (ingredients) => {
        
        // Loop for inserts
        ingredients.map( (ing) => {
          // Setup the data to be inserted
          const newList = {
            user_id: sched.user_id,
            amount: (ing.amount / defaultServings * sched.servings),
            measurement: ing.measurement,
            ing_id: ing.ing_id,
            start: date
          };
          this.insert(sched.user_id, newList);
        });
      })
      .then( () => {
        return this.getUserDate(sched.user_id, date);
      })
      .catch( (err) => { 
        console.error(`Error in shopping schedule: ${err}`); 
      });
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
        this.where('start', 'like', date)
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

