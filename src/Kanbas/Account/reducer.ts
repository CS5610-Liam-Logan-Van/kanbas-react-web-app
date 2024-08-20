import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            // If there's a date in the payload, convert it to a string
            if (action.payload?.dob instanceof Date) {
                action.payload.dob = action.payload.dob.toISOString();
            }
            state.currentUser = action.payload;
        },
    },
});

export const {setCurrentUser} = accountSlice.actions;
export default accountSlice.reducer;
