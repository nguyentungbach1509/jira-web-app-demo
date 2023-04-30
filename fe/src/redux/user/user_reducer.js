import {createSlice} from '@reduxjs/toolkit';


export default createSlice({
    name: 'user',
    initialState: {
        _id: "",
        googleId: "",
        email: "",
    },
    reducers: {
        login: (state, action) => {
            state._id = action.payload.id;
            state.googleId = action.payload.email;
            state.email = action.payload.email;
        }
    }
});
