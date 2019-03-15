import auth0 from 'auth0-js';

export default class Auth{
    auth0 =new auth0.WebAuth({
        domain: 'kookr-app.auth0.com',
        clientID: 'bDx67QkY7LDZi4lATMZn8eSySUOvr8Kk',
        redirectUri: 'https://kookr.netlify.com/create',
        // audience: '' ??
        //responseType:  ''
        //scope: '' ?? open prop
    })
}