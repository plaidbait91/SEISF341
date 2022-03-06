import './App.css';
import Login from './Login';
import Navbar from './components/Navbar';
import Logout from './Logout';
import {useState} from 'react' ;
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Question from './components/Question';

function App() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pplink, setPPLink] = useState();
  const childToParent = (n, e, l) => {
    setName(n);
    setEmail(e);
    setPPLink(l);
  }
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/question/:id" element={<Question/>}/>
        </Routes>
      </Router>
      {/* <h1>Name: {name}</h1>
      <h2>Email: {email}</h2>
      <img src={pplink} alt="Profile Photo" />
      <Login childToParent={childToParent}/>
      <Logout childToParent={childToParent}/> */}
    </div>
  );
}

export default App ;
