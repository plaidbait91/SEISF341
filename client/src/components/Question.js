import { useLocation, useParams } from "react-router-dom";
import { Box, Flex, Heading, Text, HStack, Grid, GridItem, IconButton } from "@chakra-ui/react"
import {BiUpvote, BiDownvote} from "react-icons/bi"

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
                <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem colStart={1} colEnd={1} h='20'>
                    <IconButton h='8' icon={<BiUpvote/>} colorScheme="green" />
                    <br/><br/>
                    <IconButton h='8' icon={<BiDownvote/>} colorScheme="red" />
                </GridItem>
                <GridItem colStart={2} colEnd={2} h='10' w='15' bg='papayawhip'>
                    <Box h='10' borderWidth='5px' borderColor='papayawhip'>{question.upvotes} upvotes</Box>
                    <Box bg='#5eba7d' color='#ffffea' h='10' borderWidth='5px' borderColor='#5eba7d'>{question.answers.length} answers</Box>
                </GridItem>
                </Grid>
            </GridItem>
            <GridItem colStart={2} colEnd={3} bg='papayawhip' borderWidth='10px' borderColor='papayawhip'>
                <Heading as='h4' size='md' align='left'>{question.title}</Heading>
            </GridItem>
            <GridItem colSpan={1} bg='white' shadow='sm' borderWidth='2px' flex='1' borderRadius='sm'  padding={2}>
            <Box>Asked, {qdate.getHours()}:{qdate.getMinutes()} on {qdate.toLocaleString('default', { month: 'long' })} {qdate.getDate()}, {qdate.getFullYear()} by {question.postedBy.fullName} ({question.postedBy.username})</Box>
            </GridItem>
            <GridItem colSpan={5} bg='yellow.100' borderWidth='10px'>
                <Text align="left">{question.body}</Text>
            </GridItem>
            <GridItem borderColor="yellow.100">
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