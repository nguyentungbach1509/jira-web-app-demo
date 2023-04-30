import './login.css';
import {useState} from 'react';
import api from '../axios/axios';
import {useDispatch} from 'react-redux';
import userSlice from '../redux/user/user_reducer';
import {ImGoogle} from 'react-icons/im';



function Login () {

    const[input, setInput] = useState({email:"", password:""});
    const[signup, setSignUp] = useState(false);
    const[mess, setMess] = useState({text:"", color: "#dc3545", type: 0});
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);

    const fetchUser = async () => {
        const res = await api.get("/api/v1/auth/usergoogle");
        localStorage.setItem("token", res.data.token);
        dispatch(userSlice.actions.login(res.data.user[0]));
    }

    const socialSignin = (url) => {
        let timer = null;
        const newWindow = window.open(
            url,
            "_blank",
            "width=500, height=600"
        );
        
        if(newWindow) {
            timer = setInterval(() => {
                if(newWindow.closed) {
                    fetchUser();
                    if(timer) clearInterval(timer);
                }
            }, 500)
        }
    }

    const handleOnChangeForm = (e) => {
        const{name, value} = e.target;
        setInput({...input, [name]:value});
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        const res = await api.post('/users/login', {input});
        typeStyle(res.data);
    }

    const handleSignup = async(e) => {
        e.preventDefault();
        const res = await api.post('/users/signup', {input});
        typeStyle(res.data);
    }

    const typeStyle = (data) => {
        switch(data.type) {
            case 0:
                setMess({text:data.mess, color:"#28a745", type:data.type});
                break;
            case 1:
                setMess({text:data.mess, color:"#dc3545", type:data.type});
                break;
            case 2:
                setMess({text:data.mess, color:"#dc3545", type:data.type});
                break;
            case 3: 
                setMess({text:data.mess, color:"#dc3545", type:data.type});
                break;
            case 4:
                setMess({text:data.mess, color:"#dc3545", type:data.type});
                break;
            case 5: 
                setMess({text:data.mess, color:"#dc3545", type:data.type});
                break;
            case 6: 
                setMess({text:data.mess, color:"#dc3545", type:data.type});
                break;
            case 7: 
                localStorage.setItem("token", data.token);
                dispatch(userSlice.actions.login(data.user[0]));
                break;
        }
    }

    const signUpOnClick = (e) => {
        e.preventDefault();
        setInput({
            email: "",
            password: ""
        });
        setMess({text:"", color: "#dc3545", type: -1});
        setSignUp(!signup);
    }


    const googleSignIn = async (e) => {
        e.preventDefault();
        socialSignin("http://localhost:1337/api/v1/auth/google/");
    }

    return (
        <div className="loginpage__container">
            <div className="login__container">
                <form>
                    <figure aria-hidden="true">
                        <div className="person-body"></div>
                        <div className="neck skin"></div>
                        <div className="head skin">
                            <div className={`eyes ${checked && "close"}`}></div>
                            <div className="mouth"></div>
                        </div>
                        <div className="hair"></div>
                        <div className="ears"></div>
                        <div className="shirt-1"></div>
                        <div className="shirt-2"></div>
                    </figure>
                    <span style={{color: mess.color, fontSize: "0.68rem", fontWeight:"bold", marginBottom: "3px", boxSizing:"border-box"}}>{mess.text}</span><br/>
                    <label>Email</label><br/>
                    <input className={(mess.type === 3 || mess.type === 4 || mess.type === 1 || mess.type === 6) ? "error__input" : ""} name="email" type="email" value={input.email} onChange={handleOnChangeForm}/><br/>
                    <label>Password</label><br/>
                    <input className={(mess.type === 2 || mess.type === 4 || mess.type === 5 || mess.type === 6) ? "error__input" : ""} name="password" type={!checked ? "password":"text"} value={input.password} onChange={handleOnChangeForm}/><br/>
                    <div className="logincheckbox__container">
                        <input type="checkbox" name="show-password" className="show-password a11y-hidden" id="show-password" tabIndex="3" checked={checked} onChange={() => setChecked(!checked)}/>
                        <label className="label-show-password" htmlFor="show-password">
                            <span>Show Password</span>
                        </label>
                    </div>
                    {signup ? (
                        <div className="signupcontainer__buttons" style={{width: "100%"}}>
                            <button style={{width: "100%", marginBottom: "10px"}} onClick={handleSignup}>Create Account</button>
                            <button className="signupcontainer__backbutton" onClick={signUpOnClick}>Back to Login</button>
                        </div>) : (
                        <>
                            <div className="loginsignup__button">
                                <button onClick={handleLogin}>Login</button>
                                <button onClick={signUpOnClick}>Sign-up</button>
                            </div>
                            <div className="google__button" onClick={googleSignIn} style={{width: "100%"}}>
                                <div className="google__button__icon" >
                                    <ImGoogle />
                                </div>
                                <div className="google__button__text">
                                    <p>Sign in with Google</p>
                                </div>
                            </div>
                        </>
                    )}
                    
                </form>
            </div>
            
        </div>
        
    )
}

export default Login;