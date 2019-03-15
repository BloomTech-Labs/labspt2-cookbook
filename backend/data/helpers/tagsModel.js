const db = require('../dbConfig.js');

module.exports = {
/*
 * getId:
 *
 *  --Get a tags id number by name
 */

getId: function(tag) {
    return db('tags').where('name', tag).first().pluck('tag_id');
},


/*
 * getByRecipe: 
 *
 *  -- Gets a list of tags by Recipe ID
 */ 

getByRecipe: function(recId) {
    const query1 = db('recipe_tags').where('recipe_id', recId)
},

//get all available meal tags with/without id

getAll: function(id) {
    return id ? db('tags').where('tag_id', id).first() : db('tags');
},

//update meal tags ??

//post meal tags to a recipe and also to recipe tags if not there

//delete meal tags from specific recipe 

//delete meal tag from whole site
};
