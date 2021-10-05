import React,{useEffect,useState} from 'react'
import Img from '../assets/img.jpg';
import '../style/styles.css';
import Latex from 'react-latex';
import 'katex/dist/katex.min.css';

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
                <h3 className="heading">Question & Answer</h3>
                <div>{props.location.state.arr.map((ele) => {
                    return <div className="Review-container">
                        <ul><li className="que-ans" ><b>Question :</b> <Latex >{ele.question}</Latex ></li>
                        <li  className="que-ans"><b>Ans :</b> <Latex >{ele[`option${ele.correctopt}`]}</Latex ></li>
                        <li className="diff-level"> {ele.difficultylevel}</li> </ul></div>
                })}</div>
                <h1>Your Percentile:{props.location.state.score*25}%</h1>
            </div>
        </div>
    )
}

export default Result
