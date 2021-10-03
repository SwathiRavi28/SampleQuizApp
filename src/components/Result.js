import React from 'react'

function Result(props) {
    return (
        <div><h1>Your Score is {props.location.state.score}</h1>
            <p>Difficulty level:{props.location.state.diff}</p>
            <div>{props.location.state.arr.map((ele) => {
                return <div> <p>Question:{ele.question}</p> <p>Ans:{ele[`option${ele.correctopt}`]}</p> </div>
            })}</div>
            <p>Your Percentile:{props.location.state.score*25}%</p>
            
        </div>
    )
}

export default Result
