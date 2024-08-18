import {createSlice, current} from "@reduxjs/toolkit";

interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    email: string;
    lastName: string;
    role: string;
    section: string;
    dob: string;
}


const initialState = {
    currentUser: [] as User[],
};
const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        updateUser: (state, {payload: user}) => {
            state.currentUser = state.currentUser.map((u: any) => {
                    if (u._id === user._id) {
                        return user;
                    } else {
                        return u;
                    }
                }
            );
        },
    },
});
export const {setCurrentUser, updateUser} = accountSlice.actions;
export default accountSlice.reducer