import './App.css';
import Login from './Login';
import Logout from './Logout';
import {useState} from 'react' ;
import {Outlet, Link} from 'react-router-dom'

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
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Root</Link> |{" "}
        <Link to="/home">Home</Link>
      </nav>
      <Outlet />
      {/* <h1>Name: {name}</h1>
      <h2>Email: {email}</h2>
      <img src={pplink} alt="Profile Photo" />
      <Login childToParent={childToParent}/>
      <Logout childToParent={childToParent}/> */}
    </div>
  );
}

export default App ;
