import { useState, useCallback } from 'react';
import {FaSearch} from 'react-icons/fa';
import './searchcomponent.css';
import api from '../../axios/axios';
import issueSlice from '../../redux/issue/issue_reducer';
import { useDispatch, useSelector } from 'react-redux';
import searchSlice from '../../redux/search/search_reducer';
import tokenSlice from '../../redux/token/token_reducer';


const reformData = (data) => {
    let reform = [{status:"BACKLOG", issues: []}, 
        {status:"DEVELOPMENT", issues: []}, {status:"IN PROGRESS", issues: []}, 
        {status:"DONE", issues: []}];
        reform.forEach(e => {
            e.issues = data.filter(da => da.i_status === e.status);
        });
    return reform;
}


function SearchComponent(props) {

    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState();
    

    const handleChangeSearch = async (e) => {
        setSearchInput(e.target.value);
        //let tempIssues = [];
        try {
           // const res = await api.get('/issues/some', {params:{id:props.project.id}});
            const resSearch = await api.post('/issues/search', {id: props.project.id, search: e.target.value}); 
            console.log(resSearch.data.issues);
            /*const issues = reformData(res.data.issues);
            issues.forEach(iss => {
                tempIssues.push({status: iss.status, 
                    issues: iss.issues.filter(is => 
                        is.i_summary.toLowerCase().includes(e.target.value) || is.i_description.toLowerCase().includes(e.target.value) ||
                        is.i_type.toLowerCase().includes(e.target.value) || is.i_status.toLowerCase().includes(e.target.value) ||
                        is.i_prio.toLowerCase().includes(e.target.value) || (is.i_assign.users.filter(as => as.toLowerCase().includes(e.target.value))).length > 0)
                });
            });*/
    
            dispatch(issueSlice.actions.getAllIssues({issues:resSearch.data.issues, reform:true}));
            dispatch(searchSlice.actions.searchIssueChange(true));
        }
        catch(err) {
            dispatch(tokenSlice.actions.getErr(err.response.data.err));
        }
        
    };
      
    const debounce = (func) => {
        let timer;
        return function (...args) {
        const context = this;
        if (timer) {
            clearTimeout(timer);
            dispatch(searchSlice.actions.searchIssueChange(false));
        };
            timer = setTimeout(() => {
                timer = null;
                
                func.apply(context, args);
            }, 500);
        };
    };

    const optimizedFn = useCallback(debounce(handleChangeSearch), [props.project]);

    return (
        <div className="search__container">
            <div className="search__component">
                <div>
                    <div className="search__input">
                        <FaSearch/>
                        <input onChange={optimizedFn} type="text"/>
                    </div>
                </div>
                <div className="filterbtn__container">
                    <button>
                        Only My Issuses
                    </button>
                    <button>
                        Recently Updated
                    </button>
                </div>
                <div style={{flex: "1"}}></div>
            </div> 
        </div>
    )
}

export default SearchComponent;