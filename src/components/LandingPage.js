import React,{useState} from 'react';
import '../style/landing.css';
import swal from 'sweetalert';

const NAME = "name";
const NAME_ERROR = "Name is missing!!";
const QUIZ_PATH = "/quiz";
const EASY = "Easy";
const HARD = "Hard";
const MEDIUM = "Medium";
const ANY = "Any";

function LandingPage(props) {
    const [name, setUsername] = useState("");
    const handleSubmit = (difficulty) => {

        if (!name) {
            swal(NAME_ERROR);
            return
        }
        localStorage.setItem(NAME, name);
            props.history.push({
            pathname: QUIZ_PATH,
            state: { difficultylevel: difficulty}
        })
    }
    return (
        <div className="landing">
            <div className="container">
               <input className="textbox" type="text" placeholder="Enter Your Name"onChange={e=>setUsername(e.target.value)}></input>
                <div className="button-container">
                <button className="diff-button"onClick={()=>handleSubmit(EASY)}>Easy</button>
                <button className="diff-button" onClick={()=>handleSubmit(MEDIUM)}>Medium</button>
                <button className="diff-button" onClick={()=>handleSubmit(HARD)}>Hard</button>
                <button className="diff-button" onClick={()=>handleSubmit(ANY)}>Any</button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
