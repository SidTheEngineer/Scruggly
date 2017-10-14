import actions from '../actions';

export default (state = {
  userLoggedIn: false,
  userLoggingIn: false,
}, action) => {
  const { userLoggedIn, userLoggingIn } = action;
  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
      return Object.assign(state, {}, {
        userLoggingIn,
        userLoggedIn,
      });
    case actions.USER_LOGIN_SSUCCESSFUL:
      return Object.assign({}, state, {
        userLoggingIn,
        userLoggedIn,
      });
    default:
      return state;
  }
};
