import { useLocation, useParams } from "react-router-dom";
import { Box, Flex, Heading, Text, HStack, Grid, GridItem, IconButton } from "@chakra-ui/react"
import {BiUpvote, BiDownvote} from "react-icons/bi"

const Question = () => {
    const {id} = useParams()
    const location = useLocation()
    const {question} = location.state.question
    console.log(question.answers)
    return ( 
        <Grid
        h='200px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
        borderWidth="20px"
        borderColor="white"
        >
        <GridItem rowSpan={1} colSpan={1} h='20'>
            <Grid templateColumns='repeat(5, 1fr)' gap={4}>
            <GridItem colSpan={2} rowspan={2} h='20'>
                <IconButton h='8' icon={<BiUpvote/>} colorScheme="green" />
                <br/><br/>
                <IconButton h='8' icon={<BiDownvote/>} colorScheme="red" />
            </GridItem>
            <GridItem colStart={3} colEnd={5} h='10' bg='papayawhip'>
                <Box h='10' borderWidth='5px' borderColor='papayawhip'>{question.upvotes} upvotes</Box>
                <Box bg='#5eba7d' color='#ffffea' h='10' borderWidth='5px' borderColor='#5eba7d'>{question.answers.length} answers</Box>
            </GridItem>
            </Grid>
        </GridItem>
        <GridItem colSpan={3} bg='papayawhip' borderWidth='10px' borderColor='papayawhip'>
        <Heading as='h4' size='md' align='left'>{question.title}</Heading>
        </GridItem>
        <GridItem colSpan={4} bg='yellow.100' borderWidth='10px' borderColor='yellow.100'>
        <Text align="left">{question.body}</Text>
        <br/>
        <GridItem borderColor="yellow.100">
            {question.answers.map(answer => (
                <Grid borderColor="yellow.100">
                    <Text align="left">{answer.body}</Text>
                    <Grid templateColumns='repeat(2, 1fr)'>
                        <GridItem colStart={2}><Text align="right" fontSize="3xl">{answer.upvotes}</Text></GridItem>
                        <GridItem colStart={2} marginLeft="540px"><IconButton w='8' icon={<BiUpvote/>} colorScheme="green" /></GridItem>
                        <GridItem colStart={3}><IconButton w='8' icon={<BiDownvote/>} colorScheme="red" /></GridItem>
                    </Grid>
                    {/* <br/> */}
                    <Text align="right"> - {answer.postedBy.fullName} ({answer.postedBy.username}) at {answer.createdAt}</Text>
                </Grid>
            ))}
        </GridItem>
        </GridItem>
        </Grid>
     );
}
 
export default Question;