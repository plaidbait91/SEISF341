import { useLocation, useParams } from "react-router-dom";
import { Box, Flex, Heading, Text, HStack, Grid, GridItem, Button } from "@chakra-ui/react"

const Question = () => {
    const {id} = useParams()
    const location = useLocation()
    const {question} = location.state.question
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
            <GridItem colSpan={2} rowspan={2} h='20' bg='tomato'>
                <Button h='10'>Upvote</Button>
                <Button h='10'>Downvote</Button>
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
        {/* <GridItem colSpan={2} bg='papayawhip' /> */}
        <GridItem colSpan={4} bg='yellow.100' borderWidth='10px' borderColor='yellow.100'>
        <Text align="left">{question.body}</Text>
        </GridItem>
        </Grid>
     );
}
 
export default Question;