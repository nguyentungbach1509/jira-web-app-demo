import {configureStore} from '@reduxjs/toolkit';
import userSlice from './user/user_reducer';
import navbarSlice from './nav/nav_reducer';
import alertSlice from './alert/alert_reducer';
import projectSlice from './project/project_reducer';
import issueSlice from './issue/issue_reducer';
import usersSlice from './user/users_reducer';
import searchSlice from './search/search_reducer';
import tokenSlice from './token/token_reducer';

const store = configureStore({
    reducer: {
        userLogin: userSlice.reducer,
        navbar_selection: navbarSlice.reducer,
        alert_text: alertSlice.reducer,
        getProjects: projectSlice.reducer,
        issueConfig: issueSlice.reducer,
        usersReducer: usersSlice.reducer,
        searchReducer: searchSlice.reducer,
        tokenReducer: tokenSlice.reducer,
    }
});

export default store;