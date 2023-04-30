import {createSlice} from '@reduxjs/toolkit';

export default createSlice({
    name: 'search',
    initialState: {
        searchIssue: false,
    },
    reducers: {
        searchIssueChange: (state, action) => {
            state.searchIssue = action.payload;
        }
    }
})