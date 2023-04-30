import './taskcard.css';
import {Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import issueSlice from '../redux/issue/issue_reducer';
import api from '../axios/axios';
import tokenSlice from '../redux/token/token_reducer';

function TaskCard(props) {

    const dispatch = useDispatch();

    const onClickDetail = async () => {
        try {
            const res = await api.get("/issues/issue", {params:{id: props.task.id}});
            dispatch(issueSlice.actions.getOneIssue(res.data.issue[0]));
            dispatch(issueSlice.actions.issueUpdate(true));
        }catch(err) {
            dispatch(tokenSlice.actions.getErr(err.response.data.err));
        }
        
    }

    return(
        <Draggable draggableId={props.task.id} index={props.index}>
        {(provided) => (
            <div className="task__container" onClick={onClickDetail} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <p style={{fontSize:"0.85rem", fontWeight:"500", overFlow:"hidden"}}>{props.task.i_summary}</p>
                <div>
                    <span>
                        {props.task.i_type === "Task" && (<span>&#9989;</span>)}
                        {props.task.i_type === "Bug" && (<span>&#10071;</span>)}
                        {props.task.i_type === "Story" && (<span>&#128214;</span>)}
                    </span>
                    <span>
                        {props.task.i_prio === "High" && (<span>&#128314;</span>)}
                        {props.task.i_prio === "Low" && (<span>&#128315;</span>)}
                        {props.task.i_prio === "Medium" && (<span>&#128313;</span>)}
                    </span>
                </div>
                <div className="issuedate__container">
                    <p>Dates: {props.task.i_start_date} - {props.task.i_due_date}</p>
                </div>
            </div>
        )}
    </Draggable>
        
    )
}

export default TaskCard;