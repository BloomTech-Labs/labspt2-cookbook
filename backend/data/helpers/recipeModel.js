const db = require('../dbConfig.js');

module.exports = {
  // get full recipe by id
  get: function(id) {
    const query1 = db('recipes').where('recipe_id', id);
    const query2 = db.select('a.id','a.amount','a.measurement','b.name')
      .from('recipe_ingredients as a').innerJoin('ingredients as b', 'a.ing_id', 'b.ing_id')
      .where('recipe_id', id);
    const query3 = db.select('order','directions').from('directions').where('recipe_id',id).orderBy('order');

    return Promise.all([query1, query2, query3]);
    // Promise.all([query1, query2]).then( (values) => {
    //    let [recipe, ingredients] = values;
    // //   //recipe = recipe[0];
    //    return ({...recipe, ingredients: ingredients});
    // });
    //return query2;
  },


  // post

  // put

  // delete
};