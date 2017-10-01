import auth0 from 'auth0-js';
import history from '../utils/history';

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'scruggly.auth0.com',
      clientID: '4OS8I99O-bORftVO9XvJUkVpU1TC79jJ',
      redirectUri: 'http://localhost:8080/auth-callback',
      audience: 'https://scruggly.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid profile',
    });
  }

  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile = (callback) => {
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) { this.userProfile = profile; }
      callback(err, profile);
    });
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
      }
    });
  }

  setSession = (authResult) => {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/home');
  }

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    history.replace('/');
  }

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  login = () => {
    this.auth0.authorize();
  }
}
