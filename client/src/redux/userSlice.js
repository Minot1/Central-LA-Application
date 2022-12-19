import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    isInstructor: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
});

console.log(userSlice);

export default userSlice.reducer;
