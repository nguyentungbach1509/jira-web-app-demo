import {createSlice} from '@reduxjs/toolkit';

export default createSlice({
    name: "alert",
    initialState: {
        text: "",
        type: ""
    },
    reducers: {
        setAlertText: (state, action) => {
            state.text = action.payload.mess;
            state.type = action.payload.type;
        }
    }

});