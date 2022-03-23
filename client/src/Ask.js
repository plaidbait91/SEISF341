import { Grid, GridItem, Heading, Textarea, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

const Ask = () => {
    
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const askq = (e) => {
        const question = {title, body, upvotes:0, reports:0}
        fetch('http://localhost:5000/ask', {
            credentials: 'include',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(question)
        }).then(() => {
            console.log('new question added')
        })
    }

    return ( 
        <Grid
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(1, 1fr)'
            gap={10}
            margin='20px'
            padding={8}
            shadow='md' borderWidth='2px' flex='1' borderRadius='lg'
            >
                <GridItem>
                    <Heading>Ask a question</Heading>
                </GridItem>
                <GridItem shadow='md' flex='1' borderRadius='lg' align="left" padding={1} borderWidth='2px'>
                    <Grid templateColumns='repeat(10, 1fr)'>
                        <GridItem colSpan={1}>
                            <Heading>Title</Heading>
                        </GridItem>
                        <GridItem colStart={2} colEnd={12}>
                            <Input
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></Input>
                        </GridItem>
                    </Grid>
                </GridItem>
                <GridItem shadow='md' flex='1' borderRadius='lg' align="left" padding={1} borderWidth='2px'>
                    <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(1, 1fr)'>
                        <GridItem colSpan={1}>
                            <Heading>Body</Heading>
                        </GridItem>
                        <br/>
                        <GridItem>
                            <Grid margin="5px">
                                <Textarea
                                    required
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                ></Textarea>
                            </Grid>
                        </GridItem>
                    </Grid>
                </GridItem>
            <Button type="submit" align="left" colorScheme='blue' w='75px' onClick={askq}>Submit</Button>
        </Grid>
     );
}
 
export default Ask;