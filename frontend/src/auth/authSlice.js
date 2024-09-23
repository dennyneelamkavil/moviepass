import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userID: null,
    user: null,
    token: null,
    userName: null,
    lastLoggedIn: null,
    userRole: null,
    showLogin: true,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, lastLoggedIn } = action.payload;
      state.user = user;
      state.userID = user._id;
      state.userName = user.name;
      state.userRole = user.role;
      if (token) state.token = token;
      if (lastLoggedIn) state.lastLoggedIn = lastLoggedIn;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.userID = null;
      state.userName = null;
      state.lastLoggedIn = null;
      state.userRole = null;
      state.permissions = null;
    },
    toggleShowLogin: (state) => {
      state.showLogin = !state.showLogin;
    },
  },
});

export const { setCredentials, setLogout, toggleShowLogin } = authSlice.actions;
export default authSlice.reducer;
