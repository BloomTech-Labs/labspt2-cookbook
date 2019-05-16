const db = require('../dbConfig.js');

module.exports = {
/*
 * getId:
 *
 *  --Get a tags id number by name
 */

getId: function(tag) {
    return db('tags').where('tag', tag).pluck('tag_id');
},


/*
 * getByRecipe: 
 *
 *  -- Gets a list of tags by Recipe ID
 */ 

getByRecipe: function(recipe_id) {
    return db('tags as t').join('recipe_tags as rt', 't.tag_id', 'rt.tag_id').select('t.tag_id', 't.tag').where('rt.recipe_id', recipe_id);
},

/*
 * getall: 
 *
 *  -- Get all available meal tags with/without id
 */ 

getAll: function(id) {
    return id ? db('tags').where('tag_id', id).first() : db('tags');
},

/*
 * update: 
 *
 *  -- Update tag by id
 *  -- Returns entire tag object
 */ 
update: function(id, change){
    return db('tags').where('tag_id', id).update(change).then(count => (count > 0 ? this.getAll(id) : null));
},

/*
 * insert: 
 *
 *  -- Insert new tag to tags table and to recipe_tags table
 *  -- Returns tag id
 */ 
insert: async function(tag, recId) {
    const [tagId] = await this.getId(tag.tag)
    
    //Check if tag exists
    if(tagId > 0) {

        //Tag exists. Check if already part of recipe
        return db('recipe_tags').where({
            recipe_id: recId.id,
            tag_id: tagId
        }).pluck('id')
        .then( result =>{
            if(result.length <=0){

                //tag not attached to recipe. 
                return db('recipe_tags')
                .insert({
                    recipe_id: recId.id,
                    tag_id: tagId
                })
                .return(tagId);
            } else{

                //tag is linked
                return tagId;
            }
        });
    } else {
        //tag does not exist

        return db.transaction( trans =>{
            return db('tags')
            .transacting(trans)
            .insert(tag)
            .then( result =>{
                
                const tag_id=result[0]

                return db('recipe_tags')
                .transacting(trans)
                .insert({
                    recipe_id: recId.id,
                    tag_id: tag_id
                })
                .return(tag_id)
            })
            .then(trans.commit)
            .catch(trans.rollback)
        })
        .then( result =>{
            return(result);
        })
        .catch(function(err) {
            console.error("Error in tag insert: ", err)
        })
    }
    
},

/*
 * remove: 
 *
 *  -- Deletes tag from recipe_tags table for a specific recipe
 *  
 */ 
remove: function (id, recipe_id) {
    return db('recipe_tags').where('recipe_id', recipe_id).andWhere('tag_id', id ).del()
},


/*
 * totalRemove: 
 *
 *  -- Deletes tag from tags table 
 *  -- Possible TODO: Check recipe_tags table and delete from there as well?
 */ 
totalRemove: function(id) {
    return db('tags').where('tag_id', id).del()
}


};
