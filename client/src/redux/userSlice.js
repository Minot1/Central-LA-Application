import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    isInstructor: true,
    currentUser: null,
    isLoading: false,
    isFailed: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoginProcess: (state) => {
      state.isLoading = true;
    },
    successLogin: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isFailed = false;
    },
    failLogin: (state) => {
      state.isFailed = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.isFailed = false;
    }
  },
});

console.log(userSlice);

export const {
  startLoginProcess,
  successLogin,
  failLogin,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
