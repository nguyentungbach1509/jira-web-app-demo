import { useState } from 'react';
import './shortcut.css';
import {SiJirasoftware} from 'react-icons/si'
import {FaList} from 'react-icons/fa';
import {AiOutlinePlus} from 'react-icons/ai';
import {MdOutlineCreateNewFolder} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import navbarSlice from '../redux/nav/nav_reducer';
import projectSlice from '../redux/project/project_reducer';
import api from '../axios/axios';
import issueSlice from '../redux/issue/issue_reducer';
import { projectsSelector } from '../redux/selectors';
import tokenSlice from '../redux/token/token_reducer';


function ShortCut() {

    const[open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const {project} = useSelector(projectsSelector);

    const handleCreateProject = () => {
        dispatch(navbarSlice.actions.select_option("pformcreate"));
        dispatch(navbarSlice.actions.type_selected(-1));
        dispatch(projectSlice.actions.changeInputProject(false));
    }

    const onClickProjectList = async () => {
        try {
            const res = await api.get('/projects/all');
            dispatch(projectSlice.actions.getAllProjects(res.data.data));
            dispatch(navbarSlice.actions.over_option(true));
        }
        catch(err) {
            dispatch(tokenSlice.actions.getErr(err.response.data.err));
        }
        
    }

    const handleCreateIssue = () => {
        if(project) {
            dispatch(issueSlice.actions.activeIssueForm(true));
        }
        
    }


    return (
        <div className={open ? "shortcut__container shortcut__container__active" : "shortcut__container"} 
        onMouseLeave={() => setOpen(!open)} onMouseEnter={() => setOpen(!open)}>
            <div className="jiraicon__container">
                <SiJirasoftware/>
            </div>
            <div onClick={handleCreateProject} className={open ? "shortcut__searchicon shortcut__searchicon__active" : "shortcut__searchicon"}>
                <MdOutlineCreateNewFolder/>
                {open && (<p>Create Project</p>)}
            </div>
            <div className={open ? "shortcut__plusicon shortcut__plusicon__active" : "shortcut__plusicon"} 
            style={{cursor: project ? "pointer" : "not-allowed"}} onClick={handleCreateIssue}>
                <AiOutlinePlus/>
                {open && (<p>Create Issue</p>)}
            </div>
            <div onClick={onClickProjectList} className={open ? "shortcut__listicon shortcut__listicon__active" : "shortcut__listicon"}>
                <FaList/>
                {open && (<p>Project Lists</p>)}
            </div>
        </div>
    )
}

export default ShortCut;