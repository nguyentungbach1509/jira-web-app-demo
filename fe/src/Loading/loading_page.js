import './loading_page.css';
import CircularProgress from '@mui/material/CircularProgress';




function LoadingPage() {
    return (
        <div className="loadingpage__container">
            <CircularProgress color="inherit" size={50}/>
        </div>
    )
}

export default LoadingPage;