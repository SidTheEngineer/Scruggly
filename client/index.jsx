import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import store from './redux/store';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import Loading from './components/Loading';
import Auth from './auth/Auth';
import history from './utils/history';
import './index.css';

const auth = new Auth();
const RouteContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <RouteContainer>
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
      </RouteContainer>
    </Router>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
