import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        loggedUser:null,
        targetUser:null
    },
    reducers: {
        adduser: (state, action) => {
            return {...state,loggedUser:action.payload}
        },
        removeUser:(state,action)=>{
            return {...state,loggedUser:action.payload}
        },
        addTarget:(state,action)=>{
            return {...state,targetUser:action.payload}
        },
        removeTarget:(state,action)=>{
            return {...state,targetUser:action.payload}
        }
    }
})
export const { adduser,removeUser,addTarget,removeTarget } = userSlice.actions
export default userSlice.reducer