import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import Loading from './components/Loading';
import Auth from './auth/Auth';
import history from './utils/history';
import './index.css';

const auth = new Auth();

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const Root = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" render={props => <LandingPage auth={auth} {...props} />} />
        <Route exact path="/home" render={props => <HomePage auth={auth} {...props} />} />
        <Route
          exact
          path="/auth-callback"
          render={(props) => {
            handleAuthentication(props);
            return <Loading {...props} />;
          }}
        />;
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
