import './issue_detail.css';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useSelector, useDispatch } from 'react-redux';
import { usersSelector, issueSelector, userSelector, navbarSelector, projectsSelector} from '../redux/selectors';
import {IoIosCloseCircleOutline} from 'react-icons/io';
import issueSlice from '../redux/issue/issue_reducer';
import api from '../axios/axios';
import navbarSlice from '../redux/nav/nav_reducer';
import alertSlice from '../redux/alert/alert_reducer';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import tokenSlice from '../redux/token/token_reducer';

const dateFormChange = (date) => {
    return dayjs(date.toString().trim().split("/").reverse().join("-"));
}

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

function IssueDetail() {

    const theme = useTheme();
    const [styleInput, setStyleInput] = useState();
    const {users} = useSelector(usersSelector);
    const {issue} = useSelector(issueSelector);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const navbar = useSelector(navbarSelector); 
    const {project} = useSelector(projectsSelector);
    const[startDate, setStartDate] = useState(issue.i_start_date ? dateFormChange(issue.i_start_date) : dayjs());
    const [dueDate, setDueDate] = useState(issue.i_due_date ? dateFormChange(issue.i_due_date) : dayjs().add(1, 'day'));
    

    const initalInputForm = {
        p_id: "",
        i_type: issue.i_type,
        i_summary: issue.i_summary,
        i_description: issue.i_description,
        i_reporter:issue.i_reporter,
        i_assign: issue.i_assign,
        i_prio: issue.i_prio,
        i_status: issue.i_status,
        i_comment: "",
    };
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

      const closeIssueDetail = async() => {

        dispatch(issueSlice.actions.issueUpdate(false));
      } 

      const addComment = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/issues/issue/addcomments", {id: issue.id, user: user.email.split("@")[0], comment: inputForm.i_comment});
            dispatch(issueSlice.actions.getOneIssue(res.data.issue));
            setInputForm({
                ...inputForm,
                i_comment: ""
            });
        }
        catch(err) {
            dispatch(tokenSlice.actions.getErr(err.response.data.err));
        }
        
      }

      const handleUpdateIssue = async(e) => {
        e.preventDefault();
        try {
            const res = await api.post("/issues/update", {id: issue.id, issue: {
                i_summary: inputForm.i_summary,
                i_type: inputForm.i_type,
                i_description: inputForm.i_description,
                i_reporter: inputForm.i_reporter,
                i_assign: inputForm.i_assign,
                i_prio: inputForm.i_prio,
                i_status: inputForm.i_status,
                i_start_date: "" + startDate.$D + "/" + ((startDate.$M + 1) > 9 ? (startDate.$M + 1): "0"+(startDate.$M + 1)) + "/" + startDate.$y,
                i_due_date: "" + dueDate.$D + "/" + ((dueDate.$M + 1) > 9 ? (dueDate.$M + 1): "0"+(dueDate.$M + 1))  + "/" + dueDate.$y,
            }});
            const res_issues = await api.get('/issues/some',{params:{id: project.id}});
            dispatch(issueSlice.actions.getAllIssues({issues:res_issues.data.issues, reform:true}));
            dispatch(alertSlice.actions.setAlertText(res.data));
            dispatch(issueSlice.actions.issueUpdate(false));
            dispatch(navbarSlice.actions.select_option(navbar.select === "re-dashboard" ? "dashboard" : "re-dashboard"));
        }
        catch(err) {
            dispatch(tokenSlice.actions.getErr(err.response.data.err));
        }
        

      }

      const handleDeleteIssue = async(e) => {
        e.preventDefault();
        try {
            const res = await api.delete("/issues/delete", {params:{id: issue.id}});
            const res_issues = await api.get('/issues/some', {params:{id: project.id}});
            dispatch(issueSlice.actions.getAllIssues({issues:res_issues.data.issues, reform:true}));
            dispatch(alertSlice.actions.setAlertText(res.data));
            dispatch(issueSlice.actions.issueUpdate(false));
            dispatch(navbarSlice.actions.select_option(navbar.select === "re-dashboard" ? "dashboard" : "re-dashboard"));
        }
        catch(err) {
            dispatch(tokenSlice.actions.getErr(err.response.data.err));
        }
        
      }


    return(
        <div className="issuebackground__container">
            <div className="issue__detailcard">

                <div className="issuedetail__closecontainer" >   
                    <IoIosCloseCircleOutline style={{fontSize: "1.5rem", cursor:"pointer"}} onClick={closeIssueDetail}/>
                </div>
                <div className='issueDetail__container'>
                    <div className="detail__leftcontainer">
                        <div>
                            <select name="i_type" value={inputForm.i_type} onChange={handleChange}>
                                <option value="Task">&#9989; Task</option>
                                <option value="Bug">&#10071; Bug</option>
                                <option value="Story">&#128214; Story</option>
                            </select><br/>
                        </div>
                        <div>
                            <input type="text" name="i_summary" value={inputForm.i_summary} onChange={handleChange}/>
                        </div>
                        <div className="issue__descriptioncontainer">
                            <h5>Description</h5>
                            <textarea rows="5" name="i_description" value={inputForm.i_description} onChange={handleChange}/>
                        </div>
                        <div>
                            <h5>Comments</h5>
                            {issue.i_comments && (
                                <div className="comments__container">
                                {[...issue.i_comments].map((comment, i) => (
                                    <div key={i}>
                                        <label>{comment.user}: </label>
                                        <span>{comment.comment}</span>
                                    </div>
                                ))}
                            </div>
                            )}
                            <form>
                                <label>{user.email.split("@")[0]}</label>
                                <input name="i_comment" value={inputForm.i_comment} onChange={handleChange} placeholder='Add a comment...' type="text"/><br/>
                                <div className="commentbuttons__container">
                                    <button onClick={addComment} className="comment__savebutton">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="detail__rightcontainer">
                        <h5>STATUS</h5>
                        <select name="i_status" value={inputForm.i_status} onChange={handleChange}>
                            <option value="BACKLOG">BACKLOG</option>
                            <option value="DEVELOPMENT">DEVELOPMENT</option>
                            <option value="IN PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select><br/>
                        <h5>ASSIGNEES</h5>
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
                        </Select><br/>
                        <h5>PRIORITY</h5>
                        <select name="i_prio" value={inputForm.i_prio} onChange={handleChange}>
                            <option value="High">&#128314; High</option>
                            <option value="Medium">&#128313; Medium</option>
                            <option value="Low"><>&#128315;</> Low</option>
                        </select><br/>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DemoItem>
                                    <DatePicker 
                                        placeHolder = "hello"
                                        value={startDate}
                                        onChange={(newDate) => setStartDate(newDate)}  
                                        minDate={dayjs()}   
                                        label="Start Date"
                                        format="DD-MM-YYYY" />
                                </DemoItem>
                                <DemoItem>
                                    <DatePicker 
                                        value={dueDate}
                                        onChange={(newDate) => setDueDate(newDate)}  
                                        minDate={startDate}   
                                        label="Due Date" 
                                        format="DD-MM-YYYY"/>
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>
                <div className="updateissue__button">
                    <button className="update__button" onClick={handleUpdateIssue}>Update Issue</button>
                    <button className="delete__button" onClick={handleDeleteIssue}>Delete Issue</button>
                </div>
            </div>
        </div>
    )
};


export default IssueDetail;