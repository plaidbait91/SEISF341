import {Text, Heading, Flex, Link as LinkC, Button, Input, InputGroup, InputLeftElement, IconButton} from '@chakra-ui/react'
import {Outlet,Link} from 'react-router-dom'
import {SearchIcon} from '@chakra-ui/icons'

export default function Navbar(){
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
        <Text ><Link  to="/" mr={5}><LinkC>Home</LinkC></Link> </Text>
        <Text>|</Text>
        <Text> <Link to="/profile" ml={5}><LinkC>Profile</LinkC></Link></Text>
        </Flex>

        <Flex justify="space-around" w="20%" align="center">
        <InputGroup borderColor={"white"}>
          <InputLeftElement
            pointerEvents='none'
            children={<IconButton aria-label='Search' icon={<SearchIcon />} colorScheme="red.400" />}
          />
          <Input placeholder=' Search...' color='white.300' _placeholder={{ color: 'white' }} />
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
        </>
    )
}