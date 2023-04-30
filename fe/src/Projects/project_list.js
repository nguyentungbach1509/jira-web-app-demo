import { useState } from 'react';
import './project_list.css';
import { useSelector } from 'react-redux';
import {projectsSelector} from '../redux/selectors';
import Project from './project';
import {IoIosCloseCircleOutline} from 'react-icons/io';
import { useDispatch } from 'react-redux';
import navbarSlice  from '../redux/nav/nav_reducer';
import projectSlice from '../redux/project/project_reducer';


function ProjectList() {

    const allProjects = useSelector(projectsSelector);
    const dispatch = useDispatch();


    const closeProjectListContainer = () => {
        dispatch(navbarSlice.actions.over_option(false));
    }

    return (
        <div className="background__container">
            <div className="projectlist__container">
                <div onClick={closeProjectListContainer} className="projectlist__close">
                    <IoIosCloseCircleOutline/>
                </div>
                <h2>Project List</h2>
                {allProjects.projects.length > 0 && (<div className="projectlist__div">
                    {allProjects.projects.map((p) => (
                        <Project key={p.id} pid={p.id} project={p} closeProjectListContainer={closeProjectListContainer}/>
                    ))}
                </div>)}
            </div>
        </div>
    )
}

export default ProjectList;