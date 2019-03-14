const db = require('../dbConfig.js');
const ingredientHelper = require('./ingredientModel');
const stepsHelper = require('./stepsModel');

module.exports = {
  // get full recipe by id
  get: function(id) {
    const query1 = db('recipes').where('recipe_id', id);
    const query2 = db.select('a.id','a.amount','a.measurement','b.name')
      .from('recipe_ingredients as a').innerJoin('ingredients as b', 'a.ing_id', 'b.ing_id')
      .where('recipe_id', id);
    const query3 = db.select('order','directions').from('directions').where('recipe_id',id).orderBy('order');

    return Promise.all([query1, query2, query3]);
  },


  // post full recipe
  insert: function(recipe) {
    return db.transaction( (trans) => {
      return db('recipes')
        .transacting(trans)
        .insert({
          name: recipe.name,
          image: recipe.image,
          link: recipe.link
        })
        .then( (result) => {
          const id = result[0];
          ingredientHelper.multiInsert(id, recipe.ingredients);
          return id;
        })
        .then( (id) => {
          stepsHelper.multiInsert(id, recipe.directions);
          return id;
        })
        .then(trans.commit)
        .catch(trans.rollback)
    })
    .then( (result) => {
      // Transaction success.
      return(result);
    })
    .catch(function(err) {
      console.log("error: ", err);
    })
  },


  // put

  update: function(id, changes) {
    return db('recipes').where('recipe_id', id).update(changes).then(count => (count > 0 ? this.get(id) : null));
  },


  // delete

  remove: function (id) {
    return db('recipes').where('recipe_id', id).del();
}

};