
const rp = require('request-promise');
const $ = require('cheerio');

checkUrl = (newRecipeObj) =>{
  console.log(newRecipeObj);
  const checkRecipeUrl = newRecipeObj.recipeUrl;
  if(checkRecipeUrl.indexOf('allrecipes.com')){
      allRecipeScraper(checkRecipeUrl);
  }else if(checkRecipeUrl.indexOf('pinchofyum.com')){
      pinchOfYumScraper(checkRecipeUrl);
  }else return{
    checkRecipeUrl
  }
  return newRecipeObj;
}
allRecipeScraper = url =>{
    rp(url)
  .then(function(html){
    let name, image, link, ingredients, directions;
    const allRecipeJSON = {name: '', image: '', link: '', ingredients: '', directions: ''} 
    
    const recipeName = ($('h1', html).text());
    allRecipeJSON.name = recipeName;
    
    const recipeImage = ($('.hero-photo__wrap img', html).attr('src'))
    allRecipeJSON.image = recipeImage;

    const recipeLink = url;
    allRecipeJSON.link = recipeLink;
    
    const recipeIngredientsArr = ($('.checkList__line', html).text().replace(/\s\s+/g, '\n').split('\n').slice(1, -3));
    allRecipeJSON.ingredients = recipeIngredientsArr;

    const recipeDirectionsArr = ($('.step', html).text().replace(/\s\s+/g, '\n').split('\n').slice(1,-1));
    allRecipeJSON.directions = recipeDirectionsArr;

    return allRecipeJSON;
  })
  .catch(function(err){
    //handle error
  });
  
}
//allRecipeScraper('https://www.allrecipes.com/recipe/241419/potato-scones/?internalSource=editorial_2&referringId=78&referringContentType=Recipe%20Hub');

pinchOfYumScraper = url =>{
    rp(url)
    .then(function(html){

        let name, image, link, ingredients, directions;
        const pinchRecipeJSON = {name: '', image: '', link: '', ingredients: '', directions: ''} 
        
        const recipeName = ($('h1', html).text());
        pinchRecipeJSON.name = recipeName;

        const recipeImage = ($('.first-image-share img', html).attr('src'))
        pinchRecipeJSON.image = recipeImage;

        const recipeLink = url;
        pinchRecipeJSON.link = recipeLink;

        const recipeIngredientsArr = ($('.tasty-recipes-ingredients ul', html).text().split('\n').slice(1, -1).filter(item => item));
        pinchRecipeJSON.ingredients = recipeIngredientsArr;

        const recipeDirectionsArr = ($('.tasty-recipes-instructions ol', html).text().split('\n').slice(1, -1));
        pinchRecipeJSON.directions = recipeDirectionsArr;

        return pinchRecipeJSON;
    })
}

//pinchOfYumScraper('https://pinchofyum.com/yummy-salmon-burgers-slaw');

module.exports = {checkUrl}