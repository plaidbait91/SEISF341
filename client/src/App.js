import './App.css';
import Login from './Login';
import Logout from './Logout';
import {useState} from 'react' ;
import {Outlet,Link} from 'react-router-dom'
import {Text, Heading, Flex, Link as LinkC, Button, Input, InputGroup, InputLeftElement, IconButton} from '@chakra-ui/react'
// import {SearchIcon} from '@chakra-ui/icons'
import {BiSearch} from "react-icons/bi"

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
        bgColor="red.400"
        h="8vh"
        w="full"
        fontSize="xl"
        textColor="white"
        justify="space-evenly"
>
        <Flex justify = "space-around" w="20%" align="center"  >
        <Text ><Link  to="/" mr={5}><LinkC>Root</LinkC></Link> </Text>
        <Text>|</Text>
        <Text> <Link to="/home" ml={5}><LinkC>Home</LinkC></Link></Text>
        </Flex>

        <Flex justify="space-around" w="20%" align="center">
        <InputGroup borderColor={"white"}>
          <Input placeholder=' Search...' color='white.300' _placeholder={{ color: 'white' }} />
          <IconButton aria-label='Search' icon={<BiSearch />} colorScheme="red.400" /> 
        </InputGroup>
        </Flex>
      </Flex>
      <Heading
            lineHeight={1.1}
            fontWeight={600}
            // fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
            <Text
              as={'span'}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '25%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'red.400',
                zIndex: -1,
              }}
              fontStyle={'italic'}>
              🅖Overflow
            </Text>
            {" "}
            <Text as={'span'} color={'red.400'} fontSize={{ base: '2xl', sm: '3xl', lg: '5xl' }}>
              your QnA Forum!
            </Text>
            <br/><br/>
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
