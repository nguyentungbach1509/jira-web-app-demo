import { useEffect } from 'react';
import './login_success.css';
import {FcApproval} from 'react-icons/fc';


function LoginSuccess () {
    useEffect(() => {
        setTimeout(() => {
            window.close();
        }, 1000)
    }, [])

    return (
        <div className="loginsuccess__container">
            <div className="loginsuccess__header">
                <FcApproval style={{fontSize: "1.15rem", marginBottom:"3px", boxSizing:"border-box"}}/>
                <h4>Login Success</h4>
            </div>
            <div>
                <p>User loggedin successfully!!!</p>
                <p>This window will automatically close.</p>
            </div>
        </div>
    )
}

export default LoginSuccess;