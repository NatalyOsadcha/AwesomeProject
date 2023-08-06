export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const userName = state => state.auth.user.login;
export const userEmail = state => state.auth.user.email;

export const selectUser = state => state.auth.user;

export const userId = state => state.auth.uid;