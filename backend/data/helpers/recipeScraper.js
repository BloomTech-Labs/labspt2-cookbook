
const rp = require('request-promise');
const $ = require('cheerio');
const numericQuantity = require("numeric-quantity");

checkUrl = async (newRecipeObj) => {
  
  const checkRecipeUrl = newRecipeObj.link;

  if(checkRecipeUrl.indexOf('allrecipes.com') !== -1 ){
      return await allRecipeScraper(checkRecipeUrl);
  }else if(checkRecipeUrl.indexOf('pinchofyum.com') !== -1 ){
      return await pinchOfYumScraper(checkRecipeUrl);
  }
  else {
    return await nameScraper(checkRecipeUrl);
  }
}

/* Parse the ingredient array & split it into objects */
const parseIngredients = (ingArr) => {
  let ingredientArray = [];

  ingArr.forEach( (line) => {
    // Split each line into an array
    let lineArr = line.split(" ");

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

    }
    ingredientArray.push(tempObj);
  });

  return(ingredientArray);
};

nameScraper = async (url) => {
  return await rp(url)
    .then( function(html) {
      const recipeJSON = {name: '', image: '', link: url};

      // // Lots of pages have more than one h2/h1 and we dont want them all mashed together
      // const nameArr = [];
      // $('h2',html).each( (i, elem) => {
      //   nameArr[i] = $(elem).text();
      // });
      
      // if( !nameArr[0] || nameArr[0] === '' ) {
      //   // Try to grab from an H1 tag
      //   $('h1',html).each( (i, elem) => {
      //     nameArr[i] = $(elem).text();
      //   });

      //   if( !nameArr[0] || nameArr[0] === '' ) {
      //     // _Still_ blank? Grab the title
      //     nameArr[0] = ($('title', html).text());
      //   }
      // }
      // recipeJSON.name = nameArr[0];
        const recipeName = ($('title', html).text());
        recipeJSON.name = recipeName;
      return recipeJSON;
    })
    .catch(function(err){
      //handle error
      return({error: `Generic Scraper failed: ${err}`});
    });
};

allRecipeScraper = async (url) => {
  return await rp(url)
  .then(function(html){
    
    //let name, image, link, ingredients, directions;
    const allRecipeJSON = {name: '', image: '', link: '', ingredients: '', directions: ''} 
    
    const recipeName = ($('h1', html).text());
    allRecipeJSON.name = recipeName;

    const recipeImage = ($('.hero-photo__wrap img', html).attr('src'))
    allRecipeJSON.image = recipeImage;

    const recipeLink = url;
    allRecipeJSON.link = recipeLink;
    
    const recipeIngredientsArr = ($('.checkList__line', html).text().replace(/\s\s+/g, '\n').split('\n').slice(1, -3));
    allRecipeJSON.ingredients = parseIngredients(recipeIngredientsArr);
    
    const recipeDirectionsArr = ($('.step', html).text().replace(/\s\s+/g, '\n').split('\n').slice(1,-1));
  
    const dirArray = [];
    recipeDirectionsArr.forEach( (line, idx) => {
      // Set up the objects that need to be in the array
      const dirObj = {
        order: idx + 1,
        directions: line
      };
      dirArray.push(dirObj);
    });
    allRecipeJSON.directions = dirArray;

    // Grab the prep[0] and cook[1] times
    const timeArr = [];
   
    $('time',html).each( (i, elem) => {
      timeArr[i] = $(elem).text();
    });

    allRecipeJSON.prep_time = timeArr[0];
    allRecipeJSON.cook_time = timeArr[1];

    servArr = $('.subtext', html).text().split(' ');
    allRecipeJSON.servings = servArr[3];

    return allRecipeJSON;
  })
  .catch(function(err){
    //handle error
    return({error: `Scraper failed: ${err}`});
  });
  
}
//allRecipeScraper('https://www.allrecipes.com/recipe/241419/potato-scones/?internalSource=editorial_2&referringId=78&referringContentType=Recipe%20Hub');

pinchOfYumScraper = url =>{
    return rp(url)
    .then(function(html){

        //let name, image, link, ingredients, directions;
        const pinchRecipeJSON = {name: '', image: '', link: '', ingredients: '', directions: ''} 
        
        const recipeName = ($('h1', html).text());
        pinchRecipeJSON.name = recipeName;

        const recipeImage = ($('.first-image-share.share-pin img', html).attr('src'))
        pinchRecipeJSON.image = recipeImage;

        const recipeLink = url;
        pinchRecipeJSON.link = recipeLink;

        const recipeIngredientsArr = ($('.tasty-recipes-ingredients ul', html).text().split('\n').slice(1, -1).filter(item => item));
        pinchRecipeJSON.ingredients = parseIngredients(recipeIngredientsArr);

        const recipeDirectionsArr = ($('.tasty-recipes-instructions ol', html).text().split('\n').slice(1, -1));
        const dirArray = [];
        recipeDirectionsArr.forEach( (line, idx) => {
          // Set up the objects that need to be in the array
          const dirObj = {
            order: idx + 1,
            directions: line
          };
          dirArray.push(dirObj);
        });
        pinchRecipeJSON.directions = dirArray;

        const recipeServings = ( $('.tasty-recipes-yield span', html).data('amount') );
        pinchRecipeJSON.servings = recipeServings;

        return pinchRecipeJSON;
    })
}

//pinchOfYumScraper('https://pinchofyum.com/yummy-salmon-burgers-slaw');

module.exports = {checkUrl}
