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
  const [email, setEmail] = useState('')

  const setter = (x) => {
    setSearchTerm(x);
  }

  useEffect(() => {
    searcher()
  }, [])

  const searcher = () => {
    axios.get('/search', {
      params: { q: searchTerm }
    })
        .then(res=>{
            console.log(res);
            setQuestions(res.data);
            // console.log(questions)
        })
        .catch(err=>{
            console.error(err);
        })
  }

  const delQ = (id) => {
    axios.delete(`/q/${id}`, { headers : {
      'x-access-token': localStorage.getItem('jwtToken') 
      } })
      .then(res => {
        console.log(res);
        searcher();
      })

  }



  return (
    <div className="App"
    style={{
      backgroundColor: "papayawhip",
      height:"500vh"
  }} 
  >
      <Router>
        <Navbar setter = {setter} search = {searchTerm} searcher = { searcher } login = { setEmail }/>
        <Routes>
        <Route path="/" element={<Home questions = {questions} email = { email } deleter = { delQ }/>} />
          <Route path="/question/:id" element={<Question email = { email }/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/askquestion" element={<Ask />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App ;
