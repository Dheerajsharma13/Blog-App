import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            console.log({ state, action})
            state.userData = action.payload;
            console.log(state.userData)
            console.log(state.status)
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
     }
})

export const {login, logout} = authSlice.actions;

export default authSlice;