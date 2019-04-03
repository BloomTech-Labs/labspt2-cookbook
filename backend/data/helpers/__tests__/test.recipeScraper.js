const request = require('supertest');

const scraper = require('../recipeScraper');

const recipe1 = {
	"user_id": 1,
	"name": "test",
	"image": null,
	"link": "http://somewhersdfse.dev/recipe.html"
};

const recipe2 = {
  "user_id": 1,
	"name": "test",
	"image": null,
	"link": 'https://www.allrecipes.com/recipe/241419/potato-scones/?internalSource=editorial_2&referringId=78&referringContentType=Recipe%20Hub'
};

const recipe3 = {
  "user_id": 1,
	"name": "test",
	"image": null,
	"link": 'https://www.allrecipes.com/recipe/241419/potato-scones/?internalSource=editorial_2&referringId=78&referringContentType=Recipe%20Hub'
};

describe('the recipe scraper', () => {

 test.skip('checkUrl for recipe1 returns full json object', async () => {
    const response = await scraper.checkUrl(recipe1);
    expect(response).toBe(recipe1);
  });

  test.skip('checkUrl for recipe2 returns object', async () => {
    const response = await scraper.checkUrl(recipe2);
    expect(response).toBe(recipe2);
  });

  test.skip('checkUrl for recipe3 returns object', async() => {
    const response = await scraper.checkUrl(recipe3);
    expect(response).toBe(recipe3);
  });

  test('allRecipeScraper for recipe2 returns object', async () => {
    const response = await scraper.allRecipeScraper(recipe2.link);
    expect(response).toBe(recipe2);
  });
});