import './navbody.css';
import {MdOutlineDashboard} from "react-icons/md";
import {FiSettings} from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import navbarSlice from '../../redux/nav/nav_reducer';
import projectSlice from '../../redux/project/project_reducer';
import { navbarSelector } from '../../redux/selectors';
import api from '../../axios/axios';
import issueSlice from '../../redux/issue/issue_reducer';
import { projectsSelector } from '../../redux/selectors';
import tokenSlice from '../../redux/token/token_reducer';

function Navbody() {

    const onSelect = useSelector(navbarSelector);
    const dispatch = useDispatch();
    const {project} = useSelector(projectsSelector);

    const handleNavbarOnClick = (number, value) => {
        dispatch(navbarSlice.actions.select_option(value));
        dispatch(navbarSlice.actions.type_selected(number));
    }

    const handleProjectSetting = (number, value) => {
        handleNavbarOnClick(number, value);
        dispatch(projectSlice.actions.changeInputProject(true));
    }

    const handleClickBoard = async (number, value) => {
        try {
            const res = await api.get('/issues/some', {params:{id: project.id}});
            handleNavbarOnClick(number, value);
            dispatch(issueSlice.actions.getAllIssues({issues:res.data.issues, reform: true}));
        }catch(err){
            dispatch(tokenSlice.actions.getErr(err.response.data.err));
        }
    }
    
   

    return (
        <div className="navbody__container">
            <div onClick={() => handleClickBoard(0, "dashboard")} className={onSelect.select_type === 0 ? "selected" : ""}>
                <MdOutlineDashboard style={{fontSize: "1.35rem"}}/>
                <p style={{flex:"1", marginLeft:"20px", fontSize: "0.875rem"}}>Kanban Board</p>
                
            </div>
            <div onClick={() => handleProjectSetting(1, "pform")} className={onSelect.select_type === 1 ? "selected" : ""}>
                <FiSettings style={{fontSize: "1.35rem"}}/>
                <p style={{flex:"1", marginLeft:"20px", fontSize: "0.875rem"}}>Project settings</p>
            </div>
        </div>
    )
}

export default Navbody;