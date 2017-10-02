import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import authActions from '../redux/actions/authActions';

const LoginContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

class LandingPage extends Component {
  static propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,

    auth: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.func.isRequired,
      getProfile: PropTypes.func.isRequired,
      userProfile: PropTypes.shape({
        app_metadata: PropTypes.string,
        created_at: PropTypes.string,
        email: PropTypes.string,
        email_verified: PropTypes.string,
        identities: PropTypes.arrayOf(PropTypes.object),
        multifactor: PropTypes.string,
        name: PropTypes.string,
        nickname: PropTypes.string,
        phone_number: PropTypes.string,
        phone_verified: PropTypes.bool,
        picture: PropTypes.string,
        updated_at: PropTypes.string,
        user_id: PropTypes.string,
        user_metadata: PropTypes.string,
        username: PropTypes.string,
      }),
    }).isRequired,

    authActions: PropTypes.shape({
      userLoginRequest: PropTypes.func,
      userLoginSuccessful: PropTypes.func,
    }).isRequired,
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile, isAuthenticated } = this.props.auth;
    if (userProfile) {
      this.setState({ profile: userProfile });
    } else if (isAuthenticated()) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    }
  }

  goTo = (route) => {
    this.props.history.replace(`/${route}`);
  }

  login = () => {
    this.props.authActions.userLoginRequest();
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { profile } = this.state;
    return (
      <LoginContainer>
        <h1>This is the lading page</h1>
        {
          !isAuthenticated() && (
            <button onClick={this.login}>Log In</button>
          )
        }
        {
          isAuthenticated() && (
            <div>
              <h3>Welcome back, {profile.name}</h3>
              <button onClick={this.logout}>Log Out</button>
            </div>
          )
        }
      </LoginContainer>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
