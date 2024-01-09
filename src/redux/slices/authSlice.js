import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user :null,
    users:[],
    permissions:[]
  };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state,action){
            state.user = action.payload
        },
        logout(state){
            state.user = null
        },
        allUsers(state,action){
            state.users = [...action.payload ]
        },
        allPermissions(state,action){
            state.permissions = [...action.payload ]
        }
    },
});


export  const {login,logout,allUsers,allPermissions} = authSlice.actions

export default authSlice.reducer