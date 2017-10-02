import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import authActions from '../redux/actions/authActions';

class HomePage extends Component {
  static propTypes = {
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

  render() {
    const { isAuthenticated } = this.props.auth;
    const { profile } = this.state;
    return (
      <div>
        <h1>This is the home page</h1>
        {
          isAuthenticated() && (
            <h3>You are logged in as: {profile.name}</h3>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
