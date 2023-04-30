import './App.css';
import api from './axios/axios';
import { useEffect, useState } from 'react';
import MainContent from './Main/maincontent';
import ShortCut from './Shortcut/shortcut';
import Login from './Login/login';
import {Switch, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { userSelector, tokenSelector} from './redux/selectors';
import LoginSuccess from './Login/login_success';
import { useDispatch } from 'react-redux';
import projectSlice from './redux/project/project_reducer';
import issueSlice from './redux/issue/issue_reducer';
import LoadingPage from './Loading/loading_page';
import { fetchUsers } from './redux/user/users_reducer';
import ExpiredPage from './Errors/expired_time';



function App() {

  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const {err} = useSelector(tokenSelector);

  useEffect(() => {
    async function fetchData() {
      const res = await api.get('/projects/all');
      dispatch(projectSlice.actions.getProject(res.data.data[0]));
      const res_issues = await api.get('/issues/some', {params:{id: res.data.data[0].id}});
      dispatch(issueSlice.actions.getAllIssues({issues: res_issues.data.issues, reform:true}));
      dispatch(fetchUsers());
      setLoading(false);
    }
    
    if(user._id) fetchData();
    
    return () => {
      
    }
  }, [user]);


  return (
    <div className={(!user._id || err) ? "App__login" : loading ? "App__loading" : "App"}>
      {err ? (<ExpiredPage/>) : (
        <Switch>
          <Route exact path="/">
            {!user._id && (<Login/>)}
            {(user._id && loading) && (<LoadingPage/>)}
            {(user._id && !loading) && (<><ShortCut/><MainContent/></>)}
          </Route>
          <Route exact path="/login/success">
            <LoginSuccess/>
          </Route>
      </Switch>
      )}
    </div>
  );
}

export default App
