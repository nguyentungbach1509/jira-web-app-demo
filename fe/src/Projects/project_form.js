import { useEffect, useState } from 'react';
import './project_form.css';
import api from '../axios/axios';
import { useDispatch } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import alertSlice from '../redux/alert/alert_reducer';
import {useSelector} from 'react-redux';
import { projectsSelector } from '../redux/selectors';
import projectSlice from '../redux/project/project_reducer'
import navbarSlice from '../redux/nav/nav_reducer';
import issueSlice from '../redux/issue/issue_reducer';
import tokenSlice from '../redux/token/token_reducer';


const dateFormChange = (date) => {
    return dayjs(date.toString().trim().split("/").reverse().join("-"));
}


function ProjectForm () {

    const dispatch = useDispatch();
    const {project, inputProject} = useSelector(projectsSelector);
    const[startDate, setStartDate] = useState(dayjs());
    const [dueDate, setDueDate] = useState(dayjs().add(1, 'day'));
    const [inputForm, setInputForm] = useState({
        pname:  "",
        pdescription: "",
        pcategory: "Software",
    });



    
    useEffect(() => {
        if(project && inputProject) {
            setInputForm({
                pname:  project.p_name,
                pdescription: project.p_description,
                pcategory: project.p_category,
            });
            setStartDate(dateFormChange(project.p_start_date));
            setDueDate(dateFormChange(project.p_due_date));
        }
        else {
            setInputForm({
                pname: "",
                pdescription: "",
                pcategory: "Software",
            });
            setStartDate(dayjs());
            setDueDate(dayjs().add(1, 'day'));
        }

        return () => {

        }
       
    }, [inputProject]);

    

    const handleInputOnChange = (e) => {
        const {name, value} = e.target;
        setInputForm({
            ...inputForm,
            [name]:value,
        })
    };

    const handleCreateUpdateProject = async(e) => {
        e.preventDefault();
        try {
            let res = null;
            if(project && inputProject) {
                res = await api.post("/projects/update", {id: project.id, project: {
                    ...inputForm,
                    startdate: "" + startDate.$D + "/" + ((startDate.$M + 1) > 9 ? (startDate.$M + 1): "0"+(startDate.$M + 1)) + "/" + startDate.$y,
                    duedate: "" + dueDate.$D + "/" + ((dueDate.$M + 1) > 9 ? (dueDate.$M + 1): "0"+(dueDate.$M + 1))  + "/" + dueDate.$y,
                }});
                const updatedRes = await api.get("/projects/project", {params: {id: project.id}});
                dispatch(projectSlice.actions.getProject(updatedRes.data.data[0]));
                const res_issues = await api.get('/issues/some', {params:{id: project.id}});
                dispatch(issueSlice.actions.getAllIssues({issues:res_issues.data.issues, reform:true}));
                dispatch(navbarSlice.actions.select_option("dashboard"));
                dispatch(navbarSlice.actions.type_selected(0));
            }
            else {
                res = await api.post("/projects/create", {project: {
                    ...inputForm,
                    startdate: "" + startDate.$D + "/" + ((startDate.$M + 1) > 9 ? (startDate.$M + 1): "0"+(startDate.$M + 1)) + "/" + startDate.$y,
                    duedate: "" + dueDate.$D + "/" + ((dueDate.$M + 1) > 9 ? (dueDate.$M + 1): "0"+(dueDate.$M + 1))  + "/" + dueDate.$y,
                }});
            }
            
            dispatch(alertSlice.actions.setAlertText(res.data));
            setInputForm({
                pname: "",
                pdescription: "",
                pcategory: "Software",
            });
            setStartDate(dayjs());
            setDueDate(dayjs().add(1, 'day'));
        }catch(err) {
            dispatch(tokenSlice.actions.getErr(err.response.data.err));
        }
    }

    return (
        <div className="projectform__container">
            <div>

            </div>
            <div className="projectform__formcontainer">
                <h2>{inputProject ? "Project Details" : "Create Project"}</h2>
                    <form>
                        <label>Name</label><br/>
                        <input name="pname" type="text" onChange={handleInputOnChange} value={inputForm.pname}/><br/>
                        <label>Description</label><br/>
                        <textarea name="pdescription" rows="5" onChange={handleInputOnChange} value={inputForm.pdescription}/><br/>
                        <label>Project Category</label><br/>
                        <select name="pcategory" onChange={handleInputOnChange} value={inputForm.pcategory}>
                            <option value="Software">Software</option>
                            <option value="Business">Business</option>
                            <option value="Marketing">Marketing</option>
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
                        <br/>
                        <button onClick={handleCreateUpdateProject}>
                            {inputProject ? "Save Changes" : "Create Project"}
                        </button>
                    </form>
            </div>
                
            <div>

            </div>
        </div>
    )
}

export default ProjectForm;