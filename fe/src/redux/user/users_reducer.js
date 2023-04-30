import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../axios/axios';

const usersSlice =  createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {
        allUsers: (state, action) => {
            state.users = action.payload;
        }
    }, 
    extraReducers: builder => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        })
    }
});


export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
    const res = await api.get("/users");
    return res.data.users;
});


export default usersSlice;