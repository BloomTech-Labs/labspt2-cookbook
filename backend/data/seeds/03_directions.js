
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('directions').del()
    .then(function () {
      // Inserts seed entries
      return knex('directions').insert([
        {
          // dir_id: 1, 
          recipe_id: 1, order: 1, 
          directions: 'Combine milk with vinegar in a medium bowl and set aside for 5 minutes to "sour".'
        },
        {
          //dir_id: 2, 
          recipe_id: 1, order: 2, 
          directions: 'Combine flour, sugar, baking powder, baking soda, and salt in a large mixing bowl. Whisk egg and butter into "soured" milk. Pour the flour mixture into the wet ingredients and whisk until lumps are gone.'
        },
        {
          //dir_id: 3, 
          recipe_id: 1, order: 3, 
          directions: 'Heat a large skillet over medium heat, and coat with cooking spray. Pour 1/4 cupfuls of batter onto the skillet, and cook until bubbles appear on the surface. Flip with a spatula, and cook until browned on the other side.'
        },
        {
          //dir_id: 4, 
          recipe_id: 2, order: 1, 
          directions: 'Place egg in a saucepan and cover with cold water. Bring water to a boil and immediately remove from heat. Cover and let egg stand in hot water for 10 to 12 minutes. Remove from hot water; cool for 5 minutes. Peel and chop into bite-sized pieces.'
        },
        {
          //dir_id: 5, 
          recipe_id: 2, order: 2, 
          directions: 'In a medium bowl, mix together tuna and mayonnaise. Mix in egg, celery, relish and black pepper.'
        },
        {
          //dir_id: 6, 
          recipe_id: 3, order: 1, 
          directions: 'Prepare the sauce while the pasta is cooking to ensure that the spaghetti will be hot and ready when the sauce is finished; it is very important that the pasta is hot when adding the egg mixture, so that the heat of the pasta cooks the raw eggs in the sauce.'
        },
        {
          //dir_id: 7, 
          recipe_id: 3, order: 2, 
          directions: 'Bring a large pot of salted water to a boil. add the pasta and cook for 8 to 10 minutes or until tender yet firm (as they say in Italian: "al dente"). Drain the pasta well, reserving 1/2 cup of the starchy cooking water to use in the sauce if you wish.'
        },
        {
          //dir_id: 8, 
          recipe_id: 3, order: 3, 
          directions: 'Meanwhile, heat the olive oil in a deep skillet over medium flame. Add the pancetta and saute for about 3 minutes, until the bacon is crisp and the fat is rendered. Toss the garlic into the fat and saute for less than 1 minute to soften.'
        },
        {
          //dir_id: 9, 
          recipe_id: 3, order: 4, 
          directions: 'Add the hot, drained spaghetti to the pan and toss for 2 minutes to coat the strands in the bacon fat. Beat the eggs and Parmesan together in a mixing bowl, stirring well to prevent lumps. Remove the pan from the heat and pour the egg/cheese mixture into the pasta, whisking quickly until the eggs thicken, but do not scramble (this is done off the heat to ensure this does not happen). Thin out the sauce with a bit of the reserved pasta water, until it reaches desired consistency. Season the carbonara with several turns of freshly ground black pepper and taste for salt. Mound the spaghetti carbonara into warm serving bowls and garnish with chopped parsley. Pass more cheese around the table.'
        }
      ]);
    });
};
