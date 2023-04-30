import './navbar.css';
import Navbody from './navbody';
import NavHeader from './navheader';
import OtherOptions from './nav_other_options';
import { useSelector } from 'react-redux';
import { projectsSelector } from '../../redux/selectors';

function Navbar ()  {

    const {project} = useSelector(projectsSelector);

    return (
        <div className="navbar__container">
            <NavHeader project={project}/>
            <Navbody/>
            <OtherOptions/>
        </div>
    )
}

export default Navbar;