import './expired_time.css';
import {FcHighPriority} from 'react-icons/fc';
import { useEffect} from 'react';



function ExpiredPage () {
    

    useEffect(() => {

        setTimeout(() => {
            window.location.reload();
        }, 1550);
    }, [])

    return (

        <div className="expiredpage__container">
            <div className="expiredpage__header">
                <FcHighPriority style={{fontSize: "1.15rem", marginBottom:"3px", boxSizing:"border-box"}}/>
                <h4>Expired Token</h4>
            </div>
            <div>
                <p>Users have to login to continue their tasks!</p>
                <p>This page will automatically back to login page.</p>
            </div>
        </div>
    )
}

export default ExpiredPage;