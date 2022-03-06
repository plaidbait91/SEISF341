import { useLocation, useParams } from "react-router-dom";
import { Box, Flex, Heading, Text, HStack, Grid, GridItem,Input, InputGroup, InputLeftElement, IconButton } from "@chakra-ui/react"
// import {ChatIcon} from '@chakra-ui/icons'
import {BiUpvote, BiDownvote, BiSend} from "react-icons/bi"

const Question = () => {
    const {id} = useParams()
    const location = useLocation()
    const {question} = location.state.question
    const qdate = new Date(question.createdAt)
    return ( 
        <Grid
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap={4}
            margin='8px'
            padding={8}
            shadow='md' borderWidth='2px' flex='1' borderRadius='lg'
            >
            <GridItem rowSpan={1} colSpan={1} h='20'>
                <Grid templateColumns='repeat(5, 1fr)' gap={4} >
                <GridItem colStart={1} colEnd={1} h='20'>
                    <IconButton h='8' icon={<BiUpvote/>} colorScheme="green" />
                    <br/><br/>
                    <IconButton h='8' icon={<BiDownvote/>} colorScheme="red" />
                </GridItem>
                <GridItem colStart={2} colEnd={2} h='10' >
                    <Box h='10' w = '40' borderWidth='5px' bg = "papayawhip" borderColor='papayawhip' borderRadius={'sm'}>{question.upvotes} upvotes</Box>
                    <Box bg='#5eba7d' color='#ffffea' h='10'  w = '40' borderWidth='5px' borderColor='#5eba7d' borderRadius={'sm'}>{question.answers.length} answers</Box>
                </GridItem>
                </Grid>
            </GridItem>
            <GridItem colStart={2} colEnd={4} bg='papayawhip' borderWidth='2px' borderRadius='5' padding={2}  >
                <Heading as='h4' size='lg' align='left'>{question.title} </Heading>
            </GridItem>
            <GridItem colSpan={1} bg='white' shadow='sm' borderWidth='2px' flex='1' borderRadius='sm'  padding={2}>
            <Box>Asked,  {qdate.toLocaleString('default', { month: 'long' })} {qdate.getDate()}, {qdate.getFullYear()} at {qdate.getHours()}:{qdate.getMinutes()} by {question.postedBy.fullName} ({question.postedBy.username})</Box>
            </GridItem>
            <GridItem colSpan={5} bg='yellow.100' borderWidth='2px' borderRadius='5' padding={2}>
                <Text align="left">{question.body}</Text>
            </GridItem>
            <GridItem colSpan={3} bg='' borderWidth='3px' borderRadius='20' padding={2}>
            <InputGroup  >
                <InputLeftElement
                    pointerEvents='none'
                    children={<IconButton aria-label='Answer' textColor={"gray"} icon={<BiSend />} color="yellow.1000"  />}
                    padding={2}
                />
                <Input placeholder=' Answer...' color='white.300' _placeholder={{ color: 'black' }} />
                </InputGroup>
            </GridItem>
            
            <GridItem colSpan={5} borderColor='blue.100' borderWidth='10px'>
                    
                    {question.answers.map(answer => (
                        <GridItem margin='8px'
                        padding={8}
                        shadow='md' borderWidth='2px' flex='1' borderRadius='lg'>
                            <Text align="left">{answer.body}</Text>
                            <Grid templateColumns='repeat(2, 1fr)'>
                                <GridItem colStart={2}><Text align="right" fontSize="3xl">{answer.upvotes}</Text></GridItem>
                                <GridItem colStart={2} marginLeft="650px"><IconButton w='8' icon={<BiUpvote/>} colorScheme="green" /></GridItem>
                                <GridItem colStart={3}><IconButton w='8' icon={<BiDownvote/>} colorScheme="red" /></GridItem>
                            </Grid>
                            {/* <br/> */}
                            <Text align="right"> - {answer.postedBy.fullName} ({answer.postedBy.username}) at
                            {" " + new Date(answer.createdAt).getHours()}:{new Date(answer.createdAt).getMinutes() + " "} 
                            {new Date(answer.createdAt).toLocaleString('default', { month: 'long' }) + " "} 
                            {new Date(answer.createdAt).getDate() + ", "} 
                            {new Date(answer.createdAt).getFullYear()}</Text>
                        </GridItem>
                    ))}
                </GridItem>
        </Grid>
     );
}
 
export default Question;