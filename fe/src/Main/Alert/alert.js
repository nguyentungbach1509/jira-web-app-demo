import './alert.css';
import { useSelector } from 'react-redux';
import { alertSelector } from '../../redux/selectors';
import { useDispatch } from 'react-redux';
import alertSlice from '../../redux/alert/alert_reducer';
import { useEffect } from 'react';

function AlertBox() {

    const alertText = useSelector(alertSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        let timer = null;
        let text = alertText.text;
        if(alertText.type !== "") {
            timer = setInterval(() => {
                dispatch(alertSlice.actions.setAlertText({text, type:""}));
            }, 1200);
        }

        return () => {
            clearInterval(timer);
        }
    }, [alertText])


    return (
        <div className={alertText.type === 0 ? "alertbox__container alertbox__containe__success" : alertText.type === 1 ? 
        "alertbox__container alertbox__containe__fail" : "alertbox__container"}>
           <p>{alertText.text}</p> 
        </div>
    )
}

export default AlertBox;