import React,{useEffect,useState} from 'react'
import Img from '../assets/img.jpg'

const NAME="name";

function Result(props) {
    const [name, setName] = useState("");

   useEffect(() => {
        const user = localStorage.getItem(NAME);
        setName(user.toUpperCase());
        localStorage.removeItem(NAME);
    },[])
    return (
        <div className="result-container">
            <div className="result-containeritems">
                <img src={Img} alt="pic" />
                <h1>{name},Your Score is {props.location.state.score}!!</h1>
                <h1><b>Difficulty level :</b> <span className="diff-level">{props.location.state.difficultylevel}</span></h1>
                <h3 className="heading">Question & Answer</h3>
                <div>{props.location.state.arr.map((ele) => {
                return <div className="Review-container"> <span><b>Question :</b> {ele.question}</span> <span><b>Ans :</b> {ele[`option${ele.correctopt}`]}</span> </div>
                })}</div>
                <h1>Your Percentile:{props.location.state.score*25}%</h1>
            </div>
        </div>
    )
}

export default Result
