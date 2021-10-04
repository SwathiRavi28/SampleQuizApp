import React,{useEffect,useState} from 'react';
import '../style/landing.css';
import dataset from '../data';
import swal from 'sweetalert';

const ANY = "Any";
const NO_OF_QUE = 4;
const NEXT = "Next";
const PREVIOUS = "Previous";
const ONE = "1";
const TWO = "2";
const THREE = "3";
const FOUR = "4";
const RESULT = "/result";
const SELECT_OPTION = "Please select the answer";
 
function Quiz(props) {
    const [queArr, setQueArr] = useState([]);
    const [currentdata, setCurrentData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedArr, setSelectedArr] = useState(new Array(4));
    const [difficultylevel, setDifficultyLevel] = useState("");

    useEffect(() => {
        let valarr = dataset.quizdata;
        const queArr = [];
        const { difficultylevel } = props.location.state;
     
        if (difficultylevel == ANY) {
            
            // picking up a random question
            for (let i = 0; i < NO_OF_QUE; i++) {
                const b = Math.floor(Math.random() * (valarr.length - 1)) + 1;
                queArr.push(valarr[b - 1]);
                console.log(queArr)
                valarr.splice(b - 1, 1);
            }
        }

        else {
            let filteredData = valarr.filter(function (data) {
                return data.difficultylevel == difficultylevel
            })
            
            // picking up a random question
            for (let i = 0; i < 4; i++) {
                const a = Math.floor(Math.random() * (filteredData.length - 1)) + 1;
                queArr.push(filteredData[a - 1]);
                filteredData.splice(a - 1, 1);
            }
           
        }
        
        setQueArr(queArr);
        setCurrentData(queArr[0]);

        //Initializing the array with -1(unattempted question)
        setSelectedArr(selectedArr.fill(-1, 0, 4))
        setDifficultyLevel(difficultylevel);

    }, [])
    
    const handleNavigation = (nav) => {
        
        if (nav == NEXT) {
            if (selectedArr[currentIndex] ==-1){
            swal(SELECT_OPTION);
            return
        }
            setCurrentData(queArr[currentIndex + 1]);
            setCurrentIndex(currentIndex+1)
        }
        else {
            setCurrentData(queArr[currentIndex - 1]);
            setCurrentIndex(currentIndex - 1);
        }
    }
    //Updating the answers array
    const chooseAns = (option) => {
        let arr = selectedArr
        arr[currentIndex] = option
        setSelectedArr(arr);
        
    }
    //calculating the score
    const calScore = () => {
        let score = 0
        for (let i = 0; i < 4; i++){
            if (selectedArr[i] == queArr[i].correctopt) {
               score++;
            }
        }
        
        props.history.push({
            pathname: RESULT,
            state: { score,arr:queArr,difficultylevel}
        })
}
   
    return (
        <div className="landing">
            <div className="quiz-container">
                <div className='question-section'>
                   {currentdata.question}
			    </div>
			    <div className='answer-section'>
                    <button className="ans-button" onClick={() => chooseAns(ONE)}>{currentdata.option1}</button>
                    <button className="ans-button" onClick={() => chooseAns(TWO)}>{ currentdata.option2}</button>
                    <button className="ans-button" onClick={() => chooseAns(THREE)}>{currentdata.option3}</button>
                    <button className="ans-button" onClick={() => chooseAns(FOUR)}>{currentdata.option4}</button>
                    <div className="navigation-container">
                        {currentIndex!=0?
                            <button className="nav-previousbutton" onClick={() => handleNavigation(PREVIOUS)}>Previous</button>:null}
                        {currentIndex != 3 ?
                            <button className="nav-nextbutton" onClick={() => handleNavigation(NEXT)}> Next</button> : null}
                        {currentIndex == 3 ? <button onClick={calScore}>Submit</button> : null}
                    </div>
			    </div>
            </div>
        </div>
            
    )
}

export default Quiz
