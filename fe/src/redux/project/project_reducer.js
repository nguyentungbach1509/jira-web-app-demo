import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../axios/axios';


const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        project: null,
        inputProject: false
    },
    reducers: {
        getAllProjects: (state, action) => {
            state.projects = action.payload;
        },

        getProject: (state, action) => {
            state.project = action.payload;
        },
        changeInputProject: (state, action) => {
            state.inputProject = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            state.projects = action.payload;
        }).addCase(fetchProject.fulfilled, (state, action) => {
            console.log(action.payload);
            state.project = action.payload;
        })
    }
});

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async() => {
    const res = await api.get('/projects/all');
    return res.data.data;
   
});

export const fetchProject = createAsyncThunk('projects/fetchProject', async(id) => {
    const res = await api.get("/projects/project", {params : {id}});
    return res.data.data[0];
})


export default projectSlice;