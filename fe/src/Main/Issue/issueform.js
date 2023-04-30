import './issueform.css';
import { useSelector, useDispatch } from 'react-redux';
import { navbarSelector, projectsSelector } from '../../redux/selectors';
import issueSlice from '../../redux/issue/issue_reducer';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { usersSelector } from '../../redux/selectors';
import api from '../../axios/axios';
import alertSlice from '../../redux/alert/alert_reducer';
import navbarSlice from '../../redux/nav/nav_reducer';
import tokenSlice from '../../redux/token/token_reducer';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function IssueForm() {

    const {project} = useSelector(projectsSelector);
    const {users} = useSelector(usersSelector);
    const dispatch = useDispatch();
    const [styleInput, setStyleInput] = useState();
    const selectedDirect = useSelector(navbarSelector);

    const initalInputForm = {
        p_id: "",
        i_type: "Task",
        i_summary: "",
        i_description: "",
        i_reporter: users[0].email.split("@")[0],
        i_assign: {users: [users[0].email.split("@")[0]]},
        i_prio: "Low",
        i_status: "BACKLOG"
    };

    const theme = useTheme();
    const [inputForm, setInputForm] = useState({...initalInputForm});

    const handleChange = (event) => {
        const {name, value} = event.target;
        if(styleInput) {
            setStyleInput();
        }
        if(name === "i_assign") {
            setInputForm({
                ...inputForm,
                [name]: {users:typeof value === 'string' ? value.split(',') : value}
            });
        }
        else {
            setInputForm({
                ...inputForm,
                [name]: value
            });
        }
      };

    const closeIssueForm = (e) => {
        e.preventDefault();
        dispatch(issueSlice.actions.activeIssueForm(false));
    }

    const handleCreateIssue = async (e) => {
        e.preventDefault();
        try {
            if(inputForm.i_summary.length > 0) {
                const res = await api.post('/issues/create', {issue:{
                    ...inputForm,
                    p_id: project.id
                }});
                dispatch(alertSlice.actions.setAlertText(res.data));
                setStyleInput();
                const loadIssues = await api.get('/issues/some', {params:{id: project.id}});
                dispatch(issueSlice.actions.getAllIssues({issues:loadIssues.data.issues, reform:true}));
                dispatch(navbarSlice.actions.select_option(selectedDirect.select === "re-dashboard" ? "dashboard" : "re-dashboard"));
                dispatch(issueSlice.actions.activeIssueForm(false));
            }
            else {
                setStyleInput({border: "2px solid #f44336"});
            }
    
            setInputForm({
                ...initalInputForm
            });
        }
        catch(err) {
            dispatch(tokenSlice.actions.getErr(err.response.data.err));
        }
        
        
    }

    return (
        <div className="issuebackground__container">
            <div className="issueform__container">
                <div className="issue__form">
                    <h4>Create Issuse</h4>
                    <form>  
                        <label>Issue Type</label><br/>
                        <select name="i_type" value={inputForm.i_type} onChange={handleChange}>
                            <option value="Task">&#9989; Task</option>
                            <option value="Bug">&#10071; Bug</option>
                            <option value="Story">&#128214; Story</option>
                        </select><br/>
                        <label>Short Summary</label><br/>
                        <input style={styleInput} placeholder={styleInput && "Cant be blank"} name="i_summary" type="text" maxLength={30} value={inputForm.i_summary} onChange={handleChange}/><br/>
                        <label>Description</label><br/>
                        <textarea name="i_description" rows="5" value={inputForm.i_description} onChange={handleChange}/><br/>
                        <label>Reporter</label><br/>
                        <select name="i_reporter" value={inputForm.i_reporter} onChange={handleChange}>
                            {users.map(u => (
                                <option key={u.id} value={u.id}>{u.email.split("@")[0]}</option>
                            ))}
                        </select><br/>
                        <label>Assignees</label><br/>
                        <Select
                            style={{width: "100%", marginBottom:"15px"}}
                            name="i_assign"
                            multiple
                            value={inputForm.i_assign.users}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                <Chip key={value} label={value} />
                                ))}
                            </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {users.map((u) => (
                            <MenuItem
                                key={u.id}
                                value={u.email.split("@")[0]}
                                style={getStyles(u.email.split("@")[0], inputForm.i_assign.users, theme)}
                            >
                                {u.email.split("@")[0]}
                            </MenuItem>
                            ))}
                        </Select>
                        <div className="formprio__container">
                            <div>
                                <label>Priority</label><br/>
                                <select name="i_prio" value={inputForm.i_prio} onChange={handleChange}>
                                    <option value="High">&#128314; High</option>
                                    <option value="Medium">&#128313; Medium</option>
                                    <option value="Low"><>&#128315;</> Low</option>
                                </select>
                            </div>
                            <div>
                                <label>Status</label>
                                <select name="i_status" value={inputForm.i_status} onChange={handleChange}>
                                    <option value="BACKLOG">BACKLOG</option>
                                    <option value="DEVELOPMENT">DEVELOPMENT</option>
                                    <option value="IN PROGRESS">IN PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </select>
                            </div>
                        </div>
                        <div className="issueform__buttoncontainer">
                            <div></div>
                            <div className="issueform__buttons">
                                <button onClick={handleCreateIssue} className="issueform_createbutton">Create Issue</button>
                                <button onClick={closeIssueForm} className="issueform_cancelbutton">Cancel</button>
                            </div>
                        </div>  
                    </form>
                </div>
            </div>
        </div>
    )
}

export default IssueForm;