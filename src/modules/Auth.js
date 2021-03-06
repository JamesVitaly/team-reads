import auth0 from 'auth0-js';
import history from './history';

const { REACT_APP_AUTH_CLIENT_ID, REACT_APP_TEAM_READS_DOMAIN } = process.env;

export default class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'jamesvitaly.eu.auth0.com',
      clientID: `${REACT_APP_AUTH_CLIENT_ID}`,
      audience: 'https://jamesvitaly.eu.auth0.com/userinfo',
      redirectUri: `${REACT_APP_TEAM_READS_DOMAIN}/callback`,
      responseType: 'token id_token',
      scope: 'openid profile email app_metadata',
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
}

  login() {
    this.auth0.authorize();
  }


  getProfile() {
    return JSON.parse(localStorage.getItem('id_token_payload'));
  }

  getAccessToken(){
    return localStorage.getItem('access_token');
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.push('/');
      } else if (err) {
        history.push('/login');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    console.log(authResult)
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('id_token_payload', JSON.stringify(authResult.idTokenPayload));
    // navigate to the home route
    history.replace('/home');
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('id_token_payload');
    // navigate to the home route
    history.replace('/login');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
