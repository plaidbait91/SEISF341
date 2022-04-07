import {Text, Heading, Flex, Link as LinkC, Button, Input, InputGroup, InputLeftElement, IconButton,Image} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import {SearchIcon} from '@chakra-ui/icons'
import {useEffect, useState} from 'react' ;

import React from 'react' ;
import {GoogleLogin,GoogleLogout} from 'react-google-login' ;
// refresh token
import {refreshTokenSetup} from '../utils/refreshToken' ;
// import { appendFile } from 'fs';
import axios from 'axios';

const clientId = '980895739592-obqt1v1p1vng0co9bfdnkr0r3pff4kp3.apps.googleusercontent.com' ;



export default function Navbar({ setter, search, searcher }){

  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pplink, setPPLink] = useState();

  const sendDeets = async (name,email)=>{
    // console.log(name,email);
    axios.post("/login", {name,email})
    .then((res)=>{
      // console.log(res);
      localStorage.setItem('jwtToken',res.data.token);
      // console.log(localStorage.getItem('jwtToken'));
    })
  }

  const onLoginSuccess = (res) => {
    // console.log('INSIDE LOGIN SUCCESS FUNCTION')
    setPPLink(res.profileObj.imageUrl);
    setName(res.profileObj.name)
    setEmail(res.profileObj.email);
    localStorage.setItem('pplink',res.profileObj.imageUrl);
    console.log('PROFILE_OBJECT: ', res.profileObj);
    console.log('PROFILE_PICTURE: ',res.profileObj.imageUrl);
    console.log('NAME: ', res.profileObj.name);
    console.log('EMAIL: ', res.profileObj.email);


    refreshTokenSetup(res);
    setShowloginButton(false);
    setShowlogoutButton(true);
    sendDeets(res.profileObj.name,res.profileObj.email);
};

const onLoginFailure = (res) => {
  console.log('Login Failed:', res);
};

const onSignoutSuccess = () => {
  alert("You have been logged out successfully");
  console.clear();
  setPPLink();
  setEmail();
  setName();
  setShowloginButton(true);
  setShowlogoutButton(false);
};

    return(
        <>
        <Flex direction="row"
        bgColor="red.400"
        h="8vh"
        w="full"
        fontSize="xl"
        textColor="white"
        justify="space-evenly"
>
        <Flex justify = "space-around" w="20%" align="center"  >
        <Text ><Link  to="/" mr={5}>Home</Link> </Text>
        <Text>|</Text>
        <Text> <Link to="/profile" ml={5}>Profile</Link></Text>
        <Text>|</Text>
        <Text> <Link to="/askquestion" ml={5}>Post Question</Link></Text>
        </Flex>

        <Flex justify="space-around" w="20%" align="center">
        <InputGroup borderColor={"white"}>
          <InputLeftElement
            pointerEvents='none'
            children={<IconButton aria-label='Search' icon={<SearchIcon />} colorScheme="red.400" />}
          />
          <Input placeholder=' Search...' color='white.300' _placeholder={{ color: 'white' }}
                  onKeyPress={e => 
                    {
                      if(e.key == 'Enter')
                        searcher()
                    }
                  }
                  value={search}
                  onChange={e => setter(e.target.value)}
            />
        </InputGroup>
        </Flex>
        <Flex justify="right" w="40%" align="center">
          { showloginButton ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            { showlogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
          <Image
          ml={5}
            borderRadius='full'
            boxSize='50px'
            src={pplink}
            alt={name}
            /> 
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
        </>
    )
}