import React,{useEffect,useState} from 'react';
import '../style/landing.css';
import dataset from  '../data';
const ANY="Any"
 
function Quiz(props) {
    const [queArr, setQueArr] = useState([]);
    const [currentdata, setCurrentData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedArr, setSelectedArr] = useState([]);
    const [score, setScore] = useState(0);
    const [diff, setDiff] = useState("");

    useEffect(() => {
        let valarr = dataset.quizdata;
        console.log(dataset);
        console.log(props);
        const queArr = [];
        const { diff, name } = props.location.state;
     
        if (diff == ANY) {
            
            for (let i = 0; i < 4; i++) {
                const b = Math.floor(Math.random() * (valarr.length - 1)) + 1;
                queArr.push(valarr[b - 1]);
                console.log(queArr)
                valarr.splice(b - 1, 1);
            }
            console.log(valarr);        }

        else {
            let filteredData = valarr.filter(function (data) {
                return data.difficultylevel == diff
            })
            console.log(filteredData);
            // generating a random number
              
            for (let i = 0; i < 4; i++) {
                const a = Math.floor(Math.random() * (filteredData.length - 1)) + 1;
                queArr.push(filteredData[a - 1]);
                filteredData.splice(a - 1, 1);
            }
           
        }
        console.log(queArr);
        setQueArr(queArr);
        setCurrentData(queArr[0]);
        setSelectedArr(selectedArr.fill(-1, 0, 4))
        setDiff(diff);
    }, [])
    
    const handleNavigation = (nav) => {
        if (nav == "Next") {
            setCurrentData(queArr[currentIndex + 1]);
            setCurrentIndex(currentIndex+1)
        } else {
            setCurrentData(queArr[currentIndex - 1]);
            setCurrentIndex(currentIndex - 1);
        }
    } 
    const chooseAns = (option) => {
        let arr = selectedArr
        arr[currentIndex] = option
        setSelectedArr(arr);
        
    }
    const calScore = () => {
        let tempScore=0
        for (let i = 0; i < 4; i++){
            if (selectedArr[i] == queArr[i].correctopt) {
                tempScore++;
            }
        }
        console.log(tempScore);
        setScore(tempScore);
        props.history.push({
            pathname: '/result',
            state: { score:tempScore,arr:queArr,diff}
        })
}
   
    return (
        <div className="landing">
            <div className="container">
                <div className='question-section'>
                   {currentdata.question}
			    </div>
			    <div className='answer-section'>
                    <button onClick={() => chooseAns("1")}>{currentdata.option1}</button>
                    <button onClick={() => chooseAns("2")}>{ currentdata.option2}</button>
                    <button onClick={() => chooseAns("3")}>{ currentdata.option3}</button>
                    <button onClick={() => chooseAns("4")}>{currentdata.option4}</button>
                    <div className="navigation-container">
                        {currentIndex!=0?
                            <button onClick={() => handleNavigation("Previous")}>Previous</button>:null}
                        {currentIndex != 3 ?
                            <button onClick={() => handleNavigation("Next")}> Next</button> : null}
                        {currentIndex == 3 ? <button onClick={calScore}>Submit</button> : null}
                    </div>
			    </div>
            </div>
        </div>
            
    )
}

export default Quiz
