import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Question from './components/Question';
import Profile from './pages/Profile';
import Ask from './pages/Ask'
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [questions, setQuestions] = useState([]);

  const setter = (x) => {
    setSearchTerm(x);
  }

  useEffect(() => {
    searcher()
  }, [])

  const searcher = () => {
    axios.get('http://localhost:5000/search', {
      params: { q: searchTerm }
    })
        .then(res=>{
            console.log(res);
            setQuestions(res.data);
            console.log(questions)
        })
        .catch(err=>{
            console.error(err);
        })
  }



  return (
    <div className="App">
      <Router>
        <Navbar setter = {setter} search = {searchTerm} searcher = { searcher }/>
        <Routes>
        <Route path="/" element={<Home questions = {questions}/>} />
          <Route path="/question/:id" element={<Question/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/askquestion" element={<Ask />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App ;
