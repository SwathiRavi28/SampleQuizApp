import './App.css';
import { BrowserRouter as Router, Route  } from "react-router-dom";
import data from './data';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import Result from './components/Result';


function App() {
  return (
    <Router>
        <div id="content">
        <Route path="/" exact component={LandingPage} />
        <Route path="/quiz" exact component={Quiz} />
        <Route path="/result" exact component={Result} />
                
        </div>
       
    </Router>
    
  );
}

export default App;
