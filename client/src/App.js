import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/pages/Home';
import Question from './components/Question';
import Ask from './Ask'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/question/:id" element={<Question/>}/>
          <Route path="/askquestion" element={<Ask />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App ;
