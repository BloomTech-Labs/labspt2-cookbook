const db = require('../dbConfig.js');
const ingredientHelper = require('./ingredientModel');

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


  // post
  insert: function(rec) {
    
    console.log("rec:", rec);
    return db('recipes').insert({ 
      name: rec.name,
      image: rec.image,
      link: rec.link
    })
    .then( ([id]) => {
      ingredientHelper.multiInsert(id, rec.ingredients);
      return this.get(id);
    });
  },

  // put

  // delete
};