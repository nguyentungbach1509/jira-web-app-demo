import Board from "./mainboard";
import Navbar from "./Navbar/navbar";
import './maincontent.css';
import ProjectForm from "../Projects/project_form";
import { useSelector } from "react-redux";
import {navbarSelector} from "../redux/selectors";
import AlertBox from "./Alert/alert";
import ProjectList from "../Projects/project_list";
import { projectsSelector } from "../redux/selectors";
import NoProject from "../Projects/no_projects";
import { issueSelector } from "../redux/selectors";
import IssueForm from "./Issue/issueform";
import IssueDetail from "../Card/issue_details";



function MainContent() { 

    const navOption = useSelector(navbarSelector);
    const {issueform} = useSelector(issueSelector);
    const {issueupdate} = useSelector(issueSelector);
    const {project} = useSelector(projectsSelector);


    return (
        <div className="maincontent__container">
            <Navbar/>
            {(navOption.select === "pformcreate") && (<ProjectForm/>)}
            {(navOption.select === "pform" && project) && (<ProjectForm/>)}
            {((navOption.select === "dashboard" || navOption.select === "re-dashboard") && project)&& (<Board/>)}
            {(!project && navOption.select !== "pformcreate")&& (<NoProject/>)}
            {navOption.over && (<ProjectList/>)}
            {(issueform && project) && (<IssueForm/>)}
            {(issueupdate && project) && (<IssueDetail/>)}
            <AlertBox/>
        </div>
    )
}

export default MainContent;