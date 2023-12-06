import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignIn : (state, action) => {
        state.currentUser = action.payload;
    },
    LogOut:(state) =>{
        state.currentUser = null;
    }
  },
});


export const { SignIn, LogOut } = userSlice.actions;

export default userSlice.reducer