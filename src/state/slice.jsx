import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: {}
    },
    reducers: {
        adduser: (state, action) => {
            state.userData = action.payload
        }
    }
})
export const { adduser } = userSlice.actions
export default userSlice.reducer