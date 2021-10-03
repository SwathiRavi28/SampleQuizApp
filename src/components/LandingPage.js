import React,{useState} from 'react';
import '../style/landing.css'

function LandingPage(props) {
    const [name, setUsername] = useState("");
    const handleSubmit=(difficulty) => {
        props.history.push({
            pathname: '/quiz',
            state: { diff: difficulty,name}
        })
    }
    return (
        <div className="landing">
            <div className="container">
                <input type="text" onChange={e=>setUsername(e.target.value)}></input>
                <div className="button-container">
                <button onClick={()=>handleSubmit("Easy")}>Easy</button>
                <button onClick={()=>handleSubmit("Medium")}>Medium</button>
                <button onClick={()=>handleSubmit("Hard")}>Hard</button>
                <button onClick={()=>handleSubmit("Any")}>Any</button>
            </div>
        </div>
            
        </div>
    )
}

export default LandingPage
