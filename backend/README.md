# Backend API 
Back-end deplyoment link: https://kookr.herokuapp.com/

Startup: *yarn server*

---

## Users

### Returns:
```json
  {
    "user_id": 3,
    "auth_id": "cdef345",
    "email": "user3@none.com",
    "type": "0",
    "billing_date": null
  }
```

### Routes:
* **GET : /api/user**       -- Get list of all users
* **GET : /api/user/:id**   -- Get one user
* **POST: /api/user**       -- Add new user
* * -- Requires: auth_id, email
* **PUT : /api/user/:id**   -- Edit user
* * -- Requires: auth_id, email

---

## Recipes

### Returns:
```json
{
    "recipe_id": 1,
    "name": "Fluffy Pancakes",
    "image": "https://images.media-allrecipes.com/userphotos/720x405/5079227.jpg",
    "link": "https://www.allrecipes.com/recipe/162760/fluffy-pancakes/?internalSource=hub%20recipe&referringId=78&referringContentType=Recipe%20Hub",
    "ingredients": [
        {
            "id": 1,
            "amount": 0.75,
            "measurement": "cup",
            "name": "milk"
        },
        ...
    ],
    "directions": [
        {
            "order": 1,
            "directions": "Combine milk with vinegar in a medium bowl and set aside for 5 minutes to \"sour\"."
        },
        ...
    ]
}
```

### Routes:
* **GET : /api/recipes/:id**   -- Get one complete recipe
* **GET : /api/recipes/user/:id** -- Get list of recipes by user_id
* **POST: /api/recipes**       -- Add new recipe
* * -- Requires: user_id, name, link
* **DELETE: /api/recipes/:rid/user/:uid** -- Unlink recipe from user

---

## Ingredients

### Routes:
* **GET : /api/ingredients/recipe/:id**   -- Get list of ingredients by recipe id
* **GET : /api/ingredients/name** -- Get list of ingredients by name
* * -- Requires: name (in body) 
* * -- Returns: recipe_id, recipe_name, ing_id, name

---

## Tags

### Routes:

---

## Shopping List

### Routes:
* **GET : /api/list/user/:id/**  -- Gets shopping list for date & user
* **GET : /api/list/:id** -- Gets a shopping list item by it's ID
* **POST: /api/list/user/:id/** -- Posts new shopping list item for user
* * -- Requires: ing_id, start, end (dates: 2019-04-10)
* * -- Optional: amount, measurement
* **PUT: /api/list/:id** -- Edits shopping list item
* * -- Requires: ing_id, start, end
* * -- Optional: amount, measurement
* **DELETE: /api/list/:id** -- Deletes shopping list item