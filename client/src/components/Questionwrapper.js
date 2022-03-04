import { Box, Flex, Heading, Text } from "@chakra-ui/react"

export default function Questionwrapper({title,body}) {
    return(
        <Flex  flexDirection='row'>
            <Box>left box</Box>
            <Box>
            <Heading as='h4' size='xs'>{title}</Heading><br/><br/>
            <Box  bg='red.400'><Text>{body}</Text></Box>
            </Box>
        </Flex>
    )
}