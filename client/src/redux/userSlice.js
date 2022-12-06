import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
});

console.log(userSlice);

export default userSlice.reducer;
