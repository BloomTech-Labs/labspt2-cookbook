
const rp = require('request-promise');
const $ = require('cheerio');
const numericQuantity = require("numeric-quantity");

checkUrl = async (newRecipeObj) =>{
  console.log(newRecipeObj);
  const checkRecipeUrl = newRecipeObj.link;
  if(checkRecipeUrl.indexOf('allrecipes.com')){
      await allRecipeScraper(checkRecipeUrl);
  }else if(checkRecipeUrl.indexOf('pinchofyum.com')){
      await pinchOfYumScraper(checkRecipeUrl);
  }else return{
    checkRecipeUrl
  }
  return newRecipeObj;
}

/* Parse the ingredient array & split it into objects */
const parseIngredients = (ingArr) => {
  let ingredientArray = [];

  ingArr.forEach( (line) => {
    // Split each line into an array
    let lineArr = line.split(" ");

    console.log(lineArr);
    // Set up the empty object & needed variables
    let tempObj = { amount: null, measurement: null, name: ""};
    let nameArr = lineArr;

    // Scan through each line's array values for needed components
    for( let i = 0; i < lineArr.length; i++ ) {

      // Check if this value is a number
      let testNum = Number(lineArr[i]);

      // Fraction?
      if( lineArr[i].indexOf("/") !== -1 ){
        testNum = numericQuantity(lineArr[i]) > -1 ? numericQuantity(lineArr[i]) : testNum;
      }

      if( !Number.isNaN(testNum) ){
        nameArr[i] = '';
        tempObj.amount = testNum;
      }

      // Look for measurement - this needs a better method
      const msmts = ['c','cup','cups','T','tbsp','tablespoon','tablespoons','tsp','teaspoon','teaspoons','oz','ounce','ounces','stalk','stalks','pinch','pinches','dash','dashes','pound','pounds','handful','handfulls','pint','pints','qt','quart','quarts','lb','pound','pounds','gallon','gallons','liter','liters'];

      if( msmts.indexOf(lineArr[i]) !== -1 ){
        tempObj.measurement = lineArr[i];
        nameArr[i] = '';
      }

      // Join the remaining nameArr to form the name
      tempObj.name = nameArr.join(' ').trim();
      console.log(tempObj);
    }
    ingredientArray.push(tempObj);
  });

  return(ingredientArray);
};

allRecipeScraper = url =>{
    rp(url)
  .then(function(html){
    //let name, image, link, ingredients, directions;
    const allRecipeJSON = {name: '', image: '', link: '', ingredients: '', directions: '', } 
    
    const recipeName = ($('h1', html).text());
    allRecipeJSON.name = recipeName;

    const recipeImage = ($('.hero-photo__wrap img', html).attr('src'))
    allRecipeJSON.image = recipeImage;

    const recipeLink = url;
    allRecipeJSON.link = recipeLink;
    
    const recipeIngredientsArr = ($('.checkList__line', html).text().replace(/\s\s+/g, '\n').split('\n').slice(1, -3));
    allRecipeJSON.ingredients = parseIngredients(recipeIngredientsArr);
    
    const recipeDirectionsArr = ($('.step', html).text().replace(/\s\s+/g, '\n').split('\n').slice(1,-1));
    allRecipeJSON.directions = recipeDirectionsArr;

    //const prepTime = ($('.prepTime__item--time', html).text());
    //const prepTime = ( $('.prepTime__item--time', html).get().length );
    // $('.prepTime__item--time', html).each( (idx, val) => {
    //   const prepTime = val.children().data();
    //   console.log(prepTime);
    // });
    // allRecipeJSON.prep_time = prepTime;

    const cookTime = ( $('.prepTime__item--time', html).text() );
    allRecipeJSON.cook_time = cookTime;

    //const servings = ( $().$('ng-binding', html).text() );
    //allRecipeJSON.servings = servings;

    console.log(allRecipeJSON);
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

        //let name, image, link, ingredients, directions;
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