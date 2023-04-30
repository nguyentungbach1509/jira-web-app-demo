import BoardHeader from "./Header/board-header";
import './board.css';
import TaskCard from "../Card/taskcard";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { projectsSelector, issueSelector,searchSelector} from "../redux/selectors";
import issueSlice from '../redux/issue/issue_reducer';
import api from "../axios/axios";
import { navbarSelector } from "../redux/selectors";
import tokenSlice from '../redux/token/token_reducer';




function Board() {
 
    const {issues} = useSelector(issueSelector);
    const[data, setData] = useState([...issues]);
    const {project} = useSelector(projectsSelector);
    const dispatch = useDispatch();
    const {select} = useSelector(navbarSelector);
    const {searchIssue} = useSelector(searchSelector);

    useEffect(() => {
        setData([...issues]);
    }, [select, searchIssue]);
    

    const handleDragEnd = async (result) =>  {
        const tempData = [...data];
        if(!result.destination) return;
        const {source, destination} = result;
        if(source.droppableId === destination.droppableId) {
            const [items] = data.filter(a => a.status === source.droppableId);
            const itemsIssues = [...items.issues];
            const [reorderedItem] = itemsIssues.splice(source.index, 1);
            itemsIssues.splice(destination.index, 0, reorderedItem);
            const index = tempData.findIndex(e => e.status === items.status);
            tempData.splice(index, 1);
            tempData.splice(index, 0, {status: items.status, issues: [...itemsIssues]});
            setData(tempData);
        }
        else {
            try {
                const [sourceItems] = data.filter(a => a.status === source.droppableId);
                const sourceItemIssues = [...sourceItems.issues];
                const [destItems] = data.filter(a => a.status === destination.droppableId);
                const destItemIssues = [...destItems.issues];
                const [reorderedItem] = sourceItemIssues.splice(source.index, 1);
                destItemIssues.splice(destination.index, 0, reorderedItem);
                const data_source_index = tempData.findIndex(e => e.status === source.droppableId);
                const data_dest_index = tempData.findIndex(e => e.status === destination.droppableId);
                tempData.splice(data_source_index, 1);
                tempData.splice(data_source_index, 0, {status: sourceItems.status, issues: [...sourceItemIssues]});
                tempData.splice(data_dest_index, 1);
                tempData.splice(data_dest_index, 0, {status:destItems.status, issues: [...destItemIssues]});
                setData(tempData);
                dispatch(issueSlice.actions.getAllIssues({issues: tempData, reform: true}));
                await api.post('/issues/status', {id: reorderedItem.id, status: destItems.status});
            }
            catch(err) {
                dispatch(tokenSlice.actions.getErr(err.response.data.err));
            }
            
        }
        
    }

    return (
        <div className="board__container">
            <BoardHeader project={project}/>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="main__content">
                    {data.map((e, i) => (
                        <Droppable key={i} droppableId={e.status}>
                           {(provided) => (
                                <div>
                                    <p>{e.status}</p>
                                    <div  {...provided.droppableProps} ref={provided.innerRef}>
                                        {e.issues.map((er, index) => (
                                            <TaskCard task={er} key={er.id} index={index}/>
                                        ))}
                                        {provided.placeholder}
                                    </div> 
                                </div>
                            )}  
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    )
}


export default Board