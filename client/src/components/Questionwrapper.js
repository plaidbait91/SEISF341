import { Box, Flex, Heading, Text, HStack } from "@chakra-ui/react"

export default function Questionwrapper({question}) {
    // console.log(answers.length)
    return(
        <HStack flexDirection='row' border='solid black'>
            <Box w='15%' borderWidth='10px' borderColor='white'>
                <Box color='#6a73a6'>{question.upvotes} upvotes</Box>
                <Box bg='#5eba7d' color='#ffffea'>{question.answers.length} answers</Box>
            </Box>
            <Box w='100%' align='left'>
                <Heading as='h4' size='xs' color='#0a95ff'>Q: {question.title}</Heading>
                <Box><Text>{question.body}</Text></Box>
            </Box>
            <br/><br/><br/><br/>
            <Box>Posted on {question.createdAt} by {question.postedBy.fullName} ({question.postedBy.username})</Box>
        </HStack>
    )
}