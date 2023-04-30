import './board-header.css';
import { FaGithub} from 'react-icons/fa';
import SearchComponent from './board-search';

function BoardHeader(props) {
    return (
        <>
            {props.project && (
                <div style ={{marginBottom: "20px"}}>
                    <p>Projects / {props.project.p_name} / Kanban Board</p>
                    <div className="header__middle">
                        <p>{props.project.p_name}</p>
                        <a href='https://github.com/nguyentungbach1509?tab=repositories'target="_blank">
                            <FaGithub/>
                            <span>Github Repo</span>
                        </a>
                    </div>
                    <SearchComponent project={props.project}/>
                </div>
            )}
        </>
        
    )
}

export default BoardHeader;