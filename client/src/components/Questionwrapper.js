import { Box, Heading, Text, HStack , Grid, GridItem,IconButton} from "@chakra-ui/react"
import {Link} from 'react-router-dom'
import {DeleteIcon} from '@chakra-ui/icons'
import {BiEdit} from "react-icons/bi"
import { useState } from "react"
import Navbar from "./Navbar"

export default function Questionwrapper({question, email, deleter }) {
    
    const date = new Date(question.createdAt)

    // console.log(date)
    return(
        <HStack  flexDirection='row' p={5} shadow='md' borderWidth='1px' flex='1' borderRadius='lg' >
            <Box w='15%' borderWidth='3px' borderRadius='md'>
                <Box color='#6a73a6'>{question.upvotes} votes{/*{<ArrowUpIcon color='white.300' align='center' w={5} h={5}/>}*/}</Box>
                <Box bg='#5eba7d' color='#ffffea' borderRadius='md'>{question.answers.length} answers</Box>
            </Box>
            <Box w='100%' align='left'>
                <Link
                    to = {`/question/${question._id}`}
                    state = {{question: {question}}}
                    size= '10px'
                ><Heading as='h4' size='s' color='#0a95ff'>Q: {question.title}</Heading></Link>
                <Box><Text>{question.body}</Text></Box>
                <Grid display="flex">
                    Tags:
                    {question.tags.map(tag => <GridItem margin="3px" display="flex" borderRadius="5px" borderWidth="2px" w={(tag.length*2).toString()+"%"}>{tag}</GridItem>)}
                </Grid>
            </Box>
            <br/><br/><br/><br/>
            <Box>Posted at {date.getHours()}:{date.getMinutes()} on {date.toLocaleString('default', { month: 'long' })} {date.getDate()}, {date.getFullYear()} by {question.postedBy.email}</Box> 
            <Grid templateColumns='repeat(2, 1fr)'>
                                {(email == question.postedBy.email) ? <GridItem colStart={2}  ><IconButton w='8' icon={<BiEdit/>}  /></GridItem> : <></>}
                                {(email == question.postedBy.email) ? <GridItem colStart={3} margin ="1px"><IconButton w='8' icon={<DeleteIcon/>} onClick = {() => deleter(question._id)}/></GridItem> : <></>}

                            </Grid>
        </HStack>
        
    )
}