import './project.css';
import projectSlice from '../redux/project/project_reducer'
import navbarSlice from '../redux/nav/nav_reducer';
import { useDispatch, useSelector} from 'react-redux';
import api from '../axios/axios';
import {RiDeleteBin2Fill} from 'react-icons/ri';
import { projectsSelector } from '../redux/selectors';
import issueSlice from '../redux/issue/issue_reducer';
import { navbarSelector } from '../redux/selectors';
import tokenSlice from '../redux/token/token_reducer';

function Project(props) {

    const dispatch = useDispatch();
    const project = useSelector(projectsSelector);
    const selectedDirect = useSelector(navbarSelector);

    const handleProjectClick = async() => {
        try {
            const res = await api.get("/projects/project", {params : {id: props.pid}});
            dispatch(projectSlice.actions.getProject(res.data.data[0]));
            const res_issues = await api.get('/issues/some', {params:{id: res.data.data[0].id}});
            dispatch(issueSlice.actions.getAllIssues({issues:res_issues.data.issues, reform: true}));
            dispatch(projectSlice.actions.changeInputProject(false));
            dispatch(navbarSlice.actions.select_option(selectedDirect.select === "re-dashboard" ? "dashboard" : "re-dashboard"));
            dispatch(navbarSlice.actions.type_selected(0));
            props.closeProjectListContainer();
        }catch(err) {
            dispatch(tokenSlice.actions.getErr(err.response.data.err));
        }
    }

    const handleDeleteProject = async () => {
        try {
            const res = await api.delete('/projects/delete', {params:{id: props.project.id}});
            dispatch(projectSlice.actions.getAllProjects(res.data.projects));
            if(props.project.id === project.project.id && res.data.projects.length > 0) {
                const res_issues = await api.get('/issues/some', {params:{id: res.data.project.id}});
                dispatch(issueSlice.actions.getAllIssues({issues: res_issues.data.issues, reform: true}));
                dispatch(projectSlice.actions.getProject(res.data.project));
            }

            if(res.data.projects.length === 0) {
                dispatch(projectSlice.actions.getProject(null));
            }

            dispatch(navbarSlice.actions.select_option(selectedDirect.select === "re-dashboard" ? "dashboard" : "re-dashboard"));
        }catch(err) {
            dispatch(tokenSlice.actions.getErr(err.response.data.err));
        }
    }

    return (
        <div className="projectelement__container">
            <div onClick={handleProjectClick} className="project__container">
                <h5>{props.project.p_name}</h5>
                <p>Start date:{props.project.p_start_date} - Due date:{props.project.p_due_date}</p>
            </div>
            <div title="Delete" className="deleteIcon__container" onClick={handleDeleteProject}>
                <RiDeleteBin2Fill/>
            </div>
        </div>
    )
}

export default Project;