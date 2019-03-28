import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
//import Provider from 'react-redux';
import { UserReducer } from '../src/reducers/UserReducer';
import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { RecipeReducer } from './reducers/RecipeReducer';
import { DirectionsReducer } from './reducers/DirectionsReducer';
import { RecipeIngredientsReducer } from './reducers/RecipeIngredientsReducer';
import { IngredientsReducer } from './reducers/IngredientsReducer';
import { TagsReducer } from './reducers/TagsReducer';
import { CalendarReducer } from './reducers/CalendarReducer';


const rootReducer = combineReducers({
    UserReducer: UserReducer,
    RecipeReducer: RecipeReducer,
    DirectionsReducer: DirectionsReducer,
    RecipeIngredientsReducer: RecipeIngredientsReducer,
    IngredientsReducer: IngredientsReducer,
    TagsReducer: TagsReducer,
    CalendarReducer: CalendarReducer
});

const middleware = [thunk, logger]

const store = createStore(rootReducer, applyMiddleware(...middleware));

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

