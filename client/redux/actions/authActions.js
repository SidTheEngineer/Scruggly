import actions from './index';

export default {
  userLoginRequest: () => ({
    type: actions.USER_LOGIN_REQUEST,
    userLoggingIn: true,
    userLoggedIn: false,
  }),
  userLoginSuccessful: () => ({
    type: actions.USER_LOGIN_SUCCESSFUL,
    userLoggingIn: false,
    userLoggedIn: true,
  }),
};
