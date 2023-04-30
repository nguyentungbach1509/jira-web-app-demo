import './navheader.css';

function NavHeader(props) {


    return (
        <div className="navheader__container">
            <div className="logo__container">

            </div>
            <div className="navheader__title">
                <p style={{color: "rgb(66, 82, 110)", fontWeight: "600", fontSize: "0.9rem"}}>{props.project ? props.project.p_name : "No Projects"}</p>
                <p style={{color:"rgb(94, 108, 132)", fontSize: "0.8rem"}}>{props.project ? props.project.p_category : "No"} project</p>
            </div>
        </div>
    )
}

export default NavHeader;