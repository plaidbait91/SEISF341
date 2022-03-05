import { Box, Flex, Heading, Text, HStack } from "@chakra-ui/react"
import {Outlet,Link} from 'react-router-dom'
import {ArrowDownIcon,ArrowUpIcon} from '@chakra-ui/icons';

export default function Questionwrapper({question}) {
    
    const date = new Date(question.createdAt)
    // console.log(date)
    return(
        <HStack  flexDirection='row' p={5} shadow='md' borderWidth='1px' flex='1' borderRadius='lg' >
            <Box w='15%' borderWidth='3px' borderRadius='md'>
                <Box color='#6a73a6'>{question.upvotes} {<ArrowUpIcon color='white.300' align='center' w={5} h={5}/>}</Box>
                <Box bg='#5eba7d' color='#ffffea' borderRadius='md'>{question.answers.length} answers</Box>
            </Box>
            <Box w='100%' align='left'>
                <Link
                    to = {`/question/${question._id}`}
                    state = {{question: {question}}}
                    size= '10px'
                ><Heading as='h4' size='s' color='#0a95ff'>Q: {question.title}</Heading></Link>
                <Box><Text>{question.body}</Text></Box>
            </Box>
            <br/><br/><br/><br/>
            <Box>Posted on {date.toString()} by {question.postedBy.fullName} ({question.postedBy.username})</Box> {/* String has to be parsed more*/}
        </HStack>
    )
}