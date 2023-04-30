import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios/axios";

export default createSlice({
    name: 'issue',
    initialState: {
        issueform: false,
        issueupdate: false,
        issues: [],
        issue: null,
    },
    reducers: {
        activeIssueForm: (state, action) => {
            state.issueform = action.payload;
        },
        getAllIssues: (state, action) => {
            if(action.payload.reform) {
                let reformIssues = [{status:"BACKLOG", issues: []}, 
                {status:"DEVELOPMENT", issues: []}, {status:"IN PROGRESS", issues: []}, 
                {status:"DONE", issues: []}];
                reformIssues.forEach(e => {
                    e.issues = action.payload.issues.filter(da => da.i_status === e.status);
                });
                state.issues = reformIssues;
            }
            else {
                state.issues = action.payload.issues;
            }
            
        },
        getOneIssue: (state, action) => {
            state.issue = action.payload;
        },
        issueUpdate: (state, action) => {
            state.issueupdate = action.payload;
        }
    }
});


