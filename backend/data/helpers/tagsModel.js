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

getByRecipe: function(recipe_id) {
    return db('tags as t').join('recipe_tags as rt', 't.tag_id', 'rt.tag_id').select('t.tag').where('rt.recipe_id', recipe_id)
},

//get all available meal tags with/without id

getAll: function(id) {
    return id ? db('tags').where('tag_id', id).first() : db('tags');
},

//update meal tags ??

//post meal tags to a recipe and also to recipe tags if not there

insert: function(tag, recipe_id) {
    return db.transaction(function(trans){

        return db('tags')
        .transacting(trans)
        .where('tag', tag).first().pluck('tag_id')
        .then(([tag_id])=>{
            if(!tag_id){

                return db('tags')
                .transacting(trans)
                .insert({tag: tag})
                .then( ([id]) => {
                    return id;
                })
            }
            return tag_id;
        })
        .then((tag_id) => {

            return db('recipe_tags')
            .transacting(trans)
            .insert({
                recipe_id: recipe_id,
                tag_id: tag_id
            })
            .then( ([id]) =>{
                return id;
            });
        })
        .then(trans.commit)
        .catch(trans.rollback)
    })
    .catch( (err) =>{
        console.log("Error:", err)
    })
}
//delete meal tags from specific recipe 

//delete meal tag from whole site
};
