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
  getByRecipe: function(recipe_id) {
    return db.select('a.id','a.amount','a.measurement','b.name')
      .from('recipe_ingredients as a').innerJoin('ingredients as b', 'a.ing_id', 'b.ing_id')
      .where('recipe_id', recipe_id);
  },

  /*
   * getByName:
   *  -- Gets ingredients by name
   */ 
  getByName: function(name) {
    return db.select('rec.recipe_id', 'r.name as recipe_name', 'rec.ing_id', 'ing.name')
      .from('ingredients as ing')
      .innerJoin('recipe_ingredients as rec', 'ing.ing_id', 'rec.ing_id')
      .join('recipes as r', 'r.recipe_id', 'rec.recipe_id')
      .where('ing.name', 'like', '%'+name+'%');
    //return db('ingredients').where('name', 'like', '%'+name+'%');
  },

  /*
   * multiInsert:
   *   -- Inserts multiple ingredients through mapping.
   *   -- Useful for adding new recipes.
   */
  multiInsert: function(recipe_id, ing) {
    ing.map( (i) => {
      this.insert(i, recipe_id);
    });
    return;
  },

  /*
   * insert:
   *   -- Inserts new ingredient.
   *   -- Makes call to insert to recipe_ingredients
   */
  insert: function(ing, recipe_id) {
    return db.transaction( function(trans) {

      // First check to see if the ingredient exists already.
      return db('ingredients')
        .transacting(trans)
        .where('name', ing.name).first().pluck('ing_id')
        .then( ([ing_id]) => {
          
          if( !ing_id || ing_id <= 0 ) {

            // No ingredient found. Insert it.
            return db('ingredients')
              .transacting(trans)
              .insert({name: ing.name})
              .returning('ing_id')
              .then(([id]) => {
                return id;
              })
            // end - insert into ingredients
          }
          return ing_id;
        })
        .then( (ing_id) => {

          // Now insert into the join table
          return db('recipe_ingredients')
            .transacting(trans)
            .insert({
              recipe_id: recipe_id,
              amount: ing.amount,
              measurement: ing.measurement,
              ing_id: ing_id
            })
            .returning('id')
            .then( ([id]) => {
              return id;
            });
          // end - insert into recipe_ingredients
        })
        .then(trans.commit)
        .catch(trans.rollback)
    })
    .catch( (err) => {
      console.error("Error in insert ingredient: ", err);
    })
  },


  // put

  // delete
};