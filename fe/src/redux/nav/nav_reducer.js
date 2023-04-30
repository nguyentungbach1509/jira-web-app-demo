import {createSlice} from '@reduxjs/toolkit';

export default createSlice({
    name: "navbar",
    initialState: {
        select: "dashboard",
        select_type: 0,
        over: false,
    },
    reducers: {
        select_option: (state, action) => {
            state.select = action.payload;
        },
        over_option: (state, action) => {
            state.over = action.payload;
        },
        type_selected: (state, action) => {
            state.select_type = action.payload;
        }
    }
});