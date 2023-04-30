import './option.css';

function Option({Component, text}) {
    return (
        <div className="option__container">
            <Component style={{fontSize: "1.35rem"}}/>
            <p style={{flex:"1", marginLeft:"20px", fontSize: "0.875rem"}}>{text}</p>
        </div>
    )
}

export default Option;