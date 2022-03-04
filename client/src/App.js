import './App.css';
import Login from './Login';
import Logout from './Logout';
import {useState} from 'react' ;
import {Outlet,Link} from 'react-router-dom'
import {Text, Heading, Flex, Link as LinkC} from '@chakra-ui/react'

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
      <Flex direction="row"
        align="center"
        bgColor="red.400"
        h="8vh"
        w="full"
        fontSize="xl"
        textColor="white"
        justify="space-evenly"
>
        <Flex justify="space-around" w="10%">
        <Text ><Link  to="/" mr={5}><LinkC>Root</LinkC></Link> </Text>
        <Text>|</Text>
        <Text> <Link to="/home" ml={5}><LinkC>Home</LinkC></Link></Text>
        </Flex>
      </Flex>
      <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'red.400',
                zIndex: -1,
              }}>
              🅖Overflow
            </Text>
            {" "}
            <Text as={'span'} color={'red.400'}>
              your QnA Forum!
            </Text>
          </Heading>
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
