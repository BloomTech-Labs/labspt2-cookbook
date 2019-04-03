This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


### How to use the Reducer 

The reducer is meant to keep state while the application is running between pages. it is also meant to abstract some loading processes away from the dom like through componentDidMount. 

##RecipeReducer

dispatchs available

this.props.getRecipes(userid)
    takes = USERID
    related action: GET_RECIPES
    action file: RecipeActions
    axios call inside of actions? : yes axios.get()

    gets recipes based on the userId that is loaded into the application currently the user id is set to "1"

this.props.getSelectedRecipe(object_with_recipe_id_as_a_value)
    takes = object with recipe id as a value
    related action: GET_SELECTED_RECIPE
    action file: RecipeActions
    no axios call necessary filters by available recipes in the reducer

##UserReducer

this.props.addUser(userObject)
    takes a user object
    related action: ADD_USER
    action file: UserActions
    no axios call necessary.

##CalendarReducer

this.props.getCalendarItem(object_with_recipe_id_as_a_value)
    takes: object with recipe id as a value
    related action: GET_CALENDAR_ITEM
    action file: CalendarActions
    will need an axios call but we do not have a route for those calls
    place holder axios.get is present. 

this.props.addCalendarItem(calendarItem)
    takes: calendar Object
    related action: ADD_CALENDAR_ITEM
    action file: CalendarActions
    will need an axios call when we have the route for calendar items

##DirectionsReducer

this.props.getDirections(object_with_recipe_id_as_a_value)
    takes: object with recipe_id as a value
    related action: GET_DIRECTIONS
    action file: DirectionsActions
    may or may not need an axios call depending on when this is called.
    need to examine is use case more

this.props.addDirections(SingleDirectionsObject)
    takes: single directions object
    action file: DirectionsActions
    may or may not need an axios call depending on when this is called.
    need to examine is use case more
    

##IngredientsReducer

this.props.getIngredients(object_with_recipe_id_as_a_value)
    takes: object with recipe_id as a value
    action file: IngredientsActions
    will need to have an axios call

this.props.addIngredients(object_with_recipe_id_as_a_value)
    takes: object with recipe_id as a value
    action file: IngredientsActions
    will need to have an axios call


##RecipeIngredientsReducer

this.props.addRecipeIngredients(singleRecipeIngredient)
    takes: single recipe ingredient object
    action file: RecipeIngredientsActions
    this may work off of other axios calls and just take in an output of another call

##TagsReducer

this.props.getTags(object_with_tag_id_id_as_a_value)
    takes: object with tag_id as a value
    action file: tagActions
    This will need an axios call just to make sure our ingredients state is up to date. dont have it implemented yet.

this.props.addTag(tagObject)
    takes: a single tag object
    action file: tagActions
    this will need to have an axios call depending on if we are using it to update the database or just updating the local state when we have tags we find we need to save or use in someway.