export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const userName = state => state.auth.user.login;
export const userEmail = state => state.auth.user.email;