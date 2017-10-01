import auth0 from 'auth0-js';

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'scruggly.auth0.com',
      clientID: '4OS8I99O-bORftVO9XvJUkVpU1TC79jJ',
      redirectUri: 'http://localhost:3000/auth/callback',
      audience: 'https://scruggly.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid',
    });
  }

  login() {
    this.auth0.authorize();
  }
}
