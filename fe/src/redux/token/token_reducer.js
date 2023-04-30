import {createSlice} from '@reduxjs/toolkit';

export default createSlice({
    name: 'token',
    initialState: {
        err: null,
    },
    reducers: {
        getErr: (state, action) => {
            state.err = action.payload;
        }
    }
});